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
  track.style.transform = `translateX(-${current * 100}%)`;
  updateDots();
}

// Tạo các chấm điều hướng
function createDots() {
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("span");
    dot.className =
      "w-3 h-3 rounded-full bg-red-600/40 cursor-pointer transition-all hover:bg-red-600";
    if (i === current) {
      dot.className =
        "w-3 h-3 rounded-full bg-red-600 cursor-pointer transition-all shadow-lg shadow-red-600/50";
    }

    dot.addEventListener("click", () => {
      current = i;
      updateSlide();
    });
    dotsContainer.appendChild(dot);
  }
}
function updateDots() {
  const dots = dotsContainer.children;

  for (let i = 0; i < dots.length; i++) {
    if (i === current) {
      dots[i].className =
        "w-3 h-3 rounded-full bg-red-500 cursor-pointer transition-all shadow-lg shadow-red-600/50";
    } else {
      dots[i].className =
        "w-3 h-3 rounded-full bg-red-600/40 cursor-pointer transition-all hover:bg-red-600";
    }
  }
}
//Nút Next
btnNext.addEventListener("click", () => {
  current = (current + 1) % total;
  updateSlide();
});
//Nút Prev
btnPrev.addEventListener("click", () => {
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
createDots();
updateSlide();
