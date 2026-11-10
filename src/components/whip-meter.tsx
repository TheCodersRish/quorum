import { HOUSE_SEATS, QUORUM, type Tally } from "@/lib/types"
import { absent, marginLabel, undecided } from "@/lib/tally"

export function WhipMeter({ tally }: { tally: Tally }) {
  const open = undecided(tally)
  const gone = absent(tally)
  const segments = [
    { label: "Aye", value: tally.aye, className: "bg-aye" },
    { label: "Nay", value: tally.nay, className: "bg-nay" },
    { label: "Not voting", value: open, className: "bg-[#9aafc4]" },
    { label: "Absent", value: gone, className: "bg-[#1b334c]" },
  ]

  return (
    <div>
      <p className="text-xs tracking-[0.16em] text-brass uppercase">The count</p>
      <div
        className="mt-3 flex h-3 overflow-hidden rounded-full bg-[#1b334c]"
        role="img"
        aria-label={`${tally.aye} aye, ${tally.nay} nay, ${open} not voting, ${gone} absent`}
      >
        {segments.map((segment) =>
          segment.value > 0 ? (
            <div
              key={segment.label}
              className={segment.className}
              style={{ width: `${(segment.value / HOUSE_SEATS) * 100}%` }}
            />
          ) : null,
        )}
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
        {segments.map((segment) => (
          <div key={segment.label} className="flex justify-between gap-3">
            <dt className="text-muted-foreground">{segment.label}</dt>
            <dd className="tabular-nums">{segment.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-sm leading-relaxed">{marginLabel(tally)}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {tally.present >= QUORUM
          ? `${tally.present} members are present. A quorum is ${QUORUM}. The bill passes only if the ayes outnumber the nays.`
          : `${tally.present} members are present. That is short of a quorum of ${QUORUM}. The House should not be legislating.`}
      </p>
    </div>
  )
}
