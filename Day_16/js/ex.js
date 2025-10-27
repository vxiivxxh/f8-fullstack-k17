//Bài 1:
let n = 5;
let total = 0;

for (let i = 1; i <= n; i++) {
  total += i * (i + 1);
}
console.log(total);

//Bài 2:
let a = 5;
let b = 9;
let isEven = 0;
let isOdd = 0;
for (let i = a; i <= b; i++) {
  if (i % 2 === 0) {
    isEven += i;
  } else {
    isOdd += i;
  }
}
console.log(`Tổng số chẵn: ${isEven}`);
console.log(`Tổng số lẻ: ${isOdd}`);

//Bài 3:
let htmlString = "<table border='1'><tbody>";

// Tạo hàng 1
htmlString += "<tr>";
for (let i = 1; i <= 5; i++) {
  htmlString += `<th>${i}</th>`;
}
htmlString += "</tr>";

// Tạo hàng 2
htmlString += "<tr>";

for (let i = 1; i <= 5; i++) {
  htmlString += "<td width= 150px>";
  for (let j = 1; j <= 10; j++) {
    htmlString += `<div>${i} x ${j} = ${i * j}</div>`;
  }
  htmlString += "</td>";
}
htmlString += "</tr>";

// Tạo hàng 3
htmlString += "<tr>";
for (let i = 6; i <= 10; i++) {
  htmlString += `<th>${i}</th>`;
}
htmlString += "</tr>";

// Tạo hàng 4
htmlString += "<tr>";

for (let i = 6; i <= 10; i++) {
  htmlString += "<td>";
  for (let j = 1; j <= 10; j++) {
    htmlString += `<div>${i} x ${j} = ${i * j}</div>`;
  }
  htmlString += "</td>";
}
htmlString += "</tr>";

document.body.innerHTML = htmlString;
