# shraysoorma.github.io

Personal developer page, built as an actual comic book. Scrolling turns the pages. Static, no build step, no dependencies, no frameworks.

Live at https://shraysoorma.github.io

## Run it locally

```sh
python3 -m http.server 4173
```

Then open http://localhost:4173

## Editing

All content lives in `scripts/data.js`. Change the copy there, not in `index.html`.

- `SITE.links` is the contact panel. Confirm the LinkedIn URL, and see the note there for adding a resume PDF.
- `PROJECTS` is the lineup. Each project becomes its own page, so adding one adds a page.
- `AUTHOR` is the cover tagline, origin story, and the arsenal groups.

## How the book works

`scripts/book.js` turns the pages. It never hijacks scrolling: the `.book__rail` provides one screen of real scroll height per page, and the controller maps scroll position to a `--turn` value per page that CSS reads. The scrollbar, keyboard, trackpad, and touch all behave normally.

Book mode is opt in per viewport. `book.js` adds `html.fx-book` only when the window is at least 900px wide and 700px tall and the reader has not asked for reduced motion. Without that class the pages render as ordinary stacked sections, which is the vertical scrolling comic, so phones and short windows never clip a page.

Styling splits across `styles/`: `tokens.css` holds every color and size variable, `panels.css` the comic furniture, `parts.css` the remaining components, `animations.css` all motion, `book.css` the pagination. Motion is fully disabled under `prefers-reduced-motion`, and the page stays readable with JavaScript off.

Press the konami code on the live page.
