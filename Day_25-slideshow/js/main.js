const track = document.querySelector(".track");
const slides = document.querySelectorAll(".slide");
const btnPrev = document.querySelector("#prev");
const btnNext = document.querySelector("#next");
const dotsContainer = document.querySelector("#dots");

let total = slides.length;
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
  // Tăng index slide, nếu vượt ra  slide cuối thì quay về đầu
  current = (current + 1) % total;
  updateSlide();
});
//Nút Prev
btnPrev.addEventListener("click", () => {
  // Lùi slide, nếu đang ở slide 0 thì quay về slide cuối
  current = (current - 1 + total) % total;
  updateSlide();
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
updateSlide();
