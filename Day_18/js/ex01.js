const arr = [1, 2, 3, 4, 5, 6];

//mảng mới chứa bình phương của từng phần tử.
const squared = [];
for (let i = 0; i < arr.length; i++) {
  squared.push(arr[i] * arr[i]);
}
console.log(squared);

// mảng mới chứa các số chẵn trong mảng.
const evenNum = [];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 === 0) {
    evenNum.push(arr[i]);
  }
}
console.log(evenNum);

//Tạo mảng mới chứa các số bình phương nhưng chỉ lấy số lẻ.
const oddSquare = [];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 !== 0) {
    oddSquare.push(arr[i] * arr[i]);
  }
}
console.log(oddSquare);
