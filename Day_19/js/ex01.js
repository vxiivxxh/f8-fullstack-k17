const myArr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const rowToTal = [];
//Tính tổng từng hàng
for (let i = 0; i < myArr.length; i++) {
  const row = myArr[i];
  let total = 0;
  console.log(row);

  for (let j = 0; j < myArr.length; j++) {
    const num = row[j];
    total += num;
  }
  console.log(`Tổng hàng ${i}: ${total}`);
  rowToTal.push(total);
}
console.log(rowToTal);

//Tính tổng từng cột
const colTotal = [];
for (let j = 0; j < myArr[0].length; j++) {
  let total = 0;

  for (let i = 0; i < myArr.length; i++) {
    const value = myArr[i][j];
    total += value;
  }
  console.log(`Tổng cột ${j}: ${total}`);
  colTotal.push(total);
}
console.log(colTotal);

//Lọc hàng tổng >=10
const filteredRows = [];
for (let i = 0; i < myArr.length; i++) {
  const row = myArr[i];
  let sum = 0;

  for (let j = 0; j < row.length; j++) {
    sum += row[j];
    console.log(`Hàng ${i}: [${row}] => Tổng = ${sum}`);
  }
  if (sum <= 10) {
    console.log(`Tổng <=10 = ${sum}`);

    continue;
  }
  console.log(`Tổng >10 = ${sum}`);

  filteredRows.push(row);
}
console.log(filteredRows);
