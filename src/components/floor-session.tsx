"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "cn"
import { BillPaper } from "@/components/bill-paper"
import { Chamber } from "@/components/chamber"
import { ClerkNote } from "@/components/clerk-note"
import { LetterDialog } from "@/components/letter-dialog"
import { WhipMeter } from "@/components/whip-meter"
import { Button, buttonVariants } from "@/components/ui/button"
import { applyAmendment, statusLabel, withVote } from "@/lib/bills"
import { roundsFor, type Reply } from "@/lib/debate"
import { seatsFromTally } from "@/lib/seats"
import { saveBill, useBillStore } from "@/lib/bill-store"
import { applyDelta, judge, OPENING_TALLY } from "@/lib/tally"
import { billPlainText } from "@/lib/text"
import type { Bill, Tally, VoteRecord } from "@/lib/types"

type HistoryItem = { label: string; tally: Tally }

type Sitting = {
  bill: Bill
  round: number
  phase: "choose" | "spoken" | "result"
  tally: Tally
  lastReply: Reply | null
  recommitted: boolean
  history: HistoryItem[]
  finished: boolean
}

function sittingFrom(bill: Bill): Sitting {
  if (bill.vote) {
    return {
      bill,
      round: roundsFor(bill).length - 1,
      phase: "result",
      tally: {
        aye: bill.vote.aye,
        nay: bill.vote.nay,
        present: bill.vote.present,
      },
      lastReply: null,
      recommitted: bill.vote.reason === "recommitted",
      history: [],
      finished: true,
    }
  }
  return {
    bill,
    round: 0,
    phase: "choose",
    tally: OPENING_TALLY,
    lastReply: null,
    recommitted: false,
    history: [],
    finished: false,
  }
}

export function FloorSession({ billId }: { billId?: string }) {
  const store = useBillStore()
  const [sitting, setSitting] = useState<Sitting | null>(null)
  const [sittingKey, setSittingKey] = useState<string | null>(null)
  const found = billId ? store.bills.find((item) => item.id === billId) : undefined
  const nextKey = !store.ready
    ? null
    : !billId
      ? "calendar"
      : found
        ? billId
        : `missing:${billId}`

  if (nextKey && sittingKey !== nextKey) {
    setSittingKey(nextKey)
    setSitting(found ? sittingFrom(found) : null)
  }

  function choose(reply: Reply) {
    setSitting((current) => {
      if (!current || current.phase !== "choose") return current
      const tally = applyDelta(current.tally, reply.delta)
      const bill = reply.amendment
        ? applyAmendment(current.bill, reply.amendment, reply.note ?? reply.label)
        : current.bill
      return {
        ...current,
        bill,
        tally,
        lastReply: reply,
        recommitted: Boolean(reply.recommit),
        phase: "spoken",
        history: [...current.history, { label: reply.label, tally }],
      }
    })
  }

  function advance() {
    if (!sitting || sitting.phase !== "spoken") return
    const rounds = roundsFor(sitting.bill)
    const last = sitting.recommitted || sitting.round >= rounds.length - 1
    if (!last) {
      setSitting({ ...sitting, round: sitting.round + 1, phase: "choose", lastReply: null })
      return
    }
    const vote = judge(sitting.tally, {
      recommitted: sitting.recommitted,
      amended: sitting.bill.amended,
      summary: resultSummary(sitting),
    })
    const bill = withVote(sitting.bill, vote)
    saveBill(bill)
    setSitting({ ...sitting, bill, phase: "result", finished: true })
  }

  function again() {
    if (!sitting) return
    const bill: Bill = {
      ...sitting.bill,
      status: "draft",
      vote: undefined,
    }
    saveBill(bill)
    setSitting({
      bill,
      round: 0,
      phase: "choose",
      tally: OPENING_TALLY,
      lastReply: null,
      recommitted: false,
      history: [],
      finished: false,
    })
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (!sitting || sitting.phase !== "choose" || sitting.finished) return
      const target = event.target
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      ) {
        return
      }
      const index = Number(event.key) - 1
      const reply = roundsFor(sitting.bill)[sitting.round]?.replies[index]
      if (!reply) return
      event.preventDefault()
      choose(reply)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  if (!store.ready || sittingKey !== nextKey) {
    return (
      <p className="mx-auto max-w-6xl px-4 py-16 text-muted-foreground">
        The reading clerk is finding the bill.
      </p>
    )
  }

  if (!billId || !sitting) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="font-serif text-4xl">Nothing is on the floor.</h1>
        <p className="mt-3 max-w-lg text-muted-foreground">
          {billId
            ? "That bill is not on this desk."
            : "Send a draft from the desk, or pick one already in the record."}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {store.bills.map((item) => (
            <Link
              key={item.id}
              href={`/floor?id=${item.id}`}
              className="rounded-lg border border-border px-4 py-3 hover:border-brass"
            >
              <span className="block font-serif text-xl">
                {item.shortTitle || "Untitled draft"}
              </span>
              <span className="text-sm text-muted-foreground">{statusLabel(item.status)}</span>
            </Link>
          ))}
        </div>
        <Link href="/draft" className={cn(buttonVariants({ className: "mt-6 h-11 px-5" }))}>
          Draft a bill
        </Link>
      </div>
    )
  }

  const rounds = roundsFor(sitting.bill)
  const round = rounds[sitting.round]
  const vote = sitting.bill.vote

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-12">
      <div>
        <p className="text-xs tracking-[0.2em] text-brass uppercase">
          Simulated House · {sitting.bill.shortTitle || "Untitled draft"}
        </p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl">
          {sitting.phase === "result" ? resultHeading(vote) : "The floor is open."}
        </h1>

        {sitting.phase !== "result" && round ? (
          <section className="mt-8 rounded-lg border border-border bg-card/60 p-5">
            <p className="text-xs tracking-[0.16em] text-brass uppercase">{round.role}</p>
            <h2 className="mt-1 font-serif text-3xl">{round.member}</h2>
            <p className="mt-4 text-lg leading-relaxed">{round.speech}</p>
            {sitting.phase === "choose" ? (
              <div className="mt-6 grid gap-3">
                <p className="text-sm text-muted-foreground">
                  You answer for your member. Keys 1, 2, and 3 work from the keyboard.
                </p>
                {round.replies.map((reply, index) => (
                  <Button
                    key={reply.id}
                    type="button"
                    variant="outline"
                    className="h-auto justify-start px-4 py-3 text-left whitespace-normal"
                    onClick={() => choose(reply)}
                  >
                    <span className="text-brass">{index + 1}.</span> {reply.label}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-xs tracking-[0.16em] text-brass uppercase">Your answer</p>
                <p className="mt-2 text-lg leading-relaxed">{sitting.lastReply?.speech}</p>
                {sitting.lastReply ? (
                  <div className="mt-4">
                    <ClerkNote>{sitting.lastReply.clerk}</ClerkNote>
                  </div>
                ) : null}
                <Button type="button" className="mt-5 h-11 px-5" onClick={advance}>
                  {sitting.recommitted || sitting.round >= rounds.length - 1
                    ? "Close the vote"
                    : "Next member"}
                </Button>
              </div>
            )}
          </section>
        ) : null}

        {sitting.phase === "result" && vote ? (
          <Result vote={vote} onAgain={again} bill={sitting.bill} />
        ) : null}

        <details className="mt-8 rounded-lg border border-border p-4">
          <summary className="cursor-pointer font-serif text-xl">The text before the House</summary>
          <div className="mt-4">
            <BillPaper bill={sitting.bill} />
          </div>
        </details>
      </div>

      <aside className="no-print h-fit space-y-6 lg:sticky lg:top-20">
        <Chamber
          votes={seatsFromTally(sitting.tally)}
          label={`${sitting.tally.aye} aye, ${sitting.tally.nay} nay, ${sitting.tally.present} present`}
        />
        <WhipMeter tally={sitting.tally} />
        {sitting.history.length > 0 ? (
          <div>
            <p className="text-xs tracking-[0.16em] text-brass uppercase">Whip history</p>
            <ol className="mt-2 space-y-2 text-sm">
              {sitting.history.map((item, index) => (
                <li key={`${item.label}-${index}`}>
                  {item.label}
                  <span className="text-muted-foreground">
                    {" "}
                    · {item.tally.aye} aye, {item.tally.nay} nay
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </aside>
    </div>
  )
}

function resultHeading(vote: VoteRecord | undefined) {
  if (!vote) return "The roll is closed."
  if (vote.reason === "recommitted") return "Sent back to committee."
  if (vote.reason === "quorum") return "No quorum."
  if (vote.passed) return "The ayes have it."
  return "The nays have it."
}

function resultSummary(sitting: Sitting): string {
  if (sitting.recommitted) {
    return "A motion to recommit took the bill off the floor. There is no roll call on passage. The committee has it again, and a committee can sit on a bill forever."
  }
  const { aye, nay, present } = sitting.tally
  if (present < 218) {
    return `Only ${present} members are present. The House needs a quorum of 218 before it does business.`
  }
  if (aye > nay) {
    return `${aye} ayes beat ${nay} nays. The ayes did not need to reach 218. They needed to outnumber the nays, with a quorum of ${present} members present. The other chamber still has to pass the same words.`
  }
  return `${nay} nays beat ${aye} ayes. This failed even though nobody needed 218 ayes. Passage is a majority of the members voting, not a majority of the whole House.`
}

function Result({
  bill,
  vote,
  onAgain,
}: {
  bill: Bill
  vote: VoteRecord
  onAgain: () => void
}) {
  const [copied, setCopied] = useState(false)

  return (
    <section className="mt-8">
      <p className="max-w-2xl text-lg leading-relaxed">{vote.summary}</p>
      <CountUp vote={vote} />
      <div className="no-print mt-6 flex flex-wrap gap-2">
        <LetterDialog bill={bill} />
        <Button type="button" variant="outline" className="h-10" onClick={() => window.print()}>
          Print the bill
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-10"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(billPlainText(bill))
              setCopied(true)
            } catch {
              setCopied(false)
            }
          }}
        >
          {copied ? "Copied the text" : "Copy the bill"}
        </Button>
        <Button type="button" variant="ghost" className="h-10" onClick={onAgain}>
          Debate again
        </Button>
        <Link href="/record" className={cn(buttonVariants({ variant: "ghost", className: "h-10" }))}>
          The record
        </Link>
      </div>
    </section>
  )
}

function CountUp({ vote }: { vote: VoteRecord }) {
  const [aye, setAye] = useState(vote.aye)
  const [nay, setNay] = useState(vote.nay)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let frame = 0
    const started = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / 900)
      setAye(Math.round(vote.aye * t))
      setNay(Math.round(vote.nay * t))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [vote.aye, vote.nay])

  return (
    <p className="mt-6 font-serif text-5xl tabular-nums sm:text-6xl">
      <span className="text-aye">{aye}</span>
      <span className="text-muted-foreground"> – </span>
      <span className="text-nay">{nay}</span>
    </p>
  )
}
