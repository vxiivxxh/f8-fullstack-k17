async function retry(fn, times) {
  for (let i = 1; i <= times; i++) {
    try {
      return await fn();
    } catch (error) {
      // Nếu fn() fail → vào catch
      if (i === times) throw error;
    }
  }
}
let failingPromise = () => {
  return new Promise((resolve, reject) => {
    Math.random() > 0.7 ? resolve("Thành công") : reject("Thất bại");
  });
};
retry(failingPromise, 3).then(console.log).catch(console.error);
