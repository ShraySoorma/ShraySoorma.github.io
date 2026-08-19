# shraysoorma.github.io

Personal developer page, built as an actual comic book: an open comic lying on a table, two facing pages at a time, scrolling turns the leaves. Static, no build step, no dependencies, no frameworks.

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

`scripts/book.js` builds the book out of the `.page` sections in `index.html`. Leaf k carries page 2k on its front and page 2k+1 on its back, so turning one sheet swaps both halves of the spread the way paper does. The reading order is cover, then origin facing the first project, and so on to the arsenal facing the letters page.

It never hijacks scrolling: `.book__rail` provides one screen of real scroll height per turn, and the controller only maps scroll position onto a `--turn` value per leaf that CSS reads. The scrollbar, keyboard, trackpad, and touch all behave normally. In page anchors are translated to the spread that holds them, since a fixed leaf has nothing for a `#hash` to scroll to.

Everything on a page is sized in `--pu`, one hundredth of a page height, so the spread scales as one piece at any window size instead of being tuned for one and cramped at the rest.

Book mode is opt in per viewport. `book.js` adds `html.fx-book` only when the window is at least 900px wide and 640px tall and the reader has not asked for reduced motion. Without it the leaf wrappers collapse with `display: contents` and the pages render as ordinary stacked sections, which is the vertical scrolling comic, so phones and short windows never clip a page.

Styling splits across `styles/`: `tokens.css` holds every color and size variable, `panels.css` the comic furniture, `parts.css` the remaining components, `animations.css` all motion, `book.css` the pagination. Motion is fully disabled under `prefers-reduced-motion`, and the page stays readable with JavaScript off.

Press the konami code on the live page.
