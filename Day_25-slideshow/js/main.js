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
  track.style.transform = `translateX(-${current * 100}%)`;
  updateDots();
}

// Tạo các chấm điều hướng
function createDots() {
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("span");
    dot.className =
      "w-3 h-3 rounded-full bg-white/30 border-2 border-white cursor-pointer transition-all hover:bg-white hover:scale-110";

    if (i === current) {
      dot.className =
        "w-3 h-3 rounded-full bg-white border-2 border-white cursor-pointer transition-all shadow-lg";
    }

    dot.addEventListener("click", () => {
      current = i;
      updateSlide();
      resetAutoPlay();
    });

    dotsContainer.appendChild(dot);
  }
}

// Cập nhật trạng thái chấm
function updateDots() {
  const dots = dotsContainer.children;

  for (let i = 0; i < dots.length; i++) {
    if (i === current) {
      dots[i].className =
        "w-3 h-3 rounded-full bg-white border-2 border-white cursor-pointer transition-all shadow-lg";
    } else {
      dots[i].className =
        "w-3 h-3 rounded-full bg-white/30 border-2 border-white cursor-pointer transition-all hover:bg-white hover:scale-110";
    }
  }
}
function startAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
  }
  autoPlayInterval = setInterval(() => {
    if (!isUserInteracting) {
      current = (current + 1) % total;
      updateSlide();
    }
  }, 2000);
}
function stopAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
}
function resetAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}
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

// Hỗ trợ phím mũi tên
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    current = (current - 1 + total) % total;
    updateSlide();
    resetAutoPlay();
  } else if (e.key === "ArrowRight") {
    current = (current + 1) % total;
    updateSlide();
    resetAutoPlay();
  }
});
createDots();
updateSlide();
startAutoPlay();
