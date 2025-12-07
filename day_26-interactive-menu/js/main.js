const items = document.querySelectorAll("ul li");
const ul = document.querySelector("ul");
const contextMenu = document.getElementById("contextMenu");
const overlay = document.getElementById("overlay");

let currentItem = null;
let isRenaming = false;
let originalText = "";

items.forEach((item) => {
  const upBtn = item.querySelector(".up");
  const downBtn = item.querySelector(".down");

  upBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const preEL = item.previousElementSibling;
    if (!preEL) {
      return;
    }
    ul.insertBefore(item, preEL);
  });

  downBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const nextEL = item.nextElementSibling;
    if (!nextEL) {
      return;
    }
    ul.insertBefore(nextEL, item);
  });

  item.addEventListener("click", (e) => {
    if (isRenaming) return;
    e.stopPropagation();
    const selectedEL = ul.querySelector(".selected");
    if (selectedEL) {
      selectedEL.classList.remove("selected");
    }
    item.classList.add("selected");
  });

  item.addEventListener("contextmenu", (e) => {
    if (isRenaming) return;

    if (e.target === item || e.target.nodeType === Node.TEXT_NODE) {
      e.preventDefault();
      e.stopPropagation();
      currentItem = item;
      showContextMenu(e.clientX, e.clientY);
    }
  });
});

const showContextMenu = (x, y) => {
  contextMenu.style.left = x + "px";
  contextMenu.style.top = y + "px";
  contextMenu.classList.add("active");
  overlay.classList.add("active");
};

const hideContextMenu = () => {
  contextMenu.classList.remove("active"); 
  overlay.classList.remove("active"); 
  currentItem = null; 
};