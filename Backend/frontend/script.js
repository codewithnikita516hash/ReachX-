function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  const hamburgerBtn = document.getElementById("hamburgerBtn");

  if (navLinks && hamburgerBtn) {
    navLinks.classList.toggle("active");
    hamburgerBtn.classList.toggle("active");

    // Change icon
    hamburgerBtn.textContent = navLinks.classList.contains("active") ? "✖" : "☰";
  } else {
    console.warn("Navbar elements not found.");
  }
}

const dropdown = document.querySelector(".dropdown");

if (dropdown) {
  dropdown.addEventListener("click", function (e) {
    e.stopPropagation();
    dropdown.classList.toggle("active");
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // ===== Service Slider =====
  const slider = document.getElementById("serviceSlider");
  const leftBtn = document.getElementById("leftBtn");
  const rightBtn = document.getElementById("rightBtn");

  if (slider && leftBtn && rightBtn) {
    rightBtn.addEventListener("click", () => slider.scrollBy({ left: 300, behavior: "smooth" }));
    leftBtn.addEventListener("click", () => slider.scrollBy({ left: -300, behavior: "smooth" }));
  }

  // ===== Contact Form Submission =====
    const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("note").value;
    const submitBtn = document.getElementById("submitBtn");

    submitBtn.innerText = "Submitting...";
    submitBtn.disabled = true;

    try {
      const response = await fetch("https://reachx-backend.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, phone, message })
      });

      const result = await response.json();

      if (response.ok) {
        showPopup("✅ Submitted successfully!", true);
      } else {
        showPopup("❌ " + (result.error || "Something went wrong!"), false);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showPopup("❌ Error submitting the form. Please check your connection.", false);
    } finally {
      submitBtn.innerText = "Submit";
      submitBtn.disabled = false;
    }
  });
}

// ===== Show Popup =====
function showPopup(message, resetForm) {
  const popupMessage = document.getElementById("popupMessage");
  const popup = document.getElementById("popup");

  if (popupMessage && popup) {
    popupMessage.innerText = message;
    popup.style.display = "block";

    if (resetForm === true) {
      setTimeout(() => {
        closePopup();
        contactForm.reset();
      }, 2000);
    }

    setTimeout(() => {
      closePopup();
    }, 3000);
  } else {
    console.warn("Popup elements not found.");
  }
}

// ===== Close Popup =====
function closePopup() {
  const popup = document.getElementById("popup");
  if (popup) {
    popup.style.display = "none";
  }
}
  // ===== Hero Section Fade-in =====
 const canvas = document.getElementById('bg');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const hero = document.querySelector('.hero');

  function resizeCanvas() {
    canvas.width = hero.clientWidth;
    canvas.height = hero.clientHeight;
  }

  resizeCanvas();

  const particleCount = 400;
  const maxDepth = 800;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: (Math.random() - 0.5) * canvas.width,
      y: (Math.random() - 0.5) * canvas.height,
      z: Math.random() * maxDepth
    });
  }

  let mouse = { x: 0, y: 0 };
  let isMoving = false;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) / canvas.width - 0.5;
    mouse.y = (e.clientY - rect.top) / canvas.height - 0.5;
    isMoving = true;
    clearTimeout(window.mouseTimeout);
    window.mouseTimeout = setTimeout(() => isMoving = false, 200);
  });

  window.addEventListener('resize', () => {
    resizeCanvas();
  });

  function draw() {
    ctx.fillStyle = 'rgba(14,14,14,0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let p of particles) {
      p.z -= 2;
      if (p.z < 1) {
        p.x = (Math.random() - 0.5) * canvas.width;
        p.y = (Math.random() - 0.5) * canvas.height;
        p.z = maxDepth;
      }

      const scale = 500 / p.z;
      const x2d = canvas.width / 2 + (p.x + mouse.x * 100) * scale;
      const y2d = canvas.height / 2 + (p.y + mouse.y * 100) * scale;
      const size = scale * 0.8;
      const alpha = Math.min(1, scale);

      const color = isMoving ? 'cyan' : 'white';

      ctx.beginPath();
      ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }

    requestAnimationFrame(draw);
  }

  draw();
}

  // ===== Scroll Animation for Fade-ins =====
  const faders = document.querySelectorAll(".fade-in");
  const appearOptions = { threshold: 0 };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("appear");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => appearOnScroll.observe(fader));

  // ===== Swiper Sliders =====
  if (typeof Swiper !== "undefined" && document.querySelector(".mySwiper")) {
    new Swiper(".mySwiper", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 10,
      autoplay: { delay: 2000, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      breakpoints: {
        600: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1400: { slidesPerView: 5 },
      },
    });
  }

  const swiper4 = new Swiper(".swiper4", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper4-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper4-button-next",
      prevEl: ".swiper4-button-prev",
    },
    breakpoints: {
      1024: { slidesPerView: 3 },
      768: { slidesPerView: 2 },
      0: { slidesPerView: 1 }
    }
  });

  var swiper1 = new Swiper(".swiper1", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    coverflowEffect: {
      rotate: 20,
      stretch: 0,
      depth: 150,
      modifier: 1,
      slideShadows: false,
    },
    navigation: {
      nextEl: ".swiper1-button-next",
      prevEl: ".swiper1-button-prev",
    },
  });

  // ===== Business Section Animation =====
  const businessSection = document.querySelector(".business-section");
  const businessObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        businessSection.classList.add("show");
      } else {
        businessSection.classList.remove("show");
      }
    });
  }, { threshold: 0.3 });

  if (businessSection) {
    businessObserver.observe(businessSection);
  }

  // ===== Reviews Swiper =====
  var reviewSwiper = new Swiper(".reviewSwiper", {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".review-button-next",
    prevEl: ".review-button-prev",
  },
  pagination: {
    el: ".review-pagination",
    clickable: true,
  },
  breakpoints: {
    1024: { slidesPerView: 3 },
    768: { slidesPerView: 2 },
    0: { slidesPerView: 1 }
  },
});

  // ===== About Section Animation =====
  const successObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('animate');
        void entry.target.offsetWidth;
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.success-box').forEach(box => {
    successObserver.observe(box);
  });

  // ===== Service Page Animation with GSAP =====
  gsap.utils.toArray(".service").forEach((service) => {
    gsap.fromTo(
      service,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: service,
          start: "top 85%",
          end: "bottom 60%",
          toggleActions: "play reverse play reverse",
          scrub: true,
        },
      }
    );
  });

  // ===== Work Process Animation =====
  const steps = document.querySelectorAll('.process-step');

  const processObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate');
          setTimeout(() => {
            entry.target.classList.add('floating');
          }, 700);
        }, index * 150);
      }
    });
  }, { threshold: 0.3 });

  steps.forEach(step => processObserver.observe(step));
});
