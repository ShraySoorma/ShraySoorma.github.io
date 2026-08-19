# shraysoorma.github.io

Personal developer page, styled as a Golden Age comic book. Static, no build step, no dependencies, no frameworks.

Live at https://shraysoorma.github.io

## Run it locally

```sh
python3 -m http.server 4173
```

Then open http://localhost:4173

## Editing

All content lives in `scripts/data.js`. Change the copy there, not in `index.html`.

- `SITE.links` is the contact panel. Confirm the LinkedIn URL, and see the note there for adding a resume PDF.
- `PROJECTS` is the lineup. An odd number of projects makes the last panel span the full row automatically.
- `AUTHOR` is the cover tagline, origin story, and the arsenal groups.

Styling splits across `styles/`: `tokens.css` holds every color and size variable, `panels.css` the comic furniture, `parts.css` the remaining components, `animations.css` all motion. Motion is fully disabled under `prefers-reduced-motion`, and the page stays readable with JavaScript off.

Press the konami code on the live page.
