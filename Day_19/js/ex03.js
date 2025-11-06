const myArr = [
  [2, 4, 6],
  [8, 10, 12],
  [14, 16, 18],
];

const mainDiagonal = myArr.map((value, index) => value[index]);
console.log(mainDiagonal);

const secondDiagonal = myArr.map(
  (value, index) => value[value.length - index - 1]
);
console.log(secondDiagonal);

const total = myArr.reduce((acc, value, index) => {
  return acc + value[index] + value[value.length - index - 1];
}, 0);
console.log(total);
