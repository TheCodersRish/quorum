import type { Metadata } from "next"
import { RecordDesk } from "@/components/record-desk"

export const metadata: Metadata = {
  title: "Record",
  description: "Drafts saved in this browser, and bills that arrive by link.",
}

export default function RecordPage() {
  return <RecordDesk />
}
