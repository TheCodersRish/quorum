"use client"

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-serif text-4xl">The clerk dropped the papers.</h1>
      <p className="mt-3 text-muted-foreground">
        The page failed to render. Your drafts, if you saved any, are still in
        this browser.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        Try again
      </button>
    </main>
  )
}
