const BASE_URL = "https://dummyjson.com";
const app = {
  _query: {
    order: "desc",
    limit: 10,
    page: 1,
  },
  _timeoutId: null,
  init() {
    this.getUsers(); // Lấy danh sách bài viết
    this.search(); // Chức năng tìm kiếm
    this.sort(); // Chức năng sắp xếp
    this.paginate(); // Chức năng phân trang
    this.initModal(); // Khởi tạo Modal xem chi tiết
    this.initAddPost(); // Khởi tạo chức năng thêm bài viết
  },
  initAddPost() {
    const addBtn = document.querySelector(".js-add-post");
    addBtn.addEventListener("click", () => {
      this.openForm("add");
    });
  },
  async getUsers() {
    try {
      // Hiển thị trạng thái loading
      this.renderLoading();
      const skip = (this._query.page - 1) * this._query.limit;
      let url = `${BASE_URL}/posts?sortBy=id&order=${this._query.order}&limit=${this._query.limit}&skip=${skip}`;
      if (this._query.q) {
        url = `${BASE_URL}/posts/search?q=${this._query.q}&sortBy=id&order=${this._query.order}&limit=${this._query.limit}&skip=${skip}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch /posts");
      }
      const data = await response.json();
      const pageNumber = Math.ceil(data.total / this._query.limit); // Tính tổng số trang
      this.renderPosts(data.posts);
      this.renderPaginate(pageNumber);
    } catch (error) {
      //Add error
      this.renderError(error.message);
    } finally {
      //Remove loading
      this.renderLoading(false);
    }
  },
  renderPaginate(pageNumber) {
    const paginateEl = document.querySelector(".js-paginate");
    paginateEl.innerHTML = "";
    for (let page = 1; page <= pageNumber; page++) {
      const active = this._query.page === page ? "bg-green-600" : "";
      paginateEl.innerHTML += `<button class="border border-gray-300 px-4 py-2 ${active}">${page}</button>`;
    }
  },
  renderLoading(status = true) {
    const loadingEl = document.querySelector(".js-loading");
    loadingEl.innerHTML = status
      ? `<span class="block text-3xl text-center">Loading...</span>`
      : "";
  },
  renderError(message) {
    const postListEl = document.querySelector(".js-post-list");
    postListEl.innerHTML = `<span class="block text-3xl text-center">${message}</span>`;
  },
  renderPosts(posts) {
    const postListEl = document.querySelector(".js-post-list");
    postListEl.innerHTML = posts
      .map((post) => this.createPostHTML(post))
      .join("");
  },
  sanitizeText(text) {
    return text.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  },
  search() {
    const inputEl = document.querySelector(".js-search");
    inputEl.addEventListener("input", (e) => {
      if (this._timeoutId) {
        clearTimeout(this._timeoutId);
      }
      this._timeoutId = setTimeout(() => {
        const keyword = e.target.value;
        this._query.q = keyword;
        this._query.page = 1;
        this.getUsers();
      }, 500);
    });
  },
  debounce(callback, timeout = 500) {
    let id;
    return (...args) => {
      //args --> mảng
      if (id) {
        clearTimeout(id);
      }
      id = setTimeout(() => {
        callback.apply(null, args);
      }, timeout);
    };
  },
  sort() {
    const btnList = document.querySelectorAll(".js-sort button");
    btnList.forEach((btn) => {
      btn.addEventListener("click", () => {
        const sortValue = btn.dataset.sort;
        const btnActive = document.querySelector(".js-sort .btn-active");
        if (btnActive) {
          btnActive.classList.remove("btn-active");
        }
        btn.classList.add("btn-active");
        this._query.order = sortValue;
        this.getUsers();
      });
    });
  },
  paginate() {
    const paginateEl = document.querySelector(".js-paginate");
    paginateEl.addEventListener("click", (e) => {
      const page = +e.target.innerText;
      this._query.page = page;
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
      this.getUsers();
    });
  },

  initModal() {
    this.modal = document.querySelector("#modal");
    this.modalContent = document.querySelector("#modalContent");
    this.closeModalBtn = document.querySelector("#closeModal");

    // Xử lý đóng modal khi bấm nút X
    this.closeModalBtn.addEventListener("click", () => this.closeModal());
    // Xử lý đóng modal khi bấm ra ngoài (overlay)
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) this.closeModal();
    });

    // Xử lý đóng modal khi bấm ra ngoài (overlay)
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) this.closeModal();
    });

    // Lắng nghe sự kiện click trong Modal (Sửa/Xóa từ trang chi tiết)
    this.modalContent.addEventListener("click", (e) => {
      if (e.target.classList.contains("js-edit-modal")) {
        const id = e.target.dataset.id;
        this.openForm("edit", id);
      }
      if (e.target.classList.contains("js-delete-modal")) {
        const id = e.target.dataset.id;
        this.deletePost(id);
      }
    });

    // Lắng nghe sự kiện click trong Post List
    const postListEl = document.querySelector(".js-post-list");
    postListEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("js-view-detail")) {
        const id = e.target.dataset.id;
        this.openDetail(id);
      }
      if (e.target.classList.contains("js-edit")) {
        const id = e.target.dataset.id;
        this.openForm("edit", id);
      }
      if (e.target.classList.contains("js-delete")) {
        const id = e.target.dataset.id;
        this.deletePost(id);
      }
    });
  },
  async openDetail(id) {
    this.modal.classList.remove("hidden");
    this.modal.classList.add("flex");
    
    // Hiển thị loading trong khi chờ dữ liệu
    this.modalContent.innerHTML = `<div class="py-10 text-center text-xl">Loading...</div>`;

    try {
      // Gọi API lấy chi tiết bài viết
      const res = await fetch(`${BASE_URL}/posts/${id}`);
      if (!res.ok) throw new Error("Failed to load post");
      const post = await res.json();
      
      this.renderPostDetail(post);
    } catch (e) {
      this.modalContent.innerHTML = `<div class="text-center text-red-500 py-10">Error: ${this.sanitizeText(e.message)}</div>`;
    }
  },
  closeModal() {
    this.modal.classList.add("hidden");
    this.modal.classList.remove("flex");
  },
  // Render nội dung chi tiết bài viết vào Modal
  renderPostDetail(post) {
    this.modalContent.innerHTML = `
      <h2 class="text-3xl font-bold text-center border-b pb-3 mb-4">${this.sanitizeText(post.title)}</h2>
      <p class="mb-4 leading-relaxed text-lg">${this.sanitizeText(post.body)}</p>
      <div class="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
         <p class="font-semibold text-gray-600">Views: ${post.views ? post.views : "Không có"}</p>
         <div class="flex gap-3">
            <button data-id="${post.id}" class="js-edit-modal px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Sửa</button>
            <button data-id="${post.id}" class="js-delete-modal px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">Xóa</button>
         </div>
      </div>
    `;
  },
  async openForm(mode, id = null) {
    this.modal.classList.remove("hidden");
    this.modal.classList.add("flex");
    let title = "", body = "";
    
    if (mode === "edit" && id) {
       this.modalContent.innerHTML = `<div class="py-10 text-center text-xl">Loading...</div>`;
       try {
           // Lấy dữ liệu bài viết cũ để fill vào form
           const res = await fetch(`${BASE_URL}/posts/${id}`);
           if (!res.ok) throw new Error("Failed to load post");
           const post = await res.json();
           title = post.title;
           body = post.body;
       } catch(e) {
           this.modalContent.innerHTML = `<div class="text-center text-red-500 py-10">Error loading post data</div>`;
           return;
       }
    }

    this.renderForm(mode, id, title, body);
  },
  renderForm(mode, id, title = "", body = "") {
    const formTitle = mode === "add" ? "Thêm bài viết" : "Sửa bài viết";
    const btnText = "Lưu"; 
    
    this.modalContent.innerHTML = `
        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 class="text-xl font-bold text-gray-800">${formTitle}</h2>
        </div>
        <form id="postForm" class="p-6 flex flex-col gap-4">
            <div>
                <input 
                    type="text" 
                    name="title" 
                    value="${this.sanitizeText(title)}" 
                    placeholder="Tiêu đề..." 
                    class="w-full border border-gray-300 p-2.5 rounded text-sm outline-none focus:border-green-500 text-gray-700 placeholder-gray-400" 
                    required 
                />
            </div>
            <div>
                <textarea 
                    name="body" 
                    rows="6" 
                    placeholder="Nội dung..." 
                    class="w-full border border-gray-300 p-2.5 rounded text-sm outline-none focus:border-green-500 text-gray-700 placeholder-gray-400 resize-none" 
                    required
                >${this.sanitizeText(body)}</textarea>
            </div>
            <div class="flex justify-end gap-2 mt-2">
                <button type="button" class="js-cancel-form border border-gray-300 py-1.5 px-4 rounded text-sm hover:bg-gray-50 text-gray-600 transition-colors">Hủy</button>
                <button type="submit" class="bg-[#28a745] text-white py-1.5 px-4 rounded text-sm hover:bg-[#218838] shadow-sm font-medium transition-colors">${btnText}</button>
            </div>
        </form>
    `;
    
    // Xử lý nút Hủy
    this.modalContent.querySelector(".js-cancel-form").addEventListener("click", () => {
        this.closeModal();
    });

    const form = this.modalContent.querySelector("#postForm");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {
            title: formData.get("title"),
            body: formData.get("body"),
            userId: 5 
        };
        this.handleFormSubmit(mode, id, data);
    });
  },
  async handleFormSubmit(mode, id, data) {
      // Hiển thị loading hoặc disable nút submit 
      const submitBtn = this.modalContent.querySelector("button[type='submit']");
      submitBtn.textContent = "Processing...";
      submitBtn.disabled = true;

      try {
          let url, method, result;
          if (mode === "add") {
              url = `${BASE_URL}/posts/add`;
              method = "POST";
          } else {
              url = `${BASE_URL}/posts/${id}`;
              method = "PUT";
          }

          const response = await fetch(url, {
              method: method,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data)
          });

          if (!response.ok) throw new Error("Failed to submit");
          const resultPost = await response.json();

          // Cập nhật UI
          if (mode === "add") {
             // Thêm vào đầu danh sách (giả lập)
             const postListEl = document.querySelector(".js-post-list");
             const newPostHtml = this.createPostHTML(resultPost);
             postListEl.insertAdjacentHTML('afterbegin', newPostHtml);
             alert(`Thêm thành công! ID: ${resultPost.id}`);
          } else {
             // Cập nhật bài viết hiện tại trong DOM
             // Tìm phần tử trong danh sách và replace nội dung
             const editBtn = document.querySelector(`.js-edit[data-id="${id}"]`);
             if(editBtn) {
                 const postItem = editBtn.closest('.border');
                 // Cập nhật title và body
                 postItem.querySelector('h2').innerText = resultPost.title;
                 postItem.querySelector('p').innerText = resultPost.body;
             }
             alert("Cập nhật thành công!");
          }
          this.closeModal();

      } catch (e) {
          alert("Có lỗi xảy ra: " + e.message);
          submitBtn.textContent = "Try Again";
          submitBtn.disabled = false;
      }
  },
  async deletePost(id) {
      if(!confirm("Bạn có chắc chắn muốn xóa bài viết này?")) return;
      
      try {
          const response = await fetch(`${BASE_URL}/posts/${id}`, {
              method: "DELETE"
          });
          if(!response.ok) throw new Error("Failed to delete");
          const data = await response.json(); // Trả về post đã xoá

          // Xoá khỏi DOM
           const deleteBtn = document.querySelector(`.js-delete[data-id="${id}"]`);
             if(deleteBtn) {
                 const postItem = deleteBtn.closest('.border'); // Lấy parent
                 if(postItem) postItem.remove();
             }
          
          this.closeModal(); // Đóng modal nếu đang mở
          alert(`Đã xóa bài viết ${data.id} vào lúc ${data.deletedOn || new Date().toISOString()}`);

      } catch (e) {
           alert("Lỗi khi xóa: " + e.message);
      }
  },
  createPostHTML(post) {
      return `<div class="my-3 border border-gray-300 p-5">
          <h2 class="text-2xl font-medium mb-3">
            ${this.sanitizeText(post.title)}
          </h2>
          <p>
            ${this.sanitizeText(post.body)}
          </p>
          <div class="flex justify-between mt-3">
            <button
              data-id="${post.id}"
              class="js-view-detail cursor-pointer border border-gray-300 py-2 px-5 hover:bg-green-600 rounded-full"
            >
              Xem chi tiết
            </button>
            <div class="flex gap-2">
              <span data-id="${post.id}" class="js-edit cursor-pointer hover:underline text-blue-600">Sửa</span>
              <span data-id="${post.id}" class="js-delete text-red-600 cursor-pointer hover:underline">Xóa</span>
            </div>
          </div>
        </div>`;
  }
};
app.init();

