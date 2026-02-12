//Animation for skill bars they appear
const skillBars = document.querySelectorAll('.skill-progress');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width || entry.target.dataset.width || '100%';
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
        }
    });
}, {threshold: 0.5});

skillBars.forEach(bar => {
    observer.observe(bar);
});

//Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
         });
    });
});


document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.querySelector('#name').value;
      const email = document.querySelector('#email').value;
      const subject = document.querySelector('#subject').value;
      const message = document.querySelector('#message').value;

      try {
        const response = await fetch('http://localhost:5000/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject, message }),
        });

        const data = await response.json();

     if (response.ok) {
    showToast(data.message, 'success');
    form.reset();
  } else {
    showToast('Failed to send message: ' + (data.error || data.message), 'error');
  }
} catch (error) {
  showToast('Something went wrong: ' + error.message, 'error');
}


    });
  }
});

function showToast(message, type = 'success') {
  const container = document.querySelector('.toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.classList.add('toast', type);
  toast.textContent = message;

  container.appendChild(toast);

  // Remove toast after animation finishes
toast.addEventListener('animationend', (event) => {
  if (event.animationName === 'fadeOut') {
    toast.remove();
  }
});
}

// About page hero video -> image transition
document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".about-hero-video");
  const image = document.querySelector(".about-hero-image");
  const text = document.querySelector(".about-hero-text");

  if (!video || !image || !text) return;

  video.style.opacity = "1";
  image.style.opacity = "0";
  text.style.opacity = "0";

  let fadeStarted = false;
  const fadeOffset = 0.75; // seconds before end

  video.addEventListener("timeupdate", () => {
    if (
      !fadeStarted &&
      video.duration &&
      video.currentTime >= video.duration - fadeOffset
    ) {
      fadeStarted = true;

      // Fade video out
      video.style.opacity = "0";

      // Fade image + text in together
      setTimeout(() => {
        image.style.opacity = "1";
        text.style.opacity = "1";
      }, fadeOffset * 50 + 500);

      // Start cinematic image zoom
armyImage.style.animation = "cinematicZoom 28s ease-out forwards";

// Start slow textbox glide (slight delay)
setTimeout(() => {
  armyText.style.animation = "cinematicSlide 24s ease-out forwards";
}, 1200);

    }
  });
});

// Timeline scroll reveal
document.addEventListener("DOMContentLoaded", () => {
  const timelineItems = document.querySelectorAll(".timeline-event");

  if (!timelineItems.length) return;

 const timelineObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0,
    rootMargin: "0px 0px -30% 0px"
  }
);

  timelineItems.forEach(item => {
    timelineObserver.observe(item);
  });
});

/* =========================
   HERO VIDEO → IMAGE FADE
   (RUNNING SECTION)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".about-hero-video");
  const image = document.querySelector(".about-hero-image");
  const text  = document.querySelector(".about-hero-text");

  if (!video || !image || !text) return;

  video.style.opacity = "1";
  image.style.opacity = "0";
  text.style.opacity  = "0";

  const fadeOffset = 0.8; // seconds before end
  let faded = false;

  video.addEventListener("timeupdate", () => {
    if (
      !faded &&
      video.duration &&
      video.currentTime >= video.duration - fadeOffset
    ) {
      faded = true;

      video.style.opacity = "0";

      setTimeout(() => {
        image.style.opacity = "1";
        text.style.opacity  = "1";
      }, fadeOffset * 1000);
    }
  });
});


/* =========================
   TIMELINE SCROLL REVEAL
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".timeline-event");
  if (!items.length) return;

  const observer = new IntersectionObserver(
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

  items.forEach(item => observer.observe(item));
});


/* =========================
   ARMY VIDEO (SCROLL-TRIGGERED)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const armySection = document.querySelector(".army-hero");
  const video = armySection?.querySelector(".army-hero-video");
  const image = armySection?.querySelector(".army-hero-image");
  const text = armySection?.querySelector(".army-hero-text");

  if (!armySection || !video || !image || !text) return;

  let hasPlayed = false;
  const fadeOffset = 0.8; // seconds before end

  // Initial states
  video.style.opacity = "0";
  image.style.opacity = "0";
  text.style.opacity = "0";

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || hasPlayed) return;

        hasPlayed = true;

        // Show & play video
        video.style.opacity = "1";
        video.currentTime = 0;

        const playPromise = video.play();
        if (playPromise) {
          playPromise.catch(err =>
            console.warn("Army video autoplay blocked:", err)
          );
        }

        let fadeStarted = false;

        video.addEventListener("timeupdate", () => {
          if (
            !fadeStarted &&
            video.duration &&
            video.currentTime >= video.duration - fadeOffset
          ) {
            fadeStarted = true;

            // Crossfade
            video.style.opacity = "0";

            setTimeout(() => {
              image.style.opacity = "1";
              text.style.opacity = "1";
            }, 400);
          }
        });
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(armySection);
});

// =========================
// CERTIFICATE SLIDER
// =========================

const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

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


// =========================
// SWIPE SUPPORT
// =========================

const slider = document.querySelector(".slides");

let startX = 0;
let endX = 0;

slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

slider.addEventListener("touchmove", (e) => {
  endX = e.touches[0].clientX;
});

slider.addEventListener("touchend", () => {
  handleSwipe();
});

function handleSwipe() {
  const threshold = 50; // minimum swipe distance
  const diff = startX - endX;

  if (diff > threshold) {
    // Swipe left
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  } else if (diff < -threshold) {
    // Swipe right
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }
}

//fullscreen certif.
document.addEventListener("DOMContentLoaded", function () {

  const slides = document.querySelectorAll(".slide");
  const modal = document.getElementById("fullscreenModal");
  const modalImg = document.getElementById("fullscreenImg");
  const closeModal = document.querySelector(".close-modal");

  slides.forEach(slide => {
    slide.addEventListener("click", function () {
      modal.classList.add("active");
      modalImg.src = this.src;
    });
  });

  closeModal.addEventListener("click", function () {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

});

document.addEventListener("DOMContentLoaded", function () {
  const bars = document.querySelectorAll(".skill-progress");

  bars.forEach((bar, index) => {
    const width = bar.getAttribute("data-width");

    setTimeout(() => {
      bar.style.width = width;
    }, 300 + index * 200);
  });
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
