const track = document.querySelector(".track");
const slides = document.querySelectorAll(".slide");
const btnPrev = document.querySelector("#prev");
const btnNext = document.querySelector("#next");
const dotsContainer = document.querySelector("#dots");
const slideshow = document.querySelector("#slideshow");

let total = slides.length;
let autoPlayInterval;
let isUserInteracting = false;
//Slide hiện tại
let current = 0;
//Cập nhật slide
function updateSlide() {
  track.style.transform = `transLateX(-${current * 100}%)`;
}

// Tạo các chấm điều hướng
// function createDots() {
//   for (let i = 0; i < total; i++) {}
// }
//Nút Next
btnNext.addEventListener("click", () => {
  current = (current + 1) % total;
  updateSlide();
  resetAutoPlay();
});

//Nút Prev
btnPrev.addEventListener("click", () => {
  current = (current - 1 + total) % total;
  updateSlide();
  resetAutoPlay();
});

// Tạm dừng auto-play khi hover vào slideshow
slideshow.addEventListener("mouseenter", () => {
  isUserInteracting = true;
  stopAutoPlay();
});

// Tiếp tục auto-play khi bỏ hover
slideshow.addEventListener("mouseleave", () => {
  isUserInteracting = false;
  startAutoPlay();
});

//Tự động chuyển slide
setInterval(() => {
  current = (current + 1) % total;
  updateSlide();
}, 5000);

// Hỗ trợ phím mũi tên
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    current = (current - 1 + total) % total;
    updateSlide();
  } else if (e.key === "ArrowRight") {
    current = (current + 1) % total;
    updateSlide();
  }
});
createDots();
updateSlide();
