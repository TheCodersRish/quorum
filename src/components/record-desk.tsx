"use client"

import { useState, useSyncExternalStore } from "react"
import Link from "next/link"
import { cn } from "cn"
import { BillPaper } from "@/components/bill-paper"
import { LetterDialog } from "@/components/letter-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { statusLabel } from "@/lib/bills"
import { decodeBill, encodeBill } from "@/lib/share"
import { deleteBill, emptyHash, readHash, saveBill, subscribeHash, useBillStore } from "@/lib/bill-store"
import type { Bill } from "@/lib/types"

export function RecordDesk() {
  const store = useBillStore()
  const hash = useSyncExternalStore(subscribeHash, readHash, emptyHash)
  const [openId, setOpenId] = useState<string | null>(null)
  const [pendingDelete, setPendingDelete] = useState<string | null>(null)
  const [shareFor, setShareFor] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [dismissedHash, setDismissedHash] = useState("")

  const token = hash.replace(/^#/, "")
  let incoming: Bill | null = null
  if (token && hash !== dismissedHash) {
    try {
      incoming = decodeBill(decodeURIComponent(token))
    } catch {
      incoming = decodeBill(token)
    }
  }
  const broken = Boolean(token) && hash !== dismissedHash && !incoming

  function dismissLink() {
    setDismissedHash(hash)
    if (window.location.hash) history.replaceState(null, "", "/record")
  }

  if (!store.ready) {
    return (
      <p className="mx-auto max-w-6xl px-4 py-16 text-muted-foreground">
        The clerk is opening the record.
      </p>
    )
  }

  const shareBill = store.bills.find((bill) => bill.id === shareFor)
  const shareUrl =
    shareBill && typeof window !== "undefined"
      ? `${window.location.origin}/record#${encodeBill(shareBill)}`
      : ""

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <p className="text-xs tracking-[0.2em] text-brass uppercase">The record</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">What this desk is holding.</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Drafts stay in this browser until you copy them or share a link. Clearing
        the site&apos;s data clears the record.
      </p>

      {broken ? (
        <p className="mt-6 rounded-lg border border-nay/50 px-4 py-3 text-sm" role="alert">
          The link in the address bar does not contain a readable bill.
        </p>
      ) : null}

      {incoming ? (
        <section className="mt-6 rounded-lg border border-primary/50 bg-primary/10 p-4">
          <h2 className="font-serif text-2xl">
            A draft arrived: {incoming.shortTitle || "Untitled draft"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {store.bills.some((bill) => bill.id === incoming?.id)
              ? "This desk already has a draft with the same id. Filing the link replaces that copy."
              : "Filing it keeps a copy here. It does not introduce anything in Congress."}
          </p>
          <Button
            type="button"
            className="mt-4 h-10 px-4"
            onClick={() => {
              if (!incoming) return
              saveBill(incoming)
              dismissLink()
            }}
          >
            File it on this desk
          </Button>
        </section>
      ) : null}

      {store.bills.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-border px-6 py-10">
          <h2 className="font-serif text-3xl">The clerk&apos;s desk is clear.</h2>
          <p className="mt-2 max-w-lg text-muted-foreground">
            A bill you have not drafted yet cannot be lost. Start with a problem
            you have actually seen.
          </p>
          <Link href="/draft" className={cn(buttonVariants({ className: "mt-5 h-11 px-5" }))}>
            Draft a bill
          </Link>
        </div>
      ) : (
        <ul className="mt-8 grid gap-4">
          {store.bills.map((bill) => {
            const open = openId === bill.id
            return (
              <li key={bill.id} className="rounded-lg border border-border p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs tracking-[0.16em] text-brass uppercase">
                      {statusLabel(bill.status)}
                    </p>
                    <h2 className="mt-1 font-serif text-3xl">
                      {bill.shortTitle || "Untitled draft"}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {bill.state || "No state named"}
                      {bill.vote
                        ? ` · ${bill.vote.aye}–${bill.vote.nay}`
                        : ""}
                      {" · "}
                      {new Date(bill.updatedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/floor?id=${bill.id}`}
                      className={cn(buttonVariants({ variant: "outline", className: "h-10" }))}
                    >
                      Floor
                    </Link>
                    <Link
                      href={`/draft?id=${bill.id}`}
                      className={cn(buttonVariants({ variant: "outline", className: "h-10" }))}
                    >
                      Edit
                    </Link>
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-10"
                      onClick={() => setOpenId(open ? null : bill.id)}
                    >
                      {open ? "Hide the text" : "Read it"}
                    </Button>
                  </div>
                </div>
                {open ? (
                  <div className="mt-5 grid gap-4">
                    <BillPaper bill={bill} />
                    <div className="no-print flex flex-wrap gap-2">
                      <LetterDialog bill={bill} />
                      <Button
                        type="button"
                        variant="outline"
                        className="h-10"
                        onClick={() => {
                          setShareFor(bill.id)
                          setCopied(false)
                        }}
                      >
                        Share a link
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-10"
                        onClick={() => window.print()}
                      >
                        Print
                      </Button>
                      {pendingDelete === bill.id ? (
                        <Button
                          type="button"
                          variant="destructive"
                          className="h-10"
                          onClick={() => {
                            deleteBill(bill.id)
                            setPendingDelete(null)
                          }}
                        >
                          Yes, remove it
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-10"
                          onClick={() => setPendingDelete(bill.id)}
                        >
                          Remove from the desk
                        </Button>
                      )}
                    </div>
                  </div>
                ) : null}
              </li>
            )
          })}
        </ul>
      )}

      {shareBill ? (
        <section className="mt-6 rounded-lg border border-border p-4">
          <h2 className="font-serif text-2xl">A link to this draft</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Anyone with the link can read the text. The bill is inside the link,
            not on a server.
          </p>
          <Textarea readOnly value={shareUrl} className="mt-3 min-h-28 text-xs" />
          <Button
            type="button"
            className="mt-3 h-10 px-4"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(shareUrl)
                setCopied(true)
              } catch {
                setCopied(false)
              }
            }}
          >
            {copied ? "Copied" : "Copy the link"}
          </Button>
        </section>
      ) : null}
    </div>
  )
}
