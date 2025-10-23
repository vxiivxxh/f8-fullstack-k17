//Bài 1:
let age = 22;
const output = `Tôi năm nay ${age} tuổi`;
console.log(output);

//Bài 2:
const PI = 3.14159;
let r = 5;
let area = PI * r * r;
console.log("Diện tích hình tròn là", area);

//Bài 3:
let a = 7;
let b = 3;
let sum = a + b;
let difference = a - b;
let product = a * b;
let quotient = a / b;
let remainder = a % b;
console.log("Tổng 2 số là:", sum);
console.log("Hiệu 2 số là:", difference);
console.log("Tích của 2 số là:", product);
console.log("Thương của 2 số là:", quotient);
console.log("Phần dư của phép chia 2 số là:", remainder);

//Bài 4:
let name = "";
let defaultName = "Khách";
let displayName;
if (name) {
  displayName = name;
} else {
  displayName = defaultName;
}
console.log(displayName);

//Bài 5:
let age1 = 18;
let hasLicense = true;
if (age1 >= 18 && hasLicense) {
  console.log("Đủ điều kiện");
} else {
  console.log("Không đủ điều kiện");
}

//Bài 6:
let username = "";
let password = "1";
let valid = Boolean(username && password);
console.log(valid);

//Bài 7:
let salePrice = 70000;
let regularPrice = 100000;
let discountPercentage = ((regularPrice - salePrice) / regularPrice) * 100;
console.log("Giảm", discountPercentage + "%");

//Bài 8:
let a2 = 2;
let b2 = 4;
a2 =a2+b2;//6
b2= a2-b2;//2
a2=a2-b2;//4
console.log("a=", a2);
console.log(`b=${b2}`);

//Bài 9:
