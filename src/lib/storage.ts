import { isBill } from "@/lib/bills"
import type { Bill } from "@/lib/types"

const KEY = "quorum.bills.v1"

export function readBills(): Bill[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isBill)
  } catch {
    return []
  }
}

export function writeBills(bills: Bill[]) {
  window.localStorage.setItem(KEY, JSON.stringify(bills))
}

export function upsertBill(bill: Bill): Bill[] {
  const next = [bill, ...readBills().filter((item) => item.id !== bill.id)]
  writeBills(next)
  return next
}

export function removeBill(id: string): Bill[] {
  const next = readBills().filter((item) => item.id !== id)
  writeBills(next)
  return next
}

export function readBill(id: string): Bill | undefined {
  return readBills().find((item) => item.id === id)
}
