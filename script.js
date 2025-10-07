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