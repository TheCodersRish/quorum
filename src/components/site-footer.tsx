export function SiteFooter() {
  return (
    <footer className="no-print mt-16 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm leading-relaxed text-muted-foreground sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-xl">
          Quorum is a classroom model of the U.S. House. It is not the House of
          Representatives. A draft you write here is not introduced until a
          member of Congress introduces it.
        </p>
        <p className="flex flex-wrap gap-x-4 gap-y-1">
          <a
            className="underline decoration-brass/70 underline-offset-4 hover:text-foreground"
            href="https://www.house.gov/representatives/find-your-representative"
            target="_blank"
            rel="noreferrer"
          >
            Find your representative
          </a>
          <a
            className="underline decoration-brass/70 underline-offset-4 hover:text-foreground"
            href="https://www.congress.gov"
            target="_blank"
            rel="noreferrer"
          >
            Congress.gov
          </a>
        </p>
      </div>
    </footer>
  )
}
