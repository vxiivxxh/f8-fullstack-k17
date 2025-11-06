const arr = [[1, 2, 3], [4, 5], [6]];
const total = arr.flat().reduce((acc, value) => acc + value, 0);
console.log(total);