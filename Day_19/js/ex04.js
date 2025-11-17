const scores = [
  [8, 9, 7], // học sinh 1
  [6, 5, 7], // học sinh 2
  [10, 9, 8], // học sinh 3
];

const avgScores = scores.map(
  (student) => student.reduce((acc, cur) => acc + cur, 0) / student.length
);

console.log(avgScores);

const goodStudents = avgScores.filter((avg) => avg >= 8);
console.log(goodStudents);

const increasedScores = scores.map((student) =>
  student.map((score) => (score < 10 ? score + 1 : 10))
);
console.log(increasedScores);
