/** Reusable audio slot. Pass `src` once Signe's own recording exists; otherwise shows an honest placeholder. */
export function AudioSlot({ title, src }: { title: string; src?: string }) {
  return (
    <div className="flex items-center gap-4 rounded-md border border-border bg-card p-4">
      <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm">♪</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{title}</p>
        {src ? (
          <audio controls src={src} className="mt-2 w-full" />
        ) : (
          <p className="text-xs text-muted-foreground">Coming soon — Signe is recording this.</p>
        )}
      </div>
    </div>
  );
}
