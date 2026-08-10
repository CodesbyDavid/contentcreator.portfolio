/* =========================================================
   FADAIRO DAVID TEMILOLUWA — Portfolio
   main.js — projects config, grid, lightbox, interactions
   ========================================================= */

/* ---------- Projects ----------
   HOW TO ADD / REPLACE A PROJECT:
   1. Drop your video into /assets/videos/  (e.g. my-clip.mp4)
   2. Drop a poster image into /assets/images/  (e.g. my-clip.jpg)
   3. Copy a block below and edit the fields.
   - "video"  → path to the video file (omit for image-only projects)
   - "poster" → thumbnail shown before play / in the grid
   - "image"  → use instead of "poster"+"video" for photography
   - "size"   → "regular" | "wide" | "tall"  (controls grid span)
   - "category" must match one of the filter data-filter values
   ----------------------------------------------------------------- */
const PROJECTS = [
  {
    title: "Neon Streets",
    category: "short-form",
    catLabel: "Short-form Video",
    desc: "A fast-paced short-form edit built around rhythm, cuts and colour.",
    poster: "https://images.pexels.com/photos/2330137/pexels-photo-2330137.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    video: "/assets/videos/neon-streets.mp4",
    size: "wide",
  },
  {
    title: "Studio Sessions",
    category: "fashion",
    catLabel: "Fashion",
    desc: "Clean fashion edit focused on light, texture and movement.",
    poster: "https://images.pexels.com/photos/18516743/pexels-photo-18516743.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    video: "/assets/videos/studio-sessions.mp4",
    size: "tall",
  },
  {
    title: "Morning Ritual",
    category: "lifestyle",
    catLabel: "Lifestyle",
    desc: "A calm lifestyle piece capturing the feel of a slow morning.",
    poster: "https://images.pexels.com/photos/34531681/pexels-photo-34531681.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    video: "/assets/videos/morning-ritual.mp4",
    size: "regular",
  },
  {
    title: "Chrome & Detail",
    category: "automotive",
    catLabel: "Automotive",
    desc: "Automotive detail study — reflections, lines and presence.",
    poster: "https://images.pexels.com/photos/31574905/pexels-photo-31574905.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    video: "/assets/videos/chrome-detail.mp4",
    size: "regular",
  },
  {
    title: "Product Story",
    category: "product",
    catLabel: "Product / Brand",
    desc: "Brand-focused product content with clean framing and pacing.",
    poster: "https://images.pexels.com/photos/8128067/pexels-photo-8128067.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    video: "/assets/videos/product-story.mp4",
    size: "regular",
  },
  {
    title: "On Location",
    category: "photography",
    catLabel: "Photography",
    desc: "Behind-the-camera moments and street photography selects.",
    image: "https://images.pexels.com/photos/17589782/pexels-photo-17589782.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    size: "wide",
  },
];

/* ---------- Render grid ---------- */
const grid = document.getElementById("workGrid");

function renderProjects(filter = "all") {
  grid.innerHTML = PROJECTS.map((p, i) => {
    const hidden = filter !== "all" && p.category !== filter ? " is-hidden" : "";
    const sizeClass = p.size === "wide" ? " card--wide" : p.size === "tall" ? " card--tall" : "";
    const isVideo = !!p.video;
    const mediaSrc = p.image || p.poster;
    const mediaAlt = `${p.title} — ${p.catLabel}`;
    const badge = isVideo
      ? `<span class="card__badge"><svg class="play-ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg> Video</span>`
      : `<span class="card__badge">Photo</span>`;

    const media = isVideo
      ? `<video class="card__video" muted loop playsinline preload="none" poster="${p.poster}" aria-label="${mediaAlt}">
           <source data-src="${p.video}" type="video/mp4" />
         </video>`
      : `<img class="card__img" loading="lazy" decoding="async" src="${mediaSrc}" alt="${mediaAlt}" />`;

    return `
      <article class="card${sizeClass}${hidden}" data-index="${i}" data-category="${p.category}" tabindex="0" role="button" aria-label="Open ${p.title}">
        <div class="card__media">
          ${badge}
          ${media}
          <div class="card__overlay">
            <span class="card__view">View project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
          </div>
        </div>
        <div class="card__body">
          <span class="card__cat">${p.catLabel}</span>
          <h3 class="card__title">${p.title}</h3>
          <p class="card__desc">${p.desc}</p>
        </div>
      </article>`;
  }).join("");

  attachCardEvents();
  setupLazyVideo();
}

/* ---------- Card hover → lazy-load video preview ---------- */
function setupLazyVideo() {
  const cards = grid.querySelectorAll(".card");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const card = entry.target;
        const video = card.querySelector("video");
        if (video && !video.dataset.loaded) {
          const source = video.querySelector("source");
          if (source && source.dataset.src) {
            source.src = source.dataset.src;
            video.load();
            video.dataset.loaded = "1";
          }
        }
        io.unobserve(card);
      });
    },
    { rootMargin: "200px" }
  );
  cards.forEach((c) => io.observe(c));
}

function attachCardEvents() {
  const cards = grid.querySelectorAll(".card");
  cards.forEach((card) => {
    const video = card.querySelector("video");

    card.addEventListener("mouseenter", () => {
      if (video && video.dataset.loaded) {
        video.play().catch(() => {});
      }
    });
    card.addEventListener("mouseleave", () => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
    card.addEventListener("focus", () => {
      if (video && video.dataset.loaded) {
        video.play().catch(() => {});
      }
    });
    card.addEventListener("blur", () => {
      if (video) video.pause();
    });

    card.addEventListener("click", () => openLightbox(Number(card.dataset.index)));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(Number(card.dataset.index));
      }
    });
  });
}

/* ---------- Filters ---------- */
const filters = document.getElementById("workFilters");
filters.addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  filters.querySelectorAll(".chip").forEach((c) => {
    c.classList.remove("is-active");
    c.setAttribute("aria-selected", "false");
  });
  btn.classList.add("is-active");
  btn.setAttribute("aria-selected", "true");
  renderProjects(btn.dataset.filter);
});

/* ---------- Lightbox ---------- */
const lightbox = document.getElementById("lightbox");
const lbMedia = document.getElementById("lbMedia");
const lbCat = document.getElementById("lbCat");
const lbTitle = document.getElementById("lbTitle");
const lbDesc = document.getElementById("lbDesc");
let lbVideo = null;

function openLightbox(index) {
  const p = PROJECTS[index];
  if (!p) return;

  lbCat.textContent = p.catLabel;
  lbTitle.textContent = p.title;
  lbDesc.textContent = p.desc;

  if (p.video) {
    lbMedia.innerHTML = `<video controls playsinline preload="metadata" poster="${p.poster}" aria-label="${p.title} preview">
      <source src="${p.video}" type="video/mp4" />
    </video>`;
    lbVideo = lbMedia.querySelector("video");
  } else {
    lbMedia.innerHTML = `<img src="${p.image}" alt="${p.title} — ${p.catLabel}" />`;
    lbVideo = null;
  }

  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lbVideo) {
    lbVideo.pause();
    lbVideo = null;
  }
  setTimeout(() => {
    if (!lightbox.classList.contains("is-open")) lbMedia.innerHTML = "";
  }, 450);
}

lightbox.querySelectorAll("[data-lb-close]").forEach((el) =>
  el.addEventListener("click", closeLightbox)
);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
});

/* ---------- Hero video ---------- */
function setupHeroVideo() {
  const video = document.querySelector("[data-hero-video]");
  const playBtn = document.querySelector("[data-hero-play]");
  const frame = video ? video.closest(".hero__frame") : null;
  if (!video || !playBtn || !frame) return;

  let loaded = false;
  const load = () => {
    if (loaded) return;
    const source = video.querySelector("source");
    if (source && source.dataset.src) {
      source.src = source.dataset.src;
      video.load();
      loaded = true;
    }
  };

  playBtn.addEventListener("click", () => {
    load();
    frame.classList.add("is-playing");
    video.muted = false;
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });
  });

  video.addEventListener("click", () => {
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
      frame.classList.remove("is-playing");
    }
  });
}

/* ---------- Nav ---------- */
function setupNav() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const mobile = document.getElementById("navMobile");

  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
    const progress = document.querySelector(".scroll-progress span");
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${(window.scrollY / h) * 100}%`;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toggle.addEventListener("click", () => {
    const open = toggle.classList.toggle("is-open");
    mobile.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    mobile.setAttribute("aria-hidden", String(!open));
  });

  mobile.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      toggle.classList.remove("is-open");
      mobile.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      mobile.setAttribute("aria-hidden", "true");
    })
  );
}

/* ---------- Reveal on scroll ---------- */
function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );
  items.forEach((el) => io.observe(el));
}

/* ---------- Init ---------- */
renderProjects();
setupHeroVideo();
setupNav();
setupReveal();
