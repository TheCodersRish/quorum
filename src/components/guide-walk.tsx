"use client"

import { useState } from "react"
import { STATIONS } from "@/lib/stations"
import { cn } from "cn"

export function GuideWalk() {
  const [picked, setPicked] = useState<Record<string, number>>({})

  return (
    <ol className="mt-10 space-y-4">
      {STATIONS.map((station, index) => {
        const choice = picked[station.id]
        const selected = station.choice && choice !== undefined ? station.choice.options[choice] : null
        return (
          <li key={station.id} className="rounded-lg border border-border p-5 sm:p-6">
            <p className="text-xs tracking-[0.16em] text-brass uppercase">
              {index + 1} · {station.kicker}
            </p>
            <h2 className="mt-2 font-serif text-3xl">{station.title}</h2>
            <div className="mt-3 max-w-3xl space-y-3 text-base leading-relaxed text-foreground/90">
              {station.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {station.aside ? (
              <p className="mt-4 border-l-2 border-brass pl-4 text-sm leading-relaxed text-muted-foreground">
                {station.aside}
              </p>
            ) : null}
            {station.choice ? (
              <div className="mt-5">
                <p className="text-sm font-medium">{station.choice.prompt}</p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  {station.choice.options.map((option, optionIndex) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() =>
                        setPicked((current) => ({ ...current, [station.id]: optionIndex }))
                      }
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-left text-sm",
                        choice === optionIndex
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-brass",
                      )}
                      aria-pressed={choice === optionIndex}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {selected ? (
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/90">
                    {selected.result}
                  </p>
                ) : null}
              </div>
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}
