export const HOUSE_SEATS = 435
export const QUORUM = 218

export type Provision = {
  id: string
  heading: string
  text: string
}

export type BillStatus = "draft" | "recommitted" | "passed" | "failed"

export type Tally = {
  aye: number
  nay: number
  present: number
}

export type VoteReason = "quorum" | "majority" | "defeated" | "recommitted"

export type VoteRecord = Tally & {
  passed: boolean
  reason: VoteReason
  amended: boolean
  summary: string
}

export type Amendment =
  | { kind: "finding"; text: string }
  | { kind: "provision"; heading: string; text: string }
  | { kind: "appendPayFor"; text: string }

export type Bill = {
  id: string
  createdAt: number
  updatedAt: number
  issueId: string
  shortTitle: string
  officialTitle: string
  findings: string[]
  provisions: Provision[]
  payFor: string
  sponsorName: string
  state: string
  clerkNote: string
  checkedFindings: boolean
  status: BillStatus
  amended: boolean
  amendmentNotes: string[]
  vote?: VoteRecord
}

export type Issue = {
  id: string
  name: string
  who: string
  problem: string
  shortTitle: string
  officialTitle: string
  findings: string[]
  provisions: { heading: string; text: string }[]
  payFor: string
  clerkNote: string
  check: string
}
