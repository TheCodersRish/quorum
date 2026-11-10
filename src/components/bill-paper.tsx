import { billSections, displayTitle } from "@/lib/text"
import type { Bill } from "@/lib/types"

export function BillPaper({ bill }: { bill: Bill }) {
  const sections = billSections(bill)
  const title = bill.shortTitle.trim() || "Untitled draft"

  return (
    <article className="bill-paper text-paper-ink">
      <p className="text-center text-xs tracking-[0.22em] uppercase">119th Congress</p>
      <p className="text-center text-xs tracking-[0.22em] uppercase">2d Session</p>
      <p className="mt-4 text-center font-serif text-lg tracking-[0.18em]">H.R. ____</p>
      <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed">
        {displayTitle(bill.officialTitle)}.
      </p>
      <p className="mt-6 text-center text-xs tracking-[0.18em] uppercase">
        In the House of Representatives
      </p>
      <p className="mt-2 text-center text-xs">
        A student draft, for a simulated session. Not introduced.
      </p>
      <h2 className="mt-6 text-center font-serif text-3xl">{title}</h2>
      {bill.amended ? (
        <p className="mt-2 text-center text-xs tracking-[0.14em] uppercase">
          As amended in a simulated House
        </p>
      ) : null}
      <p className="mt-6 text-sm leading-relaxed">
        Be it enacted by the Senate and House of Representatives of the United
        States of America in Congress assembled,
      </p>
      <div className="mt-6 space-y-5">
        {sections.map((section) => (
          <section key={section.heading}>
            <h3 className="text-sm font-semibold tracking-wide">{section.heading}</h3>
            <p className="mt-1 text-sm leading-relaxed whitespace-pre-wrap">{section.body}</p>
          </section>
        ))}
      </div>
      {bill.amendmentNotes.length > 0 ? (
        <footer className="mt-6 border-t border-[#d7c7a4] pt-4 text-sm">
          <p className="text-xs tracking-[0.16em] uppercase">Clerk&apos;s annotation</p>
          <ul className="mt-2 list-disc space-y-1 pl-4">
            {bill.amendmentNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </footer>
      ) : null}
    </article>
  )
}
