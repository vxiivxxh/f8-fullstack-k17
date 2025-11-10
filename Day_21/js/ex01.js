const users = [
  { name: "An", age: 25 },
  { name: "Bình", age: 30 },
  { name: "Chi", age: 22 },
];

//In ra tên tất cả người dùng
users.forEach((user) => console.log(user.name));
//forEach là duyệt qua từng phần tử trong mảng và thực hiện hành động (như in, tính tổng,...) không quan tâm đến index

// Tìm người có số tuổi lớn nhất
const maxUser = users.reduce((acc, cur) => (acc.age < cur.age ? cur : acc));
const result = maxUser.name;
console.log(`Nguòi có số tuổi cao nhất là: ${result}`);

//Tính trung bình
const getAvg = (arr) => {
  let total = 0;
  for (let user of users) {
    total += user.age;
  }
  let avg = total / arr.length;
  return avg.toFixed(2);
};
console.log(getAvg(users));

// //cách2: dùng reduce
// //Trình bày: tính trung bình = tổng / số người
// const isAvg2 = users.reduce((acc, cur) => (acc += cur.age) , 0)/ users.length;
// console.log(isAvg2.toFixed(2));
