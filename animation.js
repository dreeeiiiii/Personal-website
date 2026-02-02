// =======================
// GSAP SETUP
// =======================
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

  /* ======================================================
     ELEMENTS
  ====================================================== */
  const follower = document.querySelector(".mouse-follower");

  const customCursor = document.querySelector(".custom-cursor");
  const cursorCircle = document.querySelector(".cursor-circle");
  const cursorImage = document.querySelector(".cursor-image");
  const cursorImgTag = cursorImage?.querySelector("img");

  const nav = document.querySelector("nav");
  document.getElementById("contactBtn").addEventListener("click", () => {
    document.querySelector("#contact")?.scrollIntoView({
      behavior: "smooth"
    });
  });
  

  /* ======================================================
     MOUSE MOVE (SINGLE SOURCE OF TRUTH)
  ====================================================== */
  document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // mouse follower
    if (follower) {
      follower.style.left = `${x + 25}px`;
      follower.style.top = `${y + 15}px`;
    }

    // custom cursor
    if (cursorCircle && cursorImage) {
      cursorCircle.style.left = `${x}px`;
      cursorCircle.style.top = `${y}px`;
      cursorImage.style.left = `${x}px`;
      cursorImage.style.top = `${y}px`;
    }
  });

  /* ======================================================
     CUSTOM CURSOR (IMAGE OPT-IN)
  ====================================================== */
  if (cursorCircle && cursorImage && cursorImgTag) {

    const showImageCursor = (src) => {
      cursorImgTag.src = src;

      cursorCircle.style.width = "60px";
      cursorCircle.style.height = "60px";
      cursorCircle.style.borderColor = "transparent";
      cursorCircle.style.background = "rgba(255,255,255,0.1)";

      cursorImage.style.opacity = "1";
      cursorImage.style.transform = "translate(-50%, -50%) scale(1)";
    };

    const hideImageCursor = () => {
      cursorCircle.style.width = "20px";
      cursorCircle.style.height = "20px";
      cursorCircle.style.borderColor = "white";
      cursorCircle.style.background = "transparent";

      cursorImage.style.opacity = "0";
      cursorImage.style.transform = "translate(-50%, -50%) scale(0)";
    };

    document.querySelectorAll("[data-cursor-image]").forEach(el => {
      el.addEventListener("mouseenter", () => {
        const src = el.dataset.cursorImage;
        if (src) showImageCursor(src);
      });

      el.addEventListener("mouseleave", hideImageCursor);
    });

    // force-disable cursor image on nav
    if (nav) {
      nav.addEventListener("mouseenter", hideImageCursor);
    }
  }

  /* ======================================================
     NAV SCROLL LOGIC
  ====================================================== */
  if (nav) {
    const updateNav = () => {
      nav.classList.toggle("available-mode", window.scrollY > 60);
    };

    updateNav();
    window.addEventListener("scroll", updateNav);
  }

  /* ======================================================
     GSAP SCROLL ANIMATIONS
  ====================================================== */

  gsap.utils.toArray(
    ".label-container, .drop-list-container, .about-first-labels"
  ).forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "top 50%",
        scrub: 1
      },
      opacity: 0,
      y: 50
    });
  });

  gsap.from(".drop-list-container details", {
    scrollTrigger: {
      trigger: ".drop-list-container",
      start: "top 80%",
      end: "top 40%",
      scrub: 1
    },
    opacity: 0,
    x: -30,
    stagger: 0.1
  });

  gsap.to(".label-left", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1
    },
    y: -100,
    opacity: 0.5
  });

  gsap.to(".label-right", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1
    },
    y: -80,
    opacity: 0.5
  });

  gsap.utils.toArray(".projects-grid .project-card").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: ".projects",
        start: "top 90%",
        end: "bottom 50%",
        scrub: 1
      },
      opacity: 0,
      y: 60,
      delay: i * 0.15
    });
  });

  gsap.utils.toArray(".testimonials-grid .testimonial-card").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: ".testimonials",
        start: "top 90%",
        end: "bottom 50%",
        scrub: 1
      },
      opacity: 0,
      y: 50,
      delay: i * 0.15
    });
  });

  gsap.from(".contact .section-header", {
    scrollTrigger: {
      trigger: ".contact",
      start: "top 85%",
      end: "top 50%",
      scrub: 1
    },
    opacity: 0,
    y: 40
  });

  gsap.from(".contact-form", {
    scrollTrigger: {
      trigger: ".contact",
      start: "top 80%",
      end: "top 50%",
      scrub: 1
    },
    opacity: 0,
    y: 50
  });

  gsap.from(".contact-info", {
    scrollTrigger: {
      trigger: ".contact",
      start: "top 75%",
      end: "top 50%",
      scrub: 1
    },
    opacity: 0,
    y: 40
  });

  gsap.from(".site-footer .footer-logo", {
    scrollTrigger: {
      trigger: ".site-footer",
      start: "top 90%",
      end: "top 70%",
      scrub: 1
    },
    opacity: 0,
    y: 40
  });

  gsap.from(".site-footer .footer-links, .site-footer .footer-social", {
    scrollTrigger: {
      trigger: ".site-footer",
      start: "top 85%",
      end: "top 70%",
      scrub: 1
    },
    opacity: 0,
    y: 30,
    stagger: 0.15
  });

  gsap.from(".site-footer .footer-legal", {
    scrollTrigger: {
      trigger: ".site-footer",
      start: "top 80%",
      end: "top 70%",
      scrub: 1
    },
    opacity: 0,
    y: 20
  });

});
