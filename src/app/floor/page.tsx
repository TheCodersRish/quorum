import { Suspense } from "react"
import type { Metadata } from "next"
import { FloorSession } from "@/components/floor-session"

export const metadata: Metadata = {
  title: "Floor",
  description: "Count a simulated House vote on a student draft.",
}

export default function FloorPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  return (
    <Suspense
      fallback={
        <p className="mx-auto max-w-6xl px-4 py-16 text-muted-foreground">
          The reading clerk is finding the bill.
        </p>
      }
    >
      <FloorLoader searchParams={searchParams} />
    </Suspense>
  )
}

async function FloorLoader({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const params = await searchParams
  return <FloorSession billId={typeof params.id === "string" ? params.id : undefined} />
}
