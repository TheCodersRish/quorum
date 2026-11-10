import { uid } from "@/lib/id"
import type { Amendment, Bill, BillStatus, Issue, VoteRecord } from "@/lib/types"

export function blankBill(): Bill {
  const now = Date.now()
  return {
    id: uid(),
    createdAt: now,
    updatedAt: now,
    issueId: "",
    shortTitle: "",
    officialTitle: "",
    findings: [""],
    provisions: [{ id: uid(), heading: "", text: "" }],
    payFor: "",
    sponsorName: "",
    state: "",
    clerkNote:
      "Write the problem so a stranger can see it. Then say who would carry the work out, and where the money would come from.",
    checkedFindings: false,
    status: "draft",
    amended: false,
    amendmentNotes: [],
  }
}

export function billFromIssue(issue: Issue, keep?: Partial<Bill>): Bill {
  const now = Date.now()
  return {
    id: keep?.id ?? uid(),
    createdAt: keep?.createdAt ?? now,
    updatedAt: now,
    issueId: issue.id,
    shortTitle: issue.shortTitle,
    officialTitle: issue.officialTitle,
    findings: issue.findings.length > 0 ? [...issue.findings] : [""],
    provisions:
      issue.provisions.length > 0
        ? issue.provisions.map((provision) => ({
            id: uid(),
            heading: provision.heading,
            text: provision.text,
          }))
        : [{ id: uid(), heading: "", text: "" }],
    payFor: issue.payFor,
    sponsorName: keep?.sponsorName ?? "",
    state: keep?.state ?? "",
    clerkNote: issue.clerkNote,
    checkedFindings: false,
    status: "draft",
    amended: false,
    amendmentNotes: [],
  }
}

export function applyAmendment(bill: Bill, amendment: Amendment, note: string): Bill {
  const next: Bill = {
    ...bill,
    updatedAt: Date.now(),
    amended: true,
    amendmentNotes: [...bill.amendmentNotes, note],
    findings: [...bill.findings],
    provisions: bill.provisions.map((provision) => ({ ...provision })),
  }

  if (amendment.kind === "finding") {
    next.findings = [...next.findings.filter((finding) => finding.trim()), amendment.text]
  } else if (amendment.kind === "provision") {
    next.provisions = [
      ...next.provisions,
      { id: uid(), heading: amendment.heading, text: amendment.text },
    ]
  } else {
    const addition = amendment.text.trim()
    next.payFor = next.payFor.includes(addition)
      ? next.payFor
      : `${next.payFor.trim()}\n\n${addition}`
  }

  return next
}

export function withVote(bill: Bill, vote: VoteRecord): Bill {
  const status: BillStatus = vote.reason === "recommitted"
    ? "recommitted"
    : vote.passed
      ? "passed"
      : "failed"
  return {
    ...bill,
    updatedAt: Date.now(),
    amended: bill.amended || vote.amended,
    status,
    vote,
  }
}

function isProvision(value: unknown): boolean {
  if (!value || typeof value !== "object") return false
  const provision = value as Record<string, unknown>
  return (
    typeof provision.id === "string" &&
    typeof provision.heading === "string" &&
    typeof provision.text === "string"
  )
}

export function isBill(value: unknown): value is Bill {
  if (!value || typeof value !== "object") return false
  const bill = value as Record<string, unknown>
  const status = bill.status
  return (
    typeof bill.id === "string" &&
    typeof bill.shortTitle === "string" &&
    typeof bill.officialTitle === "string" &&
    typeof bill.payFor === "string" &&
    typeof bill.sponsorName === "string" &&
    typeof bill.state === "string" &&
    typeof bill.issueId === "string" &&
    typeof bill.clerkNote === "string" &&
    typeof bill.checkedFindings === "boolean" &&
    typeof bill.amended === "boolean" &&
    typeof bill.createdAt === "number" &&
    typeof bill.updatedAt === "number" &&
    (status === "draft" ||
      status === "recommitted" ||
      status === "passed" ||
      status === "failed") &&
    Array.isArray(bill.findings) &&
    bill.findings.every((finding) => typeof finding === "string") &&
    Array.isArray(bill.provisions) &&
    bill.provisions.every(isProvision) &&
    Array.isArray(bill.amendmentNotes) &&
    bill.amendmentNotes.every((note) => typeof note === "string")
  )
}

export function statusLabel(status: Bill["status"]): string {
  switch (status) {
    case "draft":
      return "On the desk"
    case "passed":
      return "Passed the simulated House"
    case "failed":
      return "Failed on the floor"
    case "recommitted":
      return "Sent back to committee"
  }
}
