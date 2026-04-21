document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".fade-section");
  const texts = document.querySelectorAll(".story-text");
  const scrollSection = document.querySelector(".story-container");
  const crawl = document.querySelector(".crawl");
  const firstEra = document.querySelector(".era-1");
  const eras = document.querySelectorAll(".era");

  // Fade-in för sektioner
  if (sections.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.2 });

    sections.forEach((section) => fadeObserver.observe(section));
  }

  // Fade på story-text
  function updateOpacity() {
    if (texts.length === 0) return;

    const center = window.innerHeight * 0.5;

    texts.forEach((text) => {
      const rect = text.getBoundingClientRect();
      const distance = Math.abs((rect.top + rect.height / 2) - center);

      const maxDistance = 320;
      let opacity = 1 - distance / maxDistance;

      if (distance < 35) opacity = 1;

      opacity = Math.max(opacity, 0.35);
      opacity = Math.min(opacity, 1);

      text.style.opacity = opacity;
    });
  }

  // Era-observer
  if (eras.length > 0) {
    const eraObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        eras.forEach((era) => era.classList.remove("active"));
        entry.target.classList.add("active");

        document.body.classList.remove(
          "industrialism",
          "modernism",
          "postmodernism",
          "digital"
        );

        if (entry.target.classList.contains("era-1")) {
          document.body.classList.add("industrialism");
        } else if (entry.target.classList.contains("era-2")) {
          document.body.classList.add("modernism");
        } else if (entry.target.classList.contains("era-3")) {
          document.body.classList.add("postmodernism");
        } else if (entry.target.classList.contains("era-4")) {
          document.body.classList.add("digital");
        }
      });
    }, { threshold: 0.6 });

    eras.forEach((era) => eraObserver.observe(era));
  }

  // Scroll-effekter
  window.addEventListener("scroll", () => {
    updateOpacity();

    if (!scrollSection || !crawl || !firstEra) return;

    const scrollY = window.scrollY;
    const sectionTop = scrollSection.offsetTop;
    const sectionHeight = scrollSection.offsetHeight;

    if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
      const progress = (scrollY - sectionTop) / sectionHeight;

      crawl.style.transform = `
        rotateX(25deg)
        translateY(${progress * -300}px)
        translateZ(${progress * -1000}px)
      `;

      crawl.style.opacity = Math.max(1 - progress * 1.5, 0);
    }

    if (scrollY >= firstEra.offsetTop - window.innerHeight / 2) {
      crawl.style.opacity = 0;
    }
  });

  // Kör en gång direkt om story-text finns
  updateOpacity();
});

// Hindra browsern från att minnas scroll-position
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
  document.body.classList.add("loaded");

  const intro = document.querySelector(".intro");

  if (intro) {
    intro.classList.add("animate");

    setTimeout(() => {
      intro.style.display = "none";
      document.body.classList.add("show-title");
    }, 1500);
  }
});