import Link from "next/link"
import { cn } from "cn"
import { Chamber } from "@/components/chamber"
import { buttonVariants } from "@/components/ui/button"
import { ISSUES } from "@/lib/issues"
import { quorumPattern } from "@/lib/seats"

const BRIEFS = ISSUES.filter((issue) => issue.id !== "own")

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div>
          <p className="text-xs tracking-[0.22em] text-brass uppercase">
            119th Congress · 2d Session · a simulation
          </p>
          <h1 className="mt-4 font-serif text-[clamp(3.2rem,8vw,6.4rem)] leading-[0.92] tracking-tight">
            Staff the bill.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Pick a problem from your town. Write it the way a statute is written.
            Then sit in the cloakroom and count the votes. Nothing here is filed
            with Congress until a real member introduces it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/draft" className={cn(buttonVariants({ className: "h-11 px-5" }))}>
              Draft a bill
            </Link>
            <Link
              href="/guide"
              className={cn(buttonVariants({ variant: "outline", className: "h-11 px-5" }))}
            >
              How a bill actually moves
            </Link>
          </div>
        </div>
        <div>
          <Chamber
            gather
            votes={quorumPattern()}
            label="A horseshoe of 435 House seats. 218 are lit, which is a quorum, not a victory."
          />
          <p className="mt-2 text-center text-sm text-muted-foreground">
            218 seats lit. That is a quorum, not a victory.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-3">
        {[
          ["Write it like a statute", "A short title, findings, operative sections, and a sentence about money. No slogans standing in for text."],
          ["Count a real quorum", "218 members must be present. Passage is a majority of those voting, which is a different number."],
          ["Leave with a letter", "You cannot introduce the bill. You can ask a member's office what is wrong with the draft."],
        ].map(([title, body]) => (
          <article key={title} className="rounded-lg border border-border p-5">
            <h2 className="font-serif text-2xl">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs tracking-[0.2em] text-brass uppercase">Starting points</p>
            <h2 className="mt-2 font-serif text-4xl">Six problems. Or bring your own.</h2>
          </div>
          <Link href="/draft?issue=own" className="text-sm text-brass underline-offset-4 hover:underline">
            Start from a blank pad
          </Link>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BRIEFS.map((issue) => (
            <Link
              key={issue.id}
              href={`/draft?issue=${issue.id}`}
              className="rounded-lg border border-border p-4 hover:border-brass"
            >
              <p className="text-xs tracking-[0.16em] text-brass uppercase">{issue.who}</p>
              <h3 className="mt-2 font-serif text-2xl">{issue.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{issue.problem}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4 pb-4">
        <div className="rounded-sm bg-paper px-6 py-8 text-paper-ink sm:px-10 sm:py-10">
          <p className="text-xs tracking-[0.2em] text-[#8a5a12] uppercase">
            The distinction the cartoon skips
          </p>
          <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
            218 is a quorum, not a victory.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed sm:text-lg">
            Article I, section 5 says a majority of each house shall constitute a
            quorum to do business. In a House of 435 voting members, that number
            is 218. Passage of an ordinary bill is different: a majority of the
            members voting aye or nay, if a quorum is present. If 300 members
            vote, 151 ayes can pass a bill. You can also lose with 200 ayes, if
            201 members vote no.
          </p>
          <Link
            href="/guide"
            className="mt-6 inline-block text-sm text-[#8a5a12] underline decoration-[#8a5a12]/50 underline-offset-4"
          >
            Walk the rest of the path
          </Link>
        </div>
      </section>
    </main>
  )
}
