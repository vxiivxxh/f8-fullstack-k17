const watchHistory = [
  { userId: 1, videoId: "A1", duration: 10 },
  { userId: 2, videoId: "B1", duration: 15 },
  { userId: 1, videoId: "A1", duration: 20 },
  { userId: 3, videoId: "C1", duration: 30 },
  { userId: 2, videoId: "B1", duration: 5 },
  { userId: 1, videoId: "A2", duration: 25 },
  { userId: 3, videoId: "C1", duration: 15 },
];

//Tính tổng thời lượng xem của từng video
const totalWatchTime = watchHistory.reduce((acc, record) => {
  const video = record.videoId;
  if (!acc[video]) {
    acc[video] = 0;
  }
  acc[video] += record.duration;
  return acc;
}, {});
console.log(totalWatchTime);
