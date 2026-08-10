# Portfolio Assets

This folder holds the media for the portfolio. The site is designed so you can
drop files in and edit one list in `main.js` — no other code changes needed.

## Folders

```
/public/assets/videos/   ← all video files (.mp4 recommended)
/public/assets/images/   ← poster images & photos (.jpg / .webp recommended)
```

## How to add or replace a project

1. Put your video in `public/assets/videos/` (e.g. `my-clip.mp4`).
2. Put a poster/thumbnail image in `public/assets/images/` (e.g. `my-clip.jpg`).
   The poster is what shows in the grid and before a video plays.
3. Open `main.js` and find the `PROJECTS` list at the top.
4. Copy one block and edit the fields:

```js
{
  title: "My New Project",
  category: "short-form",          // must match a filter: short-form | lifestyle | fashion | automotive | product | photography
  catLabel: "Short-form Video",
  desc: "A one-line description.",
  poster: "/assets/images/my-clip.jpg",
  video:  "/assets/videos/my-clip.mp4",
  size: "regular",                 // regular | wide | tall
},
```

## Image-only projects (Photography)

For a photo project, use `image` instead of `poster` + `video`:

```js
{
  title: "Street Selects",
  category: "photography",
  catLabel: "Photography",
  desc: "A set of street photography selects.",
  image: "/assets/images/street.jpg",
  size: "wide",
},
```

## Tips

- Keep videos short and well-compressed (under ~20MB each is ideal for web).
- Use `.mp4` (H.264) for the widest device support.
- Poster images should match the video's aspect ratio where possible.
- Filenames: lowercase, no spaces (use hyphens), e.g. `morning-ritual.mp4`.
- The grid uses lazy loading — videos only load when scrolled near, and only
  one preview plays at a time on hover.

## Current placeholders

The site ships with placeholder poster images (served from Pexels) so it looks
complete before you add your own files. Replace the `poster` / `image` URLs
with your local `/assets/...` paths as you add real content.
