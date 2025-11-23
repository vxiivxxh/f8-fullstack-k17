const todoForm = document.querySelector("#todoForm");
const taskInput = document.querySelector("#taskInput");
const errorMsg = document.querySelector("#errorMsg");
const taskList = document.querySelector("#todoList");
//Tạo mảng lưu trữ
let tasks = [];

//Bảo mật dữ liệu đầu vào
function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Hiển thị thông báo lỗi
function showError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.remove("hidden");
}

// Ẩn thông báo lỗi
function hideError() {
  errorMsg.classList.add("hidden");
}

//Kiểm tra trùngg lặp
function isDuplicate(text, excludeIndex = null) {
  return tasks.some((task, index) => {
    if (excludeIndex !== null && index === excludeIndex) {
      return false;
    }
    return task.toLowerCase() === text.toLowerCase();
  });
}

//Kiểm tra input có hợp lệ không
function validateInput(value, excludeIndex = null) {
  // Kiểm tra rỗng
  if (value.trim() === "") {
    showError("Todo cannot be left blank");
    return false;
  }
  // Kiểm tra trùng lặp
  if (isDuplicate(value, excludeIndex)) {
    showError("This task already exists!");
    return false;
  }
  // Hợp lệ
  hideError();
  return true;
}
function renderTasks() {
  // Nếu không có task nào
  if (tasks.length === 0) {
    taskList.innerHTML = ` <li class="text-center text-gray-400 italic py-8 list-none"> No tasks yet. Add one above!</li>`;
    return;
  }
  // Xóa nội dung cũ
  taskList.innerHTML = "";
  // forEach(): Lặp qua từng phần tử trong array
  tasks.forEach((task, index) => {
    createTaskElement(task, index);
  });
}
//Tạo phần tử task
//createElement(): Tạo element mới
//appendChild():  Thêm element con
function createTaskElement(taskText, index) {
  const liEl = document.createElement("li");
  liEl.className =
    "bg-purple-400 flex justify-between items-center px-4 py-3 rounded";
  liEl.dataset.index = index;

  const text = document.createElement("p");
  text.className =
    "task-text text-white font-medium cursor-pointer select-none flex-1";
  text.innerHTML = escapeHTML(taskText);

  const divIcon = document.createElement("div");
  divIcon.className = "flex gap-4";

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn text-white text-xl hover:opacity-80";
  editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn text-white text-xl hover:opacity-80";
  deleteBtn.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;

  divIcon.appendChild(editBtn);
  divIcon.appendChild(deleteBtn);
  liEl.appendChild(text);
  liEl.appendChild(divIcon);
  taskList.appendChild(liEl);
}
//Add task
// Thêm task mới vào danh sách
// preventDefault(): Ngăn form reload trang
// push(): Thêm phần tử vào cuối array
function addTask(e) {
  e.preventDefault();
  const value = taskInput.value.trim();
  if (!validateInput(value)) {
    return;
  }
  tasks.push(value);
  taskInput.value = "";
  renderTasks();
  taskInput.focus();
}

//Toggle completed
function toggleCompleted(taskElement) {
  const textElement = taskElement.querySelector(".task-text");
  textElement.classList.toggle("line-through");
  textElement.classList.toggle("opacity-40");
}

//Edit task
// Chuyển task sang chế độ edit
// replaceChild(): Thay thế element con
function openEditMode(taskElement, index) {
  const currentText = tasks[index];

  const editForm = document.createElement("form");
  editForm.className = "flex w-full";

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = currentText;
  editInput.className =
    "flex-1 border border-gray-400 px-3 py-2 text-white bg-[#0f0f2b] rounded-none focus:outline-none focus:ring-0";

  const updateBtn = document.createElement("button");
  updateBtn.innerText = "Update Task";
  updateBtn.type = "submit";
  updateBtn.className =
    "p-3 bg-violet-600 hover:bg-violet-500 text-white font-bold";

  editForm.appendChild(editInput);
  editForm.appendChild(updateBtn);
  taskList.replaceChild(editForm, taskElement);
  editInput.focus();
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newValue = editInput.value.trim();
    if (!validateInput(newValue, index)) {
      return;
    }
    tasks[index] = newValue;
    renderTasks();
    hideError();
    taskInput.focus();
  });
}

//Delete task
// confirm(): Hiện hộp thoại xác nhận
// splice(): Xóa phần tử khỏi array
function deleteTask(index) {
  if (!confirm("Are you sure you want to delete this task?")) {
    return;
  }

  tasks.splice(index, 1); //Xóa 1 phần tử tại vị trí index
  renderTasks();
}

// Xử lý sự kiện submit của form (ngăn reload trang)
todoForm.addEventListener("submit", addTask);

// Xử lý sự kiện click trên danh sách task
taskList.addEventListener("click", (e) => {
  const taskElement = e.target.closest("[data-index]");
  if (!taskElement) return;

  const index = Number(taskElement.dataset.index);

  if (e.target.matches(".edit-btn") || e.target.matches(".edit-btn i")) {
    openEditMode(taskElement, index);
    return;
  }

  if (e.target.matches(".delete-btn") || e.target.matches(".delete-btn i")) {
    deleteTask(index);
    return;
  }

  if (e.target.matches(".task-text")) {
    toggleCompleted(taskElement);
    return;
  }
});

// Khởi tạo hiển thị ban đầu
renderTasks();
taskInput.focus();
