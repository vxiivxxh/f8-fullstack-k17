function fetchUser() {
  return new Promise((resolve) => setTimeout(() => resolve("User Data"), 2000));
}
function fetchPosts() {
  return new Promise((resolve) => setTimeout(() => resolve("Post Data"), 3000));
}
function fetchComments() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Comment Data"), 1000)
  );
}
const getAllData = async () => {
  const startTime = Date.now();

  // Chờ tất cả promises hoàn thành
  const [user, posts, comments] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments(),
  ]);

  const totalTime = Date.now() - startTime;
  console.log("User:", user);
  console.log("Posts:", posts);
  console.log("Comments:", comments);
  console.log("Tổng thời gian:", totalTime, "ms");
};
getAllData();
