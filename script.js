// Fade-in på scroll med Intersection Observer
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".fade-section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => observer.observe(section));
});

// ===== STAR WARS SCROLL EFFECT =====

const scrollSection = document.querySelector(".scroll-section");
const crawl = document.querySelector(".crawl");

window.addEventListener("scroll", () => {
  const sectionTop = scrollSection.offsetTop;
  const sectionHeight = scrollSection.offsetHeight;
  const scrollY = window.scrollY;

  if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
    const progress = (scrollY - sectionTop) / sectionHeight;
    const translateY = progress * -200; 
    const translateZ = progress * -800;

    crawl.style.transform = `
      rotateX(25deg)
      translateY(${translateY}px)
      translateZ(${translateZ}px)
    `;
  }
});

const firstEra = document.querySelector(".era-1");

window.addEventListener("scroll", () => {
  const sectionTop = scrollSection.offsetTop;
  const sectionHeight = scrollSection.offsetHeight;
  const scrollY = window.scrollY;

  if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
    const progress = (scrollY - sectionTop) / sectionHeight;
    const translateY = progress * -300;
    const translateZ = progress * -1000;

    crawl.style.transform = `
      rotateX(25deg)
      translateY(${translateY}px)
      translateZ(${translateZ}px)
    `;

    // Fade ut mot slutet
    crawl.style.opacity = 1 - progress * 1.5;
  }

  // När första eran börjar → döda crawlen helt
  if (scrollY >= firstEra.offsetTop - window.innerHeight / 2) {
    crawl.style.opacity = 0;
  }
});

// ===== ERA STYLE SWITCH =====

const eras = document.querySelectorAll(".era");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.body.className = "";

        if (entry.target.classList.contains("era-1")) {
          document.body.classList.add("modernism");
        }

        if (entry.target.classList.contains("era-2")) {
          document.body.classList.add("postmodernism");
        }

        if (entry.target.classList.contains("era-3")) {
          document.body.classList.add("digital");
        }
      }
    });
  },
  { threshold: 0.6 }
);

eras.forEach((era) => observer.observe(era));
