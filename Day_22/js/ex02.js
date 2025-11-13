const students = [
  { id: 1, name: "An", scores: { math: 8, english: 7, science: 9 } },
  { id: 2, name: "Bình", scores: { math: 6, english: 8, science: 7 } },
  { id: 3, name: "Châu", scores: { math: 9, english: 6, science: 8 } },
];

//Tính điểm trung bình của từng học viên

const averageScores = (arr) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const student = arr[i];
    const scores = student.scores;
    const avg = (scores.math + scores.english + scores.science) / 3;
    result.push({
      id: student.id,
      name: student.name,
      average: avg.toFixed(2),
    });
  }
  return result;
};
console.log(averageScores(students));

//Danh sachs học viên theo điểm trung bình giảm dần
const menuStudent = result.sort((a, b) => b.average - a.average);
console.log(menuStudent);
