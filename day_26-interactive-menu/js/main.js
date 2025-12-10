const items = document.querySelectorAll("ul li");
const ul = document.querySelector("ul");
const overlay = document.querySelector(".overlay");
const form = overlay.querySelector("form");
const input = overlay.querySelector("input");
const contextMenu = document.querySelector(".context-menu");

let currentItem = null;
items.forEach((item) => {
  const downBtn = item.querySelector(".down");
  const upBtn = item.querySelector(".up");
  const textItem = item.querySelector(".textItem");

  upBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Dừng sự kiện lan truyền
    const prevEl = item.previousElementSibling;
    if (!prevEl) {
      return;
    }
    ul.insertBefore(item, prevEl);
  });
  upBtn.addEventListener("contextmenu", (e) => e.stopPropagation());

  downBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const nextEl = item.nextElementSibling;
    if (!nextEl) {
      return;
    }
    ul.insertBefore(nextEl, item);
  });
  downBtn.addEventListener("contextmenu", (e) => e.stopPropagation());

  item.addEventListener("click", (e) => {
    e.stopPropagation();
    const selectedEl = ul.querySelector(".selected");

    // Xóa class selected của item cũ
    if (selectedEl) {
      selectedEl.classList.remove("selected");
    }

    // Thêm class selected cho item hiện tại
    item.classList.add("selected");
  });

  textItem.addEventListener("contextmenu", (e) => {
    e.stopPropagation();
    e.preventDefault(); // Ngăn menu mặc định của trình duyệt
    currentItem = item;
    contextMenu.style.top = e.clientY + "px";
    contextMenu.style.left = e.clientX + "px";
    contextMenu.style.display = "block"; // Hiện context menu
  });
});

const renameItem = contextMenu.querySelector(".rename");
const deleteItem = contextMenu.querySelector(".delete");
deleteItem.addEventListener("click", () => {
  if (currentItem) {
    currentItem.remove(); // Xóa item khỏi DOM
    contextMenu.style.display = "none"; // Ẩn context menu
  }
});

renameItem.addEventListener("click", (e) => {
  e.stopPropagation();
  if (currentItem) {
    const text = currentItem.querySelector(".textItem").textContent.trim();
    input.value = text;
    overlay.style.display = "flex";
    contextMenu.style.display = "none";
    input.focus();
    input.select(); // Bôi đen text
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Ngăn form reload trang
  currentItem.querySelector(".textItem").textContent = input.value;
  overlay.style.display = "none";
});

document.addEventListener("click", (e) => {
  // Khi click ra ngoài thì bỏ selected
  const selectedEl = ul.querySelector(".selected");
  if (selectedEl) {
    selectedEl.classList.remove("selected");
  }
  // Ẩn context menu khi click ra ngoài
  if (!contextMenu.contains(e.target)) {
    contextMenu.style.display = "none";
  }
  // Ẩn overlay khi click ra ngoài form
  if (overlay.style.display === "flex" && !form.contains(e.target)) {
    overlay.style.display = "none";
  }
});

document.addEventListener("keydown", (e) => {
  // Nhân bản item đã chọn
  if (e.shiftKey && e.altKey) {
    const selectedEl = ul.querySelector(".selected");
    if (!selectedEl) {
      return;
    }
    if (e.key === "ArrowDown") {
      // Nhân bản và chèn phía dưới
      const itemClone = selectedEl.cloneNode(true);
      itemClone.classList.remove("selected");
      ul.insertBefore(itemClone, selectedEl.nextElementSibling); // Chèn sau item hiện tại
    }

    if (e.key === "ArrowUp") {
      // Nhân bản và chèn phía trên
      const itemClone = selectedEl.cloneNode(true);
      itemClone.classList.remove("selected");
      ul.insertBefore(itemClone, selectedEl); // Chèn trước item hiện tại
    }
  }
  if (e.key === "Escape") {
    if (contextMenu) {
      contextMenu.style.display = "none";
    }
    if (overlay) {
      overlay.style.display = "none";
    }
  }
});

//cloneNode() là phương thức trong JavaScript dùng để sao chép (nhân bản) một phần tử trong DOM.
// Tham số: true: Sao chép toàn bộ (bao gồm cả các phần tử con bên trong)
// false: Chỉ sao chép phần tử đó (không bao gồm phần tử con)
