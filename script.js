document.addEventListener("DOMContentLoaded", function () {
  // Initialize the swiper
  const swiperContainer = document.querySelector(".swiper-container");
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  const slides = document.querySelectorAll(".swiper-slide");
  const pagination = document.querySelector(".swiper-pagination");

  let currentIndex = 0;
  let startX, moveX;
  let slideWidth;
  let slidesPerView = getSlidesPerView();

  // Create pagination bullets
  function createPagination() {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(slides.length / slidesPerView);

    for (let i = 0; i < totalPages; i++) {
      const bullet = document.createElement("div");
      bullet.classList.add("swiper-pagination-bullet");
      if (i === currentIndex) {
        bullet.classList.add("swiper-pagination-bullet-active");
      }

      bullet.addEventListener("click", () => {
        goToSlide(i);
      });

      pagination.appendChild(bullet);
    }
  }

  // Get number of slides per view based on screen width
  function getSlidesPerView() {
    if (window.innerWidth >= 992) {
      return 3; // Desktop
    } else if (window.innerWidth >= 768) {
      return 2; // Tablet
    } else {
      return 1; // Mobile
    }
  }

  // Calculate slide width
  function calculateSlideWidth() {
    slideWidth = swiperContainer.offsetWidth / slidesPerView;
    slides.forEach((slide) => {
      slide.style.width = `${slideWidth}px`;
    });
  }

  // Update swiper position
  function updateSwiperPosition() {
    const maxIndex = Math.max(0, slides.length - slidesPerView);
    currentIndex = Math.min(currentIndex, maxIndex);

    const translateX = -currentIndex * slideWidth;
    swiperWrapper.style.transform = `translateX(${translateX}px)`;

    // Update pagination
    const bullets = document.querySelectorAll(".swiper-pagination-bullet");
    bullets.forEach((bullet, index) => {
      if (index === Math.floor(currentIndex / slidesPerView)) {
        bullet.classList.add("swiper-pagination-bullet-active");
      } else {
        bullet.classList.remove("swiper-pagination-bullet-active");
      }
    });
  }

  // Go to specific slide
  function goToSlide(index) {
    currentIndex = index * slidesPerView;
    updateSwiperPosition();
  }

  // Next slide
  function nextSlide() {
    if (currentIndex < slides.length - slidesPerView) {
      currentIndex++;
      updateSwiperPosition();
    }
  }

  // Previous slide
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSwiperPosition();
    }
  }

  // Touch events for mobile swiping
  swiperContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  swiperContainer.addEventListener("touchmove", (e) => {
    moveX = e.touches[0].clientX;
  });

  swiperContainer.addEventListener("touchend", () => {
    if (startX - moveX > 50) {
      nextSlide();
    } else if (moveX - startX > 50) {
      prevSlide();
    }
  });

  // Auto slide every 5 seconds
  let autoSlideInterval = setInterval(nextSlide, 5000);

  // Pause auto slide on hover
  swiperContainer.addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval);
  });

  swiperContainer.addEventListener("mouseleave", () => {
    autoSlideInterval = setInterval(nextSlide, 5000);
  });

  // Initialize swiper
  function initSwiper() {
    slidesPerView = getSlidesPerView();
    calculateSlideWidth();
    createPagination();
    updateSwiperPosition();
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    const newSlidesPerView = getSlidesPerView();
    if (newSlidesPerView !== slidesPerView) {
      initSwiper();
    } else {
      calculateSlideWidth();
      updateSwiperPosition();
    }
  });

  // Initialize on load
  initSwiper();
});
