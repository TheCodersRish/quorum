import { HOUSE_SEATS, QUORUM, type Tally, type VoteRecord } from "@/lib/types"

export const OPENING_TALLY: Tally = { aye: 96, nay: 81, present: 392 }

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

export function clampTally(tally: Tally): Tally {
  const present = clamp(Math.round(tally.present), 0, HOUSE_SEATS)
  const aye = clamp(Math.round(tally.aye), 0, present)
  const nay = clamp(Math.round(tally.nay), 0, present - aye)
  return { aye, nay, present }
}

export function undecided(tally: Tally): number {
  const safe = clampTally(tally)
  return safe.present - safe.aye - safe.nay
}

export function absent(tally: Tally): number {
  return HOUSE_SEATS - clampTally(tally).present
}

export function applyDelta(tally: Tally, delta: Partial<Tally>): Tally {
  return clampTally({
    aye: tally.aye + (delta.aye ?? 0),
    nay: tally.nay + (delta.nay ?? 0),
    present: tally.present + (delta.present ?? 0),
  })
}

export function judge(
  tally: Tally,
  options?: { recommitted?: boolean; amended?: boolean; summary?: string },
): VoteRecord {
  const safe = clampTally(tally)
  const amended = Boolean(options?.amended)

  if (options?.recommitted) {
    return {
      ...safe,
      passed: false,
      reason: "recommitted",
      amended,
      summary:
        options?.summary ??
        "The bill left the floor and went back to committee. That is not passage, and it is not defeat.",
    }
  }

  if (safe.present < QUORUM) {
    return {
      ...safe,
      passed: false,
      reason: "quorum",
      amended,
      summary:
        options?.summary ??
        "Fewer than 218 members are present. The House cannot do business without a quorum.",
    }
  }

  if (safe.aye > safe.nay) {
    return {
      ...safe,
      passed: true,
      reason: "majority",
      amended,
      summary:
        options?.summary ??
        "The ayes have it. On an ordinary question, a majority of the members voting aye or nay is enough, if a quorum is present.",
    }
  }

  return {
    ...safe,
    passed: false,
    reason: "defeated",
    amended,
    summary:
      options?.summary ??
      "The nays have it. A tie, or a short aye count, does not pass a bill.",
  }
}
