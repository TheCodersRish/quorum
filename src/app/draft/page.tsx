import { Suspense } from "react"
import type { Metadata } from "next"
import { DraftDesk } from "@/components/draft-desk"

export const metadata: Metadata = {
  title: "Draft",
  description: "Write a student draft in the form of a House bill.",
}

export default function DraftPage({
  searchParams,
}: {
  searchParams: Promise<{ issue?: string; id?: string }>
}) {
  return (
    <Suspense
      fallback={
        <p className="mx-auto max-w-6xl px-4 py-16 text-muted-foreground">
          The clerk is opening a fresh pad.
        </p>
      }
    >
      <DraftLoader searchParams={searchParams} />
    </Suspense>
  )
}

async function DraftLoader({
  searchParams,
}: {
  searchParams: Promise<{ issue?: string; id?: string }>
}) {
  const params = await searchParams
  return (
    <DraftDesk
      initialIssueId={typeof params.issue === "string" ? params.issue : undefined}
      initialBillId={typeof params.id === "string" ? params.id : undefined}
    />
  )
}
