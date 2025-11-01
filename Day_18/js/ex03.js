const nums = [3, 7, 2, 9, 12, 15, 18];

//Lấy ra mảng mới chỉ chứa số lớn hơn hoặc bằng 10.
const bigNumber = [];
for (let i = 0; i < nums.length; i++) {
  if (nums[i] >= 10) {
    bigNumber.push(nums[i]);
  }
}
console.log(bigNumber);
const bigNumberDivisible = [];
//Từ mảng mới trên, tạo mảng chỉ chứa số chia hết cho 3.

for (let i = 0; i < bigNumber.length; i++) {
  if (bigNumber[i] % 3 === 0) {
    bigNumberDivisible.push(bigNumber[i]);
  }
}
console.log(bigNumberDivisible);

//Với mảng ban đầu, tạo mảng mới tăng gấp đôi nhưng chỉ giữ lại số lẻ.
const oddDouble = [];
for (let i = 0; i < nums.length; i++) {
  if (num[i] % 2 !== 0) {
    oddDouble.push(num[i] * 2);
  }
}
console.log(oddDouble);
