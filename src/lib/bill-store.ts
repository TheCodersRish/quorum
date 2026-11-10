"use client"

import { useSyncExternalStore } from "react"
import { readBills, writeBills } from "@/lib/storage"
import type { Bill } from "@/lib/types"

type BillStore = {
  ready: boolean
  bills: Bill[]
}

const SERVER_STORE: BillStore = { ready: false, bills: [] }
const EVENT = "quorum-bills"

let clientStore: BillStore = SERVER_STORE

function emit() {
  window.dispatchEvent(new Event(EVENT))
}

function subscribe(callback: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key && event.key !== "quorum.bills.v1") return
    clientStore = { ready: true, bills: readBills() }
    callback()
  }
  window.addEventListener(EVENT, callback)
  window.addEventListener("storage", onStorage)
  return () => {
    window.removeEventListener(EVENT, callback)
    window.removeEventListener("storage", onStorage)
  }
}

function getSnapshot(): BillStore {
  if (typeof window === "undefined") return SERVER_STORE
  if (!clientStore.ready) {
    clientStore = { ready: true, bills: readBills() }
  }
  return clientStore
}

function getServerSnapshot(): BillStore {
  return SERVER_STORE
}

export function useBillStore(): BillStore {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function saveBill(bill: Bill) {
  const current = getSnapshot().bills
  clientStore = {
    ready: true,
    bills: [bill, ...current.filter((item) => item.id !== bill.id)],
  }
  writeBills(clientStore.bills)
  emit()
}

export function deleteBill(id: string) {
  const current = getSnapshot().bills
  clientStore = {
    ready: true,
    bills: current.filter((item) => item.id !== id),
  }
  writeBills(clientStore.bills)
  emit()
}

export function subscribeHash(callback: () => void) {
  window.addEventListener("hashchange", callback)
  return () => window.removeEventListener("hashchange", callback)
}

export function readHash(): string {
  return window.location.hash
}

export function emptyHash(): string {
  return ""
}
