"use client"

import { useState } from "react"
import { cn } from "cn"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { letterText } from "@/lib/text"
import type { Bill } from "@/lib/types"

export function LetterDialog({
  bill,
  label = "Write the letter",
}: {
  bill: Bill
  label?: string
}) {
  const [copied, setCopied] = useState(false)
  const text = letterText(bill)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) setCopied(false)
      }}
    >
      <DialogTrigger render={<Button variant="outline" className="h-10" />}>
        {label}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">A letter, not a filing</DialogTitle>
          <DialogDescription>
            Only a member of Congress can introduce a bill. This asks an office to
            tell you what is wrong with the draft. Look up the member before you
            put a name in the greeting.
          </DialogDescription>
        </DialogHeader>
        <Textarea readOnly value={text} className="min-h-64 text-sm leading-relaxed" />
        <div className="flex flex-wrap gap-2">
          <Button type="button" className="h-10 px-4" onClick={copy}>
            {copied ? "Copied" : "Copy the letter"}
          </Button>
          <a
            href="https://www.house.gov/representatives/find-your-representative"
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", className: "h-10" }))}
          >
            Find your representative
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
