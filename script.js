const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

const mediaFrames = document.querySelectorAll("[data-media-frame]");

mediaFrames.forEach((frame) => {
  const image = frame.querySelector("img");

  if (!image) {
    return;
  }

  const markReady = () => {
    if (image.naturalWidth > 0) {
      frame.classList.remove("is-empty");
      frame.classList.add("is-ready");
    }
  };

  const markFallback = () => {
    frame.classList.add("is-empty");
    frame.classList.remove("is-ready");
  };

  if (image.complete) {
    markReady();

    if (image.naturalWidth === 0) {
      markFallback();
    }
  }

  image.addEventListener("load", markReady);
  image.addEventListener("error", markFallback);
});

const revealElements = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -48px 0px",
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

// Sticky mobile CTA — reveal once the hero has scrolled mostly out of view
const stickyCta = document.querySelector("[data-sticky-cta]");

if (stickyCta) {
  const hero = document.querySelector(".hero");

  const toggleSticky = () => {
    const threshold = hero ? hero.offsetHeight * 0.6 : 520;
    const show = window.scrollY > threshold;
    stickyCta.classList.toggle("is-visible", show);
    stickyCta.setAttribute("aria-hidden", show ? "false" : "true");
  };

  toggleSticky();
  window.addEventListener("scroll", toggleSticky, { passive: true });
  window.addEventListener("resize", toggleSticky, { passive: true });
}
