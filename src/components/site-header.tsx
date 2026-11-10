"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "cn"

const LINKS = [
  { href: "/draft", label: "Draft" },
  { href: "/floor", label: "Floor" },
  { href: "/record", label: "Record" },
  { href: "/guide", label: "Guide" },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="no-print sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="font-serif text-2xl tracking-tight text-foreground">
          Quorum
        </Link>
        <nav aria-label="Main" className="flex flex-wrap gap-1">
          {LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/80 hover:bg-muted hover:text-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
