# Agent Notes

Use Australian English.

Keep this repo focused on helping creators make music-video clips. Ecosystem links should support that purpose rather than pulling the site into a general politics, travel, festival, or AI-tool catalogue.

## Voice

- Plain, warm and practical.
- Optimistic without overpromising.
- Self-sovereign: the creator owns the meaning, the boundaries and the final call.
- Use open-ended questions.
- Explain film and AI terms in simple language when they appear.
- Avoid technical detail unless it helps a beginner make the next decision.

## Public Boundaries

- Do not claim official approval, partnership, endorsement, judging, hosting, funding or support from sibling projects, festivals, communities, councils, AI labs, rights holders or artists.
- Do not make cultural, legal, copyright, youth-safety, privacy, music-rights or insurance claims sound settled.
- Keep public/private boundaries visible.
- Do not present AI output as proof, consent, identity, culture, lived experience or final authority.

## Architecture

This is a static site:

- shared CSS: `assets/css/styles.css`
- shared navigation and page behaviour: `assets/js/site.js`
- builder definitions: `assets/js/builder-data.js`
- builder runtime: `assets/js/builder-page.js`

Builder pages should remain first-class pages. They should autosave, generate Markdown, copy Markdown, and download `.md` files.

When updating builder fields, update:

1. `assets/js/builder-data.js`
2. the matching `builders/*.html`
3. the matching `templates/*.md`
4. any docs that describe the workflow

## Source Context

This repo drew from:

- i C. infinity music-video builder patterns
- GenAI music-video and comic pipeline documents
- Quandamooka Film Festival toolkit boundaries and builder patterns
- Strange But True field-guide tone
- P4A Musicverse culture-as-public-imagination pattern

Treat these as source architecture and neighbouring context, not gospel.
