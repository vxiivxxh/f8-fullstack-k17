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

//Bài4:Viết hàm tính tổng các số nguyên tố từ 1 đến n.

//Lưu ý: Logic kiểm tra số nguyên tố tách thành 1 hàm khác. Có nghĩa sẽ có 2 hàm:

function isPrime(n) {
  if (n % 1 !== 0 || n <= 1) {
    return false;
  }
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}
function getTotalPrime(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    if (isPrime(i)) {
      total += i;
    }
  }
  return total;
}
console.log(`Tổng các số nguyên tố từ 1 đến 10 = ${getTotalPrime(10)}`);

//Bài 5:

//Bài6: Viết hàm in ra số chính phương trong khoảng từ 1 đến n.
function isCheckPerfectSquare(n) {
  if (n < 0) {
    return false;
  }
  for (let i = 1; i * i <= n; i++) {
    if (i * i === n) {
      return true;
    }
  }
  return false;
}
function isPerfectSquare(n) {
  for (let i = 1; i <= n; i++) {
    if (isCheckPerfectSquare(i)) {
      console.log(i);
    }
  }
}
isPerfectSquare(50);
