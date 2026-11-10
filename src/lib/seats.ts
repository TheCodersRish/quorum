import { QUORUM } from "@/lib/types"
import { clampTally } from "@/lib/tally"
import type { Tally } from "@/lib/types"

export type SeatMark = "aye" | "nay" | "open" | "out" | "quorum"

/** Inner rows first. 40+46+50+54+56+58+62+69 = 435. */
const ROWS = [40, 46, 50, 54, 56, 58, 62, 69]

export const SEAT_POINTS: { x: number; y: number }[] = ROWS.flatMap((count, row) => {
  const radius = 78 + row * 26
  const start = Math.PI * 1.08
  const end = Math.PI * 1.92
  return Array.from({ length: count }, (_, index) => {
    const t = count === 1 ? 0.5 : index / (count - 1)
    const theta = start + (end - start) * t
    return {
      x: Math.cos(theta) * radius,
      y: Math.sin(theta) * radius,
    }
  })
})

export function quorumPattern(): SeatMark[] {
  return SEAT_POINTS.map((_, index) => (index < QUORUM ? "quorum" : "out"))
}

function mix(marks: SeatMark[], seed: number): SeatMark[] {
  const copy = [...marks]
  let state = seed || 1
  for (let index = copy.length - 1; index > 0; index -= 1) {
    state = (state * 16807) % 2147483647
    const swap = state % (index + 1)
    const current = copy[index]
    copy[index] = copy[swap]
    copy[swap] = current
  }
  return copy
}

export function seatsFromTally(tally: Tally): SeatMark[] {
  const safe = clampTally(tally)
  const open = safe.present - safe.aye - safe.nay
  const present = mix(
    [
      ...Array<SeatMark>(safe.aye).fill("aye"),
      ...Array<SeatMark>(safe.nay).fill("nay"),
      ...Array<SeatMark>(open).fill("open"),
    ],
    safe.aye * 1000 + safe.nay * 17 + safe.present,
  )
  return SEAT_POINTS.map((_, index) => present[index] ?? "out")
}
