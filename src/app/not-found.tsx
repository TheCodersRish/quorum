import Link from "next/link"

export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-serif text-4xl">That page is not in the jacket.</h1>
      <p className="mt-3 text-muted-foreground">The desk, the floor, and the guide are.</p>
      <Link href="/" className="mt-6 inline-block text-brass underline-offset-4 hover:underline">
        Back to the chamber
      </Link>
    </main>
  )
}
