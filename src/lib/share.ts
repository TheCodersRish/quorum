import { isBill } from "@/lib/bills"
import type { Bill } from "@/lib/types"

export function encodeBill(bill: Bill): string {
  const bytes = new TextEncoder().encode(JSON.stringify(bill))
  let binary = ""
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/g, "")
}

export function decodeBill(token: string): Bill | null {
  try {
    const padded = token.replaceAll("-", "+").replaceAll("_", "/")
    const withPad = padded + "=".repeat((4 - (padded.length % 4)) % 4)
    const binary = atob(withPad)
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
    const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes))
    return isBill(parsed) ? parsed : null
  } catch {
    return null
  }
}
