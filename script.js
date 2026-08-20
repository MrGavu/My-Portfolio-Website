(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ============================================================
     CUSTOM CURSOR
  ============================================================ */
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (canHover && cursorDot && cursorRing && !reduceMotion) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.body.classList.add("cursor-ready");

    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      cursorDot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });

    const tickRing = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      cursorRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(tickRing);
    };
    requestAnimationFrame(tickRing);

    const hoverTargets = "a, button, .project-card, .review-card, .logo-slot";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverTargets)) cursorRing.classList.add("is-active");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverTargets)) cursorRing.classList.remove("is-active");
    });
  }

  /* ============================================================
     NAV — scroll state, active link, mobile toggle
  ============================================================ */
  const nav = document.getElementById("nav");
  const onScrollNav = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScrollNav();
  window.addEventListener("scroll", onScrollNav, { passive: true });

  const navToggle = document.getElementById("navToggle");
  const navMobile = document.getElementById("navMobile");
  navToggle.addEventListener("click", () => {
    const open = navToggle.classList.toggle("is-open");
    navMobile.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll("[data-nav-mobile]").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("is-open");
      navMobile.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  const navLinks = document.querySelectorAll("[data-nav]");
  const sections = ["top", "projects", "reviews", "learning"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const setActiveNav = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    });
  };

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveNav(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => navObserver.observe(s));

  /* ============================================================
     SCROLL REVEAL
  ============================================================ */
  const revealTargets = document.querySelectorAll("[data-reveal], [data-reveal-text], [data-reveal-group]");

  document.querySelectorAll("[data-reveal-group] > *").forEach((el, i) => {
    el.style.setProperty("--i", i % 12);
  });

  if (reduceMotion) {
    revealTargets.forEach((el) => el.classList.add("in-view"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
  }

  /* ============================================================
     HERO CARD — mouse tilt (desktop only)
  ============================================================ */
  const heroCard = document.getElementById("heroCard");
  if (heroCard && canHover && !reduceMotion) {
    const heroVisual = document.querySelector(".hero-visual");
    heroVisual.addEventListener("mousemove", (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      heroCard.style.transform = `rotate(5deg) rotateX(${py * -14}deg) rotateY(${px * 14}deg) translateY(-4px)`;
    });
    heroVisual.addEventListener("mouseleave", () => {
      heroCard.style.transform = "";
    });
  }

  /* ============================================================
     PROJECT FILTER TABS
  ============================================================ */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const filterIndicator = document.getElementById("filterIndicator");
  const projectCards = document.querySelectorAll(".project-card");

  const moveIndicator = (btn) => {
    filterIndicator.style.width = `${btn.offsetWidth}px`;
    filterIndicator.style.transform = `translateX(${btn.offsetLeft - 6}px)`;
  };

  const applyFilter = (value) => {
    projectCards.forEach((card) => {
      const match = value === "all"
        ? card.dataset.featured === "true"
        : card.dataset.category === value;
      card.classList.toggle("is-hidden", !match);
    });
  };

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
      moveIndicator(btn);
      applyFilter(btn.dataset.filter);
    });
  });

  applyFilter("all");

  const initIndicator = () => {
    const active = document.querySelector(".filter-btn.is-active");
    if (active) moveIndicator(active);
  };
  window.addEventListener("load", initIndicator);
  window.addEventListener("resize", initIndicator);

  /* ============================================================
     TESTIMONIALS — continuous auto-scrolling marquee
     Loops seamlessly, pauses on hover, supports manual drag,
     resumes automatically after interaction.
  ============================================================ */
  const trackWrap = document.querySelector(".reviews-track-wrap");
  const track = document.getElementById("reviewsTrack");
  const progressBar = document.getElementById("reviewsProgressBar");

  if (trackWrap && track) {
    // Duplicate the card set once so the loop can wrap with no visible seam.
    const originalCards = Array.from(track.children);
    originalCards.forEach((card) => {
      track.appendChild(card.cloneNode(true));
    });

    const SPEED = 42; // px per second — steady, unhurried drift
    let setWidth = 0;
    let posX = 0;
    let lastTs = null;
    let isPaused = false;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartPos = 0;
    let resumeTimer = null;

    const measure = () => {
      // Width of one full (non-duplicated) set, gap included.
      setWidth = track.scrollWidth / 2;
    };
    measure();
    window.addEventListener("resize", () => {
      const ratio = setWidth ? posX / setWidth : 0;
      measure();
      posX = ratio * setWidth;
    });

    const wrap = () => {
      if (setWidth <= 0) return;
      while (posX <= -setWidth) posX += setWidth;
      while (posX > 0) posX -= setWidth;
    };

    const render = () => {
      track.style.transform = `translate3d(${posX}px,0,0)`;
      if (progressBar && setWidth > 0) {
        const ratio = -posX / setWidth; // 0 -> 1 across one loop
        progressBar.style.transform = `translateX(${ratio * (100 / 30 - 1) * 100}%)`;
      }
    };

    const tick = (ts) => {
      if (lastTs === null) lastTs = ts;
      const dt = ts - lastTs;
      lastTs = ts;

      if (!isPaused && !isDragging && !reduceMotion) {
        posX -= (SPEED * dt) / 1000;
        wrap();
      }
      render();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const pauseAwhile = () => {
      isPaused = true;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { isPaused = false; }, 1800);
    };

    // Hover pause (desktop)
    trackWrap.addEventListener("mouseenter", () => { isPaused = true; });
    trackWrap.addEventListener("mouseleave", () => {
      if (!isDragging) isPaused = false;
    });

    // Drag / swipe (mouse + touch via Pointer Events)
    trackWrap.addEventListener("pointerdown", (e) => {
      isDragging = true;
      isPaused = true;
      trackWrap.classList.add("is-dragging");
      dragStartX = e.clientX;
      dragStartPos = posX;
      trackWrap.setPointerCapture(e.pointerId);
    });
    trackWrap.addEventListener("pointermove", (e) => {
      if (!isDragging) return;
      posX = dragStartPos + (e.clientX - dragStartX);
      wrap();
    });
    const endDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      trackWrap.classList.remove("is-dragging");
      pauseAwhile();
    };
    trackWrap.addEventListener("pointerup", endDrag);
    trackWrap.addEventListener("pointercancel", endDrag);
  }

  /* ============================================================
     CERTIFICATE CAROUSEL
  ============================================================ */
  const certSlidesWrap = document.getElementById("certSlides");
  const certSlides = certSlidesWrap ? Array.from(certSlidesWrap.children) : [];
  const certDotsWrap = document.getElementById("certDots");
  const certPrev = document.getElementById("certPrev");
  const certNext = document.getElementById("certNext");
  let certIndex = 0;
  let certAutoplay = null;

  if (certSlidesWrap && certSlides.length) {
    certSlides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", `Go to certificate ${i + 1}`);
      if (i === 0) dot.classList.add("is-active");
      dot.addEventListener("click", () => goToCert(i));
      certDotsWrap.appendChild(dot);
    });

    function goToCert(i) {
      certIndex = (i + certSlides.length) % certSlides.length;
      certSlidesWrap.style.transform = `translateX(-${certIndex * 100}%)`;
      Array.from(certDotsWrap.children).forEach((d, idx) => {
        d.classList.toggle("is-active", idx === certIndex);
      });
    }

    certPrev.addEventListener("click", () => { goToCert(certIndex - 1); restartAutoplay(); });
    certNext.addEventListener("click", () => { goToCert(certIndex + 1); restartAutoplay(); });

    function startAutoplay() {
      if (reduceMotion || certSlides.length < 2) return;
      certAutoplay = setInterval(() => goToCert(certIndex + 1), 10000);
    }
    function restartAutoplay() {
      clearInterval(certAutoplay);
      startAutoplay();
    }
    startAutoplay();

    const carousel = document.querySelector(".cert-carousel");
    carousel.addEventListener("mouseenter", () => clearInterval(certAutoplay));
    carousel.addEventListener("mouseleave", startAutoplay);
  }

  const certLightbox = document.getElementById("certLightbox");
  const certLightboxImg = document.getElementById("certLightboxImg");
  const certLightboxClose = document.getElementById("certLightboxClose");

  document.querySelectorAll(".cert-card").forEach((card) => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      if (!img) return; // no image dropped in yet
      certLightboxImg.src = img.src;
      certLightboxImg.alt = img.alt;
      certLightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    });
  });

  const closeCertLightbox = () => {
    certLightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  };
  certLightboxClose.addEventListener("click", closeCertLightbox);
  certLightbox.addEventListener("click", (e) => {
    if (e.target === certLightbox) closeCertLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCertLightbox();
  });

  /* ============================================================
     SMOOTH ANCHOR SCROLL for buttons without native href handling issues
  ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      }
    });
  });
})();
