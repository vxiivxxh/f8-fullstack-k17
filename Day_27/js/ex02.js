function fetchFromServer1() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Server 1 Response"), 3000)
  );
}
function fetchFromServer2() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Server 2 Response"), 2000)
  );
}
function fetchFromServer3() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Server 3 Response"), 1000)
  );
}

const getFastestServer = async () => {
  const startTime = Date.now();
  const fastestResponse = await Promise.race([
    fetchFromServer1(),
    fetchFromServer2(),
    fetchFromServer3(),
  ]);
  const totalTime = Date.now() - startTime;
  console.log("Phản hồi nhanh nhất:", fastestResponse);
};
getFastestServer();
