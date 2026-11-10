import { SEAT_POINTS, type SeatMark } from "@/lib/seats"

const FILL: Record<SeatMark, string> = {
  aye: "#8fd0a8",
  nay: "#e58b7b",
  open: "#9aafc4",
  out: "#1b334c",
  quorum: "#e0b15a",
}

export function Chamber({
  votes,
  label,
  gather = false,
}: {
  votes: SeatMark[]
  label: string
  gather?: boolean
}) {
  const pad = 36
  const xs = SEAT_POINTS.map((point) => point.x)
  const ys = SEAT_POINTS.map((point) => point.y)
  const minX = Math.min(...xs) - pad
  const maxX = Math.max(...xs) + pad
  const minY = Math.min(...ys) - pad
  const maxY = Math.max(...ys) + 52

  return (
    <figure className="w-full">
      <svg
        viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`}
        role="img"
        aria-label={label}
        className="h-auto w-full"
      >
        <rect
          x={-70}
          y={8}
          width={140}
          height={22}
          rx={2}
          fill="none"
          stroke="#e0b15a"
          strokeOpacity={0.7}
        />
        <text
          x={0}
          y={23}
          textAnchor="middle"
          fill="#e0b15a"
          fontSize={9}
          letterSpacing={2}
        >
          SPEAKER
        </text>
        {SEAT_POINTS.map((point, index) => {
          const mark = votes[index] ?? "out"
          const delay = gather && mark === "quorum" ? Math.min(index, 218) * 12 : 0
          return (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={mark === "out" ? 2.5 : 3.15}
              fill={FILL[mark]}
              className={gather && mark === "quorum" ? "seat-rise" : undefined}
              style={delay ? { animationDelay: `${delay}ms` } : undefined}
            />
          )
        })}
      </svg>
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  )
}
