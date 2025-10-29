//Bài 1: 
const fibonacci = (n) => {
  if (n <= 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
};
const getTotalFibonacci = (n) => {
  if (n <= 0) {
    return 0;
  }
  let total = 0;
  for (let i = 0; i < n; i++) {
    total += fibonacci(i);
  }
  return total;
};
console.log(`Tổng n số fibonacci đầu tiên = ${getTotalFibonacci(10)}`);

//Bài 2:
function isTriange(a, b, c) {
  if (a <= 0 || b <= 0 || c <= 0) {
    return false;
  }
  if (a + b > c && a + c > b && b + c > a) {
    return true;
  }
  return false;
}
console.log(isTriange(3, 4, 5));

//Bài 3:
const calcBMI = (weight, height) => {
  if (weight <= 0 || height <= 0) {
    return "Dữ liệu không hợp lệ";
  }

  let BMI = weight / (height * height);

  if (BMI < 18.5) {
    return "Thiếu cân";
  }
  if (BMI >= 18.5 && BMI < 23) {
    return "Bình thường ";
  }
  if (BMI >= 23 && BMI < 25) {
    return "Thừa cân";
  }
  return "Béo phì";
};
console.log(calcBMI(74, 1.8));

//Bài 4: Bài này thì em vẫn chưa nghĩ đc ạ bài này vs bài 6 theo em nghĩ thì nó na ná nhau
// let fullname = "tạ hoàng an";
// fullname=fullname.charAt(0).toUpperCase()+fullname.slice(1);

//Bài 5:
const isAllUpperCase = (str) => {
  if (typeof str !== "string" || str.length === 0) {
    return false;
  }
  const upperStr = str.toUpperCase();
  const isAllUpper = str === upperStr; // So sánh 2 chuỗi  xem chuỗi gốc có giống chuỗi viết hoa k
  return isAllUpper;
};
console.log(isAllUpperCase("VINH"));

//Bài 6:
