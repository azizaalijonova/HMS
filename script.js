document.addEventListener("DOMContentLoaded", function () {
  const services = [
    { name: "NEUROSCIENCES", image: "../images/services.svg" },
    { name: "CARDIOLOGY", image: "../images/services.svg" },
    { name: "ORTHOPEDICS", image: "../images/services.svg" },
    // { name: "DERMATOLOGY", image: "../images/services.svg" },
    // { name: "PEDIATRICS", image: "../images/services.svg" },
    // { name: "GYNECOLOGY", image: "../images/services.svg" },
    // { name: "UROLOGY", image: "../images/services.svg" },
    // { name: "DENTISTRY", image: "../images/services.svg" },
    // { name: "GASTROENTEROLOGY", image: "../images/services.svg" },
  ];

  const swiperWrapper = document.querySelector(".swiper-wrapper");

  // Dynamically create slides
  services.forEach((service) => {
    let slide = document.createElement("div");
    slide.classList.add("swiper-slide");
    slide.innerHTML = `
            <div class="service-card">
                <img src="${service.image}" alt="${service.name}">
                <p>${service.name}</p>
            </div>
        `;
    swiperWrapper.appendChild(slide);
  });

  // Initialize Swiper
  new Swiper(".mySwiper", {
    slidesPerView: 1, // Default for mobile
    spaceBetween: 20,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2, // Tablets
      },
      1024: {
        slidesPerView: 3, // Desktops
      },
    },
  });
});
