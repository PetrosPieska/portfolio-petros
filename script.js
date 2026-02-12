document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     SKILL BARS (Intersection)
  ========================= */
  const skillBars = document.querySelectorAll(".skill-progress");

  if (skillBars.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.dataset.width || "100%";
          entry.target.style.width = "0";
          setTimeout(() => {
            entry.target.style.width = width;
          }, 100);
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
  }

  /* =========================
     SMOOTH SCROLL
  ========================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* =========================
     CONTACT FORM
  ========================= */
  const form = document.querySelector(".contact-form");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.querySelector("#name")?.value;
      const email = document.querySelector("#email")?.value;
      const subject = document.querySelector("#subject")?.value;
      const message = document.querySelector("#message")?.value;

      try {
        const response = await fetch("http://localhost:5000/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, subject, message }),
        });

        const data = await response.json();

        if (response.ok) {
          showToast(data.message, "success");
          form.reset();
        } else {
          showToast("Failed: " + (data.error || data.message), "error");
        }

      } catch (error) {
        showToast("Error: " + error.message, "error");
      }
    });
  }

  function showToast(message, type = "success") {
    const container = document.querySelector(".toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.classList.add("toast", type);
    toast.textContent = message;

    container.appendChild(toast);

    toast.addEventListener("animationend", (event) => {
      if (event.animationName === "fadeOut") {
        toast.remove();
      }
    });
  }

  /* =========================
     ABOUT HERO VIDEO → IMAGE
  ========================= */
  const aboutVideo = document.querySelector(".about-hero-video");
  const aboutImage = document.querySelector(".about-hero-image");
  const aboutText  = document.querySelector(".about-hero-text");

  if (aboutVideo && aboutImage && aboutText) {

    aboutVideo.style.opacity = "1";
    aboutImage.style.opacity = "0";
    aboutText.style.opacity  = "0";

    const fadeOffset = 0.8;
    let faded = false;

    aboutVideo.addEventListener("timeupdate", () => {
      if (
        !faded &&
        aboutVideo.duration &&
        aboutVideo.currentTime >= aboutVideo.duration - fadeOffset
      ) {
        faded = true;

        aboutVideo.style.opacity = "0";

        setTimeout(() => {
          aboutImage.style.opacity = "1";
          aboutText.style.opacity  = "1";
        }, fadeOffset * 1000);
      }
    });
  }

  /* =========================
     TIMELINE SCROLL REVEAL
  ========================= */
  const timelineItems = document.querySelectorAll(".timeline-event");

  if (timelineItems.length) {
    const timelineObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -30% 0px"
      }
    );

    timelineItems.forEach(item => timelineObserver.observe(item));
  }

  /* =========================
     ARMY VIDEO (Scroll Trigger)
  ========================= */
  const armySection = document.querySelector(".army-hero");
  const armyVideo   = armySection?.querySelector(".army-hero-video");
  const armyImage   = armySection?.querySelector(".army-hero-image");
  const armyText    = armySection?.querySelector(".army-hero-text");

  if (armySection && armyVideo && armyImage && armyText) {

    armyVideo.style.opacity = "0";
    armyImage.style.opacity = "0";
    armyText.style.opacity  = "0";

    let hasPlayed = false;
    const fadeOffset = 0.8;

    const armyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || hasPlayed) return;

        hasPlayed = true;

        armyVideo.style.opacity = "1";
        armyVideo.currentTime = 0;

        armyVideo.play().catch(err =>
          console.warn("Army autoplay blocked:", err)
        );

        let faded = false;

        armyVideo.addEventListener("timeupdate", () => {
          if (
            !faded &&
            armyVideo.duration &&
            armyVideo.currentTime >= armyVideo.duration - fadeOffset
          ) {
            faded = true;

            armyVideo.style.opacity = "0";

            setTimeout(() => {
              armyImage.style.opacity = "1";
              armyText.style.opacity  = "1";
            }, 400);
          }
        });
      });
    }, { threshold: 0.4 });

    armyObserver.observe(armySection);
  }

  /* =========================
     CERTIFICATE SLIDER
  ========================= */
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  if (slides.length && prevBtn && nextBtn) {

    let currentIndex = 0;

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove("active"));
      slides[index].classList.add("active");
    }

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    });

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    });

    /* Swipe Support */
    const slider = document.querySelector(".slides");

    if (slider) {
      let startX = 0;
      let endX = 0;

      slider.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
      });

      slider.addEventListener("touchend", (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        const threshold = 50;

        if (diff > threshold) {
          currentIndex = (currentIndex + 1) % slides.length;
          showSlide(currentIndex);
        } else if (diff < -threshold) {
          currentIndex = (currentIndex - 1 + slides.length) % slides.length;
          showSlide(currentIndex);
        }
      });
    }
  }

  /* =========================
     FULLSCREEN CERTIFICATE
  ========================= */
  const modal = document.getElementById("fullscreenModal");
  const modalImg = document.getElementById("fullscreenImg");
  const closeModal = document.querySelector(".close-modal");

  if (slides.length && modal && modalImg && closeModal) {
    slides.forEach(slide => {
      slide.addEventListener("click", function () {
        modal.classList.add("active");
        modalImg.src = this.src;
      });
    });

    closeModal.addEventListener("click", () => {
      modal.classList.remove("active");
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  }

  /* =========================
     HAMBURGER MENU
  ========================= */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

});
