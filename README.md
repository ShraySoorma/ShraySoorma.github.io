# shraysoorma.github.io

Personal developer page as a monochrome phosphor terminal with a single amber accent. A tiled hacker desktop with a prompt you can actually type into. Static, no build step, no dependencies, no frameworks.

Live at https://shraysoorma.github.io

## Run it locally

```sh
python3 -m http.server 4173
```

Then open http://localhost:4173

## Editing

All content lives in `scripts/data.js`. Change the copy there, nothing else.

- `SITE.links` is `contact.txt`. Confirm the LinkedIn URL, and see the note there for adding a resume.
- `PROJECTS` becomes `~/projects/*.md`. Adding an entry adds a file, a nav item and a tab completion with no other edits.
- `AUTHOR` is `about.md` (tagline, origin, the quote) and `arsenal.txt` (the grouped stack).

## How it works

`scripts/fs.js` builds a small virtual filesystem out of `data.js`. `scripts/shell.js` parses a line, runs a built-in, and hands `scripts/render.js` a result to turn into output. Nav entries carry a `data-cmd` and call `Shell.run` with the exact string a visitor would have typed, so clicking and typing are one code path rather than two that can drift.

Commands: `help`, `ls`, `cd`, `cat`, `open`, `whoami`, `arsenal`, `contact`, `neofetch`, `clear`, and one easter egg. Up and down walk history, Tab completes to the longest unambiguous prefix, Ctrl+L clears. `cat charlore` resolves from anywhere, not just from inside `~/projects`.

`scripts/ambient.js` runs the matrix rain, the code stream and the fake process readout. All of it is `aria-hidden`, pauses when the tab is hidden, and switches off under `prefers-reduced-motion` or below 900px. `scripts/boot.js` plays the POST crawl once per session, is skippable with any key, and has a hard ceiling so it can only ever delay the desktop, never prevent it.

Below 900px the side panes drop and the whole thing becomes one flowing column with a sticky prompt.

Styling splits across `styles/`: `tokens.css` holds every colour and size, `layout.css` the pane grid, `terminal.css` the prompt and output blocks, `crt.css` the scanlines and glow. Full phosphor `#ffffff` is reserved for the prompt, headings and accents; body copy uses a dimmed grey so a screen of project text stays readable. Amber `#ffb000` is spent only on what is alive or actionable: the caret and focus ring, the title-bar LED, the `live` badge, directory entries and hover states. Red `#ff4d4d` is reserved for errors. Everything else stays grey, which is what keeps the amber worth looking at. Warn output is additionally marked `[!]` in text, errors `[x]`, so status never depends on hue alone.

Mobile is handled in the `max-width: 900px` block: the three panes collapse to one column, the prompt sticks to the bottom clear of the home indicator, the input is pinned to 16px so iOS does not zoom on focus, nav entries get 44px touch targets, and `:hover` is gated behind `@media (hover: hover)` so taps do not leave entries lit.
