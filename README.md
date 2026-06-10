# Explorers Music Video Lab

A static, GitHub Pages-ready site and Markdown builder toolkit for turning songs into music-video clips.

The site is inspired by the i C. infinity music-video workflow, but generalised for emerging musicians, phone filmmakers, artists, community storytellers, festival makers, and optimistic explorers who want practical tools without losing creative control.

## Local Preview

From this repo folder:

```powershell
python -m http.server 4182 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:4182/
```

## Page Map

- `index.html` - public home and project doorway.
- `workflow.html` - plain-language music-video workflow from song to first cut.
- `questions.html` - open-ended creative questions for self-sovereign creators.
- `ecosystem.html` - sibling links to i C. infinity, Quandamooka Film Festival, Strange But True, P4A Musicverse, and related field kits.
- `boundaries.html` - public/private, AI, consent, cultural, youth, voice and copyright boundaries.
- `sources.html` - source posture and local docs used.
- `builders/index.html` - builder directory.
- `builders/*.html` - autosaving Markdown builder forms.
- `templates/*.md` - plain Markdown reference templates.
- `docs/` - source notes, site map, style guide and design concept.

## Builder Workflow

Each builder:

1. Autosaves in the browser using `localStorage`.
2. Generates Markdown in the preview area.
3. Provides copy and download buttons.
4. Keeps the creator in charge of meaning, boundaries, references and final choices.
5. Produces useful files for later AI, editing, festival, collaborator or human review work.

## Source Posture

The source documents and sibling repos were treated as background architecture and style references, not as public authority.

This repo does not claim official endorsement from any artist, festival, community group, platform, AI lab, council, sponsor, rights holder or cultural authority.

## Assets

- `assets/img/hero-*.webp` are generated hero images for the site pages.
- `docs/design-concept.png` is the generated UI concept used as a visual reference.
- `assets/favicon.svg` is a custom treble-clef favicon.

## Publish

The site is plain static HTML/CSS/JS. It can be published through GitHub Pages with the repository root as the Pages source.
