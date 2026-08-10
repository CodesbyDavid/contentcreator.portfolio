# Fadairo David Temiloluwa — Portfolio

A premium, modern portfolio for a Content Creator & Video Editor.
Built with HTML, CSS and JavaScript on Vite. Ready to deploy to Netlify.

## Quick start

```bash
npm install      # install dependencies (Vite)
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Project structure

```
├── index.html              # All page markup (semantic, SEO, accessible)
├── style.css               # Full design system + responsive styles
├── main.js                 # Projects config, grid, lightbox, interactions
├── netlify.toml            # Netlify build + cache config
├── public/
│   ├── favicon.svg         # Custom FD monogram favicon
│   └── assets/
│       ├── videos/         # ← drop your .mp4 files here
│       ├── images/         # ← drop your poster images / photos here
│       └── README.md       # How to add & replace projects
└── package.json
```

## Adding your videos and images

Full instructions are in `public/assets/README.md`. In short:

1. Drop a video into `public/assets/videos/` (e.g. `my-clip.mp4`).
2. Drop a poster image into `public/assets/images/` (e.g. `my-clip.jpg`).
3. Open `main.js`, find the `PROJECTS` list at the top, and edit a block:

```js
{
  title: "My New Project",
  category: "short-form",
  catLabel: "Short-form Video",
  desc: "A one-line description.",
  poster: "/assets/images/my-clip.jpg",
  video:  "/assets/videos/my-clip.mp4",
  size: "regular",      // regular | wide | tall
},
```

For a photo-only project, use `image` instead of `poster` + `video`.

The grid uses lazy loading — videos only load when scrolled into view, and
only one preview plays at a time on hover. No autoplay with sound.

## Deploying to Netlify

### Option A — Drag & drop (fastest)
1. Run `npm run build` locally.
2. Go to https://app.netlify.com/drop
3. Drag the `dist/` folder onto the page. Done.

### Option B — Git connected (auto-deploy)
1. Push this project to a GitHub/GitLab/Bitbucket repo.
2. In Netlify: **Add new site → Import an existing project** → pick the repo.
3. Build settings are already configured in `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click **Deploy**. Every push to your main branch will auto-deploy.

### Option C — Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --build --prod
```

## Notes
- The site ships with placeholder poster images (from Pexels) so it looks
  complete immediately. Replace them with your own media as you add files.
- All videos are user-initiated (click to play). The hero preview is muted
  and only loads when the play button is pressed.
- Fully responsive: iPhone, Android, tablets, desktop and large screens.
- No external runtime dependencies — just Vite for the build.
