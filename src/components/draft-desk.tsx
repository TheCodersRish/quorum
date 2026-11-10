"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BillPaper } from "@/components/bill-paper"
import { ClerkNote } from "@/components/clerk-note"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { billFromIssue, blankBill } from "@/lib/bills"
import { getIssue, ISSUES } from "@/lib/issues"
import { uid } from "@/lib/id"
import { STATES } from "@/lib/states"
import { saveBill, useBillStore } from "@/lib/bill-store"
import type { Bill, Provision } from "@/lib/types"
import { cn } from "cn"

const STEPS = ["Problem", "Title", "Findings", "Text", "Money", "Read"]

const CHECKS = [
  "I did not invent a statistic.",
  "I can name the place, the program, or the person this is about.",
  "The draft says whether money is authorized, appropriated, or neither.",
  "I know a member of Congress has to introduce this. I cannot file it myself.",
]

export function DraftDesk({
  initialIssueId,
  initialBillId,
}: {
  initialIssueId?: string
  initialBillId?: string
}) {
  const router = useRouter()
  const store = useBillStore()
  const [bill, setBill] = useState<Bill | null>(null)
  const [hadVote, setHadVote] = useState(false)
  const [step, setStep] = useState(0)
  const [furthest, setFurthest] = useState(0)
  const [error, setError] = useState("")
  const [checks, setChecks] = useState<boolean[]>(() => CHECKS.map(() => false))
  const [seed, setSeed] = useState<string | null>(null)

  const sourceKey = !store.ready
    ? null
    : initialBillId
      ? `bill:${initialBillId}`
      : initialIssueId
        ? `issue:${initialIssueId}`
        : "blank"

  if (sourceKey && sourceKey !== seed) {
    const existing = initialBillId
      ? store.bills.find((item) => item.id === initialBillId)
      : undefined
    setSeed(sourceKey)
    setError("")
    if (initialBillId && !existing) {
      setBill(null)
    } else if (existing) {
      setBill(existing)
      setHadVote(Boolean(existing.vote))
      setStep(5)
      setFurthest(5)
      setChecks(existing.checkedFindings ? CHECKS.map(() => true) : CHECKS.map(() => false))
    } else {
      const issue = initialIssueId ? getIssue(initialIssueId) : undefined
      setBill(issue ? billFromIssue(issue) : blankBill())
      setHadVote(false)
      setStep(issue ? 1 : 0)
      setFurthest(issue ? 1 : 0)
      setChecks(CHECKS.map(() => false))
    }
  }

  if (!store.ready || seed !== sourceKey) {
    return (
      <p className="mx-auto max-w-6xl px-4 py-16 text-muted-foreground">
        The clerk is opening a fresh pad.
      </p>
    )
  }

  if (!bill) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="font-serif text-4xl">That draft is not on this desk.</h1>
        <p className="mt-3 max-w-lg text-muted-foreground">
          Bills live in this browser. A link from another computer will not
          open the file unless someone shared the text itself.
        </p>
        <a href="/draft" className={cn(buttonVariants({ className: "mt-6 h-11 px-5" }))}>
          Start a new draft
        </a>
      </div>
    )
  }

  function patch(partial: Partial<Bill>) {
    setBill((current) => (current ? { ...current, ...partial, updatedAt: Date.now() } : current))
  }

  function chooseIssue(id: string) {
    const issue = getIssue(id)
    if (!issue || !bill) return
    setBill(
      billFromIssue(issue, {
        id: bill.id,
        createdAt: bill.createdAt,
        sponsorName: bill.sponsorName,
        state: bill.state,
      }),
    )
    setChecks(CHECKS.map(() => false))
    setError("")
  }

  function updateFinding(index: number, value: string) {
    if (!bill) return
    const findings = bill.findings.map((finding, item) =>
      item === index ? value.slice(0, 500) : finding,
    )
    patch({ findings })
  }

  function updateProvision(id: string, partial: Partial<Provision>) {
    if (!bill) return
    patch({
      provisions: bill.provisions.map((provision) =>
        provision.id === id
          ? {
              ...provision,
              heading: (partial.heading ?? provision.heading).slice(0, 80),
              text: (partial.text ?? provision.text).slice(0, 800),
            }
          : provision,
      ),
    })
  }

  function validate(index: number): string {
    if (!bill) return "The pad is not ready."
    if (index === 0 && !bill.issueId) return "Choose a problem before you name the bill."
    if (index === 1) {
      if (bill.shortTitle.trim().length < 3) return "Give the bill a short title people can say."
      if (bill.officialTitle.trim().length < 8) {
        return "The official title is the long “to” sentence. Start it with what the bill would do."
      }
    }
    if (index === 2 && !bill.findings.some((finding) => finding.trim().length > 0)) {
      return "Write at least one finding. A blank finding is not a finding."
    }
    if (
      index === 3 &&
      !bill.provisions.some(
        (provision) => provision.heading.trim() && provision.text.trim(),
      )
    ) {
      return "A bill needs one operative section, with a heading and text."
    }
    if (index === 4 && bill.payFor.trim().length < 8) {
      return "Say where the money comes from, or say plainly that the draft does not spend any."
    }
    if (index === 5) {
      if (bill.sponsorName.trim().length < 2) return "Sign the draft with your name."
      if (!bill.state) return "Choose the state you will name in the letter."
      if (checks.some((checked) => !checked)) {
        return "The four clerk’s checks are the difference between a draft and a claim."
      }
    }
    return ""
  }

  function go(next: number) {
    const problem = validate(step)
    if (next > step && problem) {
      setError(problem)
      return
    }
    setError("")
    setStep(next)
    setFurthest((current) => Math.max(current, next))
  }

  function save(toFloor: boolean) {
    if (!bill) return
    const problem = validate(5)
    if (problem) {
      setError(problem)
      return
    }
    const stored: Bill = {
      ...bill,
      sponsorName: bill.sponsorName.trim(),
      shortTitle: bill.shortTitle.trim(),
      officialTitle: bill.officialTitle.trim(),
      checkedFindings: true,
      status: "draft",
      vote: undefined,
      amended: false,
      amendmentNotes: [],
      updatedAt: Date.now(),
    }
    saveBill(stored)
    router.push(toFloor ? `/floor?id=${stored.id}` : "/record")
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <p className="text-xs tracking-[0.2em] text-brass uppercase">The desk</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">Draft the bill.</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        You are staffing a member, not playing one. The text should be short
        enough to defend out loud.
      </p>

      <ol className="mt-8 flex gap-2 overflow-x-auto pb-1">
        {STEPS.map((label, index) => (
          <li key={label}>
            <button
              type="button"
              disabled={index > furthest}
              onClick={() => go(index)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm whitespace-nowrap",
                index === step
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground/80 hover:border-brass",
                index > furthest && "opacity-40",
              )}
            >
              {index + 1}. {label}
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-8 pb-28">
        {step === 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {ISSUES.map((issue) => {
              const selected = bill.issueId === issue.id
              return (
                <button
                  key={issue.id}
                  type="button"
                  onClick={() => chooseIssue(issue.id)}
                  className={cn(
                    "rounded-lg border p-4 text-left",
                    selected
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-brass",
                  )}
                  aria-pressed={selected}
                >
                  <p className="text-xs tracking-[0.16em] text-brass uppercase">{issue.who}</p>
                  <p className="mt-2 font-serif text-2xl">{issue.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {issue.problem}
                  </p>
                </button>
              )
            })}
          </div>
        ) : null}

        {step === 1 ? (
          <div className="grid max-w-2xl gap-5">
            <Field label="Short title" hint="The name people will say. “Last Bus Home Act,” not a paragraph.">
              <Input
                value={bill.shortTitle}
                maxLength={120}
                onChange={(event) => patch({ shortTitle: event.target.value.slice(0, 120) })}
              />
            </Field>
            <Field
              label="Official title"
              hint="Congressional titles usually start with “to” and end with “and for other purposes.”"
            >
              <Textarea
                value={bill.officialTitle}
                maxLength={300}
                onChange={(event) =>
                  patch({ officialTitle: event.target.value.slice(0, 300) })
                }
              />
            </Field>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid max-w-2xl gap-4">
            <ClerkNote>{bill.clerkNote}</ClerkNote>
            {bill.findings.map((finding, index) => (
              <Field key={index} label={`Finding ${index + 1}`}>
                <Textarea
                  value={finding}
                  maxLength={500}
                  onChange={(event) => updateFinding(index, event.target.value)}
                />
                {bill.findings.length > 1 ? (
                  <button
                    type="button"
                    className="mt-1 text-sm text-muted-foreground underline-offset-4 hover:underline"
                    onClick={() =>
                      patch({ findings: bill.findings.filter((_, item) => item !== index) })
                    }
                  >
                    Remove this finding
                  </button>
                ) : null}
              </Field>
            ))}
            {bill.findings.length < 6 ? (
              <Button
                type="button"
                variant="outline"
                className="h-10 w-fit"
                onClick={() => patch({ findings: [...bill.findings, ""] })}
              >
                Add a finding
              </Button>
            ) : null}
          </div>
        ) : null}

        {step === 3 ? (
          <div className="grid max-w-2xl gap-6">
            {bill.provisions.map((provision, index) => (
              <fieldset key={provision.id} className="grid gap-3 rounded-lg border border-border p-4">
                <legend className="px-1 text-sm text-muted-foreground">
                  Section {index + 3}
                </legend>
                <Field label="Heading">
                  <Input
                    value={provision.heading}
                    maxLength={80}
                    onChange={(event) =>
                      updateProvision(provision.id, { heading: event.target.value })
                    }
                  />
                </Field>
                <Field label="Operative text">
                  <Textarea
                    value={provision.text}
                    maxLength={800}
                    onChange={(event) =>
                      updateProvision(provision.id, { text: event.target.value })
                    }
                  />
                </Field>
                <div className="flex flex-wrap gap-3 text-sm">
                  {index > 0 ? (
                    <button
                      type="button"
                      className="text-muted-foreground underline-offset-4 hover:underline"
                      onClick={() => {
                        const provisions = [...bill.provisions]
                        const [item] = provisions.splice(index, 1)
                        provisions.splice(index - 1, 0, item)
                        patch({ provisions })
                      }}
                    >
                      Move up
                    </button>
                  ) : null}
                  {bill.provisions.length > 1 ? (
                    <button
                      type="button"
                      className="text-muted-foreground underline-offset-4 hover:underline"
                      onClick={() =>
                        patch({
                          provisions: bill.provisions.filter((item) => item.id !== provision.id),
                        })
                      }
                    >
                      Remove section
                    </button>
                  ) : null}
                </div>
              </fieldset>
            ))}
            {bill.provisions.length < 8 ? (
              <Button
                type="button"
                variant="outline"
                className="h-10 w-fit"
                onClick={() =>
                  patch({
                    provisions: [
                      ...bill.provisions,
                      { id: uid(), heading: "", text: "" },
                    ],
                  })
                }
              >
                Add a section
              </Button>
            ) : null}
          </div>
        ) : null}

        {step === 4 ? (
          <div className="grid max-w-2xl gap-5">
            <ClerkNote>
              If you do not know the cost, write that. “Such sums as may be necessary”
              is an authorization. It is not money in an agency&apos;s account.
            </ClerkNote>
            <Field label="The money">
              <Textarea
                className="min-h-36"
                value={bill.payFor}
                maxLength={800}
                onChange={(event) => patch({ payFor: event.target.value.slice(0, 800) })}
              />
            </Field>
          </div>
        ) : null}

        {step === 5 ? (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="grid gap-5">
              {hadVote ? (
                <ClerkNote>
                  This draft already has a roll call. Saving it clears that vote.
                  The words you keep stay on the page.
                </ClerkNote>
              ) : null}
              <Field label="Your name">
                <Input
                  value={bill.sponsorName}
                  maxLength={80}
                  autoComplete="name"
                  onChange={(event) => patch({ sponsorName: event.target.value.slice(0, 80) })}
                />
              </Field>
              <Field label="State you will name in the letter">
                <select
                  value={bill.state}
                  onChange={(event) => patch({ state: event.target.value })}
                  className="h-10 w-full rounded-lg border border-input bg-card px-2.5 text-sm"
                >
                  <option value="">Choose a state</option>
                  {STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </Field>
              {bill.state === "District of Columbia" ? (
                <ClerkNote>
                  The District has a delegate. A delegate can introduce bills and
                  vote in committee. A delegate does not cast a vote on final
                  passage on the House floor.
                </ClerkNote>
              ) : null}
              <fieldset className="grid gap-3">
                <legend className="text-sm font-medium">Before this leaves the desk</legend>
                {CHECKS.map((check, index) => (
                  <label key={check} className="flex items-start gap-3 text-sm leading-relaxed">
                    <input
                      type="checkbox"
                      className="mt-1 size-4 accent-[#e0b15a]"
                      checked={checks[index]}
                      onChange={(event) =>
                        setChecks((current) =>
                          current.map((item, itemIndex) =>
                            itemIndex === index ? event.target.checked : item,
                          ),
                        )
                      }
                    />
                    <span>{check}</span>
                  </label>
                ))}
              </fieldset>
              <p className="text-sm text-muted-foreground">
                Check this before you trust a finding: {getIssue(bill.issueId)?.check ?? bill.clerkNote}
              </p>
            </div>
            <BillPaper bill={bill} />
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="mt-6 text-sm text-nay" role="alert">
          {error}
        </p>
      ) : null}

      <div className="no-print sticky bottom-0 mt-8 -mx-4 flex items-center justify-between gap-3 border-t border-border bg-background/90 px-4 py-3 backdrop-blur">
        <Button
          type="button"
          variant="ghost"
          className="h-11"
          disabled={step === 0}
          onClick={() => go(step - 1)}
        >
          Back
        </Button>
        {step < 5 ? (
          <Button type="button" className="h-11 px-5" onClick={() => go(step + 1)}>
            Continue
          </Button>
        ) : (
          <div className="flex flex-wrap justify-end gap-2">
            <Button type="button" variant="outline" className="h-11" onClick={() => save(false)}>
              Leave it on the desk
            </Button>
            <Button type="button" className="h-11 px-5" onClick={() => save(true)}>
              Send it to the floor
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      {children}
      {hint ? <p className="text-sm text-muted-foreground">{hint}</p> : null}
    </div>
  )
}
