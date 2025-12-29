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
      .map(
        (post) => `<div class="my-3 border border-gray-300 p-5">
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
              <span class="cursor-pointer">Sửa</span>
              <span class="text-red-600 cursor-pointer">Xóa</span>
            </div>
          </div>
        </div>`
      )
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

    // Lắng nghe sự kiện click vào nút "Xem chi tiết" (Event Delegation)
    const postListEl = document.querySelector(".js-post-list");
    postListEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("js-view-detail")) {
        const id = e.target.dataset.id;
        this.openDetail(id);
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
      <div class="mt-4 pt-4 border-t border-gray-100">
         <p class="font-semibold text-gray-600">Views: ${post.views ? post.views : "Không có"}</p>
      </div>
    `;
  }
};


app.init();

