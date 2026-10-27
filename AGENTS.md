<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Course/lesson/exercise content lives in src/lib (products.ts, exercises.ts, audit.ts); components only render it — keeps copy editable in one place.
- Browser storage holds only lesson-completion ticks (src/lib/progress.ts); reflection text stays in component memory — private writing must never persist without a secure backend.
- Shop cover art and merchandising copy live separately from course data in src/lib/shop-editorial.ts; shop-only styles and an optional Shell width keep catalogue presentation isolated from lessons and other pages.
