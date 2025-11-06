const myArr = [
  ["hello", "world"],
  ["javascript", "php"],
  ["css", "html"],
];

// const processArray = (arr) => {
//   const result = [];

//   for (let i = 0; i < arr.length; i++) {
//     const row = arr[i];

//     if (row.length === 0) {
//       continue;
//     }
//     for (let j = 0; j < row.length; j++) {
//       const word = row[j];
//       const upperWord = word.toUpperCase();

//       if (upperWord.length <= 4) {
//         continue;
//       }
//       result.push(upperWord);
//     }
//   }
//   return result;
// };
// const finalResult = processArray(myArr);
// console.log(finalResult);

//Cách 2:
const result = myArr
  .map((row) => row.map((word) => word.toUpperCase()))
  .flat()
  .filter((word) => word.length > 4);

console.log(result);
