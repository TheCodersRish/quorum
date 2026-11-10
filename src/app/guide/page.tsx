import type { Metadata } from "next"
import { GuideWalk } from "@/components/guide-walk"

export const metadata: Metadata = {
  title: "Guide",
  description: "How a bill actually moves through Congress, including the parts that stop it.",
}

export default function GuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <p className="text-xs tracking-[0.2em] text-brass uppercase">The path</p>
      <h1 className="mt-2 max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">
        How a bill actually moves.
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        The cartoon is not wrong so much as unfinished. Most bills die quietly.
        The Senate is not a second House. A signature is not the same thing as
        money in an account.
      </p>
      <GuideWalk />
      <section className="mt-12 overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <caption className="px-4 py-4 text-left font-serif text-2xl">
            When every seat is filled
          </caption>
          <thead className="text-xs tracking-[0.14em] text-brass uppercase">
            <tr>
              <th className="px-4 py-2 font-medium">Question</th>
              <th className="px-4 py-2 font-medium">House</th>
              <th className="px-4 py-2 font-medium">Senate</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Voting members", "435", "100"],
              ["Quorum to do business", "218", "51"],
              ["Ordinary passage", "A majority of those voting aye or nay", "A majority of those voting aye or nay"],
              ["Ending debate", "The previous question, by majority", "Cloture, usually 60"],
              ["Amendments", "Often limited by a special rule", "Generally open, until cloture"],
            ].map((row) => (
              <tr key={row[0]} className="border-t border-border">
                {row.map((cell, index) => (
                  <td key={`${row[0]}-${index}`} className="px-4 py-3 align-top">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="mt-10 max-w-3xl">
        <h2 className="font-serif text-3xl">If you are going to change this app</h2>
        <p className="mt-3 text-muted-foreground">
          The interesting edits are in the open. Three that teach you the code:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed">
          <li>
            Add a brief from your own school in <code>src/lib/issues.ts</code>, then
            make the findings something you can source.
          </li>
          <li>
            Change the whip math in <code>src/lib/debate.ts</code>. A path that
            always passes is a broken lesson. A path that never passes is one too.
          </li>
          <li>
            The floor only simulates the House. A Senate sitting would need
            cloture, and the number would not be 218.
          </li>
        </ul>
      </section>
    </main>
  )
}
