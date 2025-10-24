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
a2 = a2 + b2; //6
b2 = a2 - b2; //2
a2 = a2 - b2; //4
console.log("a=", a2);
console.log(`b=${b2}`);

//Bài 9:
let monthlyKWh = 150;
let totalBill = 0;

const TIER_1_KWH = 50;
const TIER_2_KWH = 100;
const TIER_3_KWH = 200;
const TIER_4_KWH = 300;
const TIER_5_KWH = 400;

const RATE_TIER_1 = 1.678;
const RATE_TIER_2 = 1.734;
const RATE_TIER_3 = 2.014;
const RATE_TIER_4 = 2.536;
const RATE_TIER_5 = 2.834;
const RATE_TIER_6 = 2.927;

if (monthlyKWh <= TIER_1_KWH) {
  totalBill = monthlyKWh * RATE_TIER_1;
} else if (monthlyKWh > TIER_1_KWH && monthlyKWh <= TIER_2_KWH) {
  totalBill =
    TIER_1_KWH * RATE_TIER_1 + (monthlyKWh - TIER_1_KWH) * RATE_TIER_2; //150-50 *1.734
} else if (monthlyKWh > TIER_2_KWH && monthlyKWh <= TIER_3_KWH) {
  totalBill =
    TIER_1_KWH * RATE_TIER_1 +
    (TIER_2_KWH - TIER_1_KWH) * RATE_TIER_2 +
    (monthlyKWh - TIER_2_KWH) * RATE_TIER_3; //50*1.678+50*1.734+50*2.014
} else if (monthlyKWh > TIER_3_KWH && monthlyKWh <= TIER_4_KWH) {
  totalBill =
    TIER_1_KWH * RATE_TIER_1 +
    (TIER_2_KWH - TIER_1_KWH) * RATE_TIER_2 +
    (TIER_3_KWH - TIER_2_KWH) * RATE_TIER_3 +
    (monthlyKWh - TIER_3_KWH) * RATE_TIER_4;
} else if (monthlyKWh > TIER_4_KWH && monthlyKWh <= TIER_5_KWH) {
  totalBill =
    TIER_1_KWH * RATE_TIER_1 +
    (TIER_2_KWH - TIER_1_KWH) * RATE_TIER_2 +
    (TIER_3_KWH - TIER_2_KWH) * RATE_TIER_3 +
    (TIER_4_KWH - TIER_3_KWH) * RATE_TIER_4 +
    (monthlyKWh - TIER_4_KWH) * RATE_TIER_5;
} else {
  totalBill =
    TIER_1_KWH * RATE_TIER_1 +
    (TIER_2_KWH - TIER_1_KWH) * RATE_TIER_2 +
    (TIER_3_KWH - TIER_2_KWH) * RATE_TIER_3 +
    (TIER_4_KWH - TIER_3_KWH) * RATE_TIER_4 +
    (TIER_5_KWH - TIER_4_KWH) * RATE_TIER_5 +
    (monthlyKWh - TIER_5_KWH) * RATE_TIER_6;
}
console.log(`Số tiền phải đóng hàng tháng là ${totalBill} đồng`);

//Bài 10:
let n=10;