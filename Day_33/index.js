const { useState, useEffect } = React;
const TodoApp = () => {
  // Khởi tạo state 'tasks' bằng cách lấy dữ liệu từ localStorage
  // Nếu có dữ liệu 'react_tasks_v2' thì giải mã JSON, nếu không trả về mảng rỗng
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("react_tasks_v2");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Lưu dữ liệu vào localStorage khi tasks thay đổi
  useEffect(() => {
    localStorage.setItem("react_tasks_v2", JSON.stringify(tasks));
  }, [tasks]);

  // Hàm kiểm tra trùng
  const isDuplicate = (text, excludeIdx = null) => {
    return tasks.some((t, i) => {
      if (excludeIdx !== null && i === excludeIdx) return false;
      return t.text.toLowerCase() === text.toLowerCase();
    });
  };
  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
    setError("");
  };
  const handleAddTask = (e) => {
    e.preventDefault();
    const text = inputValue.trim();

    if (!text) {
      setError("Không được để trống!");
      return;
    }
    if (isDuplicate(text)) {
      setError("Giá trị đã tồn tại!");
      return;
    }
    // Thêm mới vào mảng
    const newTask = { text: text, completed: false };
    setTasks([...tasks, newTask]);

    setInputValue("");
    setError("");
  };

  const handleDelete = (index) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
    }
  };

  // Xử lý Toggle
  const handleToggle = (index) => {
    if (editIndex === index) return;

    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  //Edit
  const startEdit = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index].text);
    setError("");
  };
  const cancelEdit = () => {
    setEditIndex(null);
    setEditValue("");
    setError("");
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    const text = editValue.trim();
    if (!text) {
      setError("Không được để trống!");
      return;
    }
    if (isDuplicate(text, editIndex)) {
      setError("Giá trị đã tồn tại!");
      return;
    }
    const newTasks = [...tasks];
    newTasks[editIndex].text = text;
    setTasks(newTasks);
    cancelEdit();
  };

  return (
    <div className="w-screen min-h-screen flex py-10 justify-center bg-purple-700 font-sans">
      <div className="mt-[80px] w-full max-w-[450px] m-auto p-6 bg-[#1a1a40] rounded-lg shadow-2xl">
        <div className="flex flex-col gap-6 w-full">
          <h1 className="text-white font-semibold text-3xl text-center mb-4 tracking-wide">
            Get Things Done!
          </h1>

          <div className="w-full">
            <form onSubmit={handleAddTask} className="flex w-full mb-4">
              <input
                type="text"
                placeholder="What is the task today?"
                value={inputValue}
                onChange={handleChangeInput}
                className="flex-1 border border-violet-600 focus:outline-none focus:ring-0 focus:border-gray-400 px-3 py-2 text-white bg-[#0f0f2b] placeholder-gray-500"
              />
              <button
                type="submit"
                className="p-3 bg-violet-600 text-white font-bold cursor-pointer"
              >
                Add task
              </button>
            </form>
            {error && editIndex === null && (
              <p className="text-red-400 text-sm -mt-2 mb-4">{error}</p>
            )}
          </div>
          <ul className="flex flex-col gap-3 min-h-[50px]">
            {tasks.length === 0 ? (
              <li className="text-center text-gray-400 italic py-8 bg-[#0f0f2b] rounded border border-gray-700 border-dashed">
                No tasks yet. Add one above!
              </li>
            ) : (
              tasks.map((task, index) => {
                // Kiểm tra xem dòng này có đang được sửa không
                const isEditing = editIndex === index;
                return (
                  <li
                    key={index}
                    className="bg-purple-400 flex justify-between items-center px-4 py-3 rounded"
                  >
                    {isEditing ? (
                      <div className="flex flex-col gap-2 w-full">
                        <form onSubmit={handleUpdate} className="flex w-full">
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => {
                              setEditValue(e.target.value);
                              if (error) setError("");
                            }}
                            className="flex-1 border border-gray-400 px-3 py-2 text-white bg-[#0f0f2b] focus:outline-none focus:ring-0 rounded-none h-[42px]"
                            autoFocus
                          />
                          <button
                            type="submit"
                            className="h-[42px] px-4 bg-violet-600 text-white font-bold"
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            onClick={cancelEdit}
                            className="h-[42px] px-4 bg-red-600 text-white font-bold ml-1"
                          >
                            Cancel
                          </button>
                        </form>
                        {error && (
                          <p className="text-red-400 text-sm">{error}</p>
                        )}
                      </div>
                    ) : (
                      <>
                        <p
                          onClick={() => handleToggle(index)}
                          className={`task-text text-white font-medium cursor-pointer select-none flex-1 truncate pr-4 ${
                            task.completed ? "line-through opacity-50" : ""
                          }`}
                        >
                          {task.text}
                        </p>
                        <div className="flex gap-4">
                          <button
                            onClick={() => startEdit(index)}
                            className="text-white text-xl"
                            title="Edit"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="text-white text-xl"
                            title="Delete"
                          >
                            <i className="fa-regular fa-trash-can"></i>
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Render
const element = <TodoApp />;
const root = document.querySelector("#root");
const container = ReactDOM.createRoot(root);
container.render(element);
