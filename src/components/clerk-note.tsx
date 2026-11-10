export function ClerkNote({ children }: { children: React.ReactNode }) {
  return (
    <aside className="border-l-2 border-brass pl-4 text-sm leading-relaxed">
      <p className="text-xs font-medium tracking-[0.16em] text-brass uppercase">
        Clerk&apos;s note
      </p>
      <div className="mt-1 text-foreground/90">{children}</div>
    </aside>
  )
}
