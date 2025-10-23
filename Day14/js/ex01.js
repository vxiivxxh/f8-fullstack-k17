// console.log("Học JS không khó");
// Viết cmt 1 dòng

/*
Viết cmt nhiều dòng
Viết cmt nhiều dòng
Viết cmt nhiều dòng
Viết cmt nhiều dòng
*/

// Biến: Dùng Để lưu trữ giá trị tamj thời (ở RAM)
// Cú pháp: let tenbien hoặc let tenbien=giatri
/*Quy ước đặt tên biến:
-Chấp nhận: số, chữ thường, chữ hoa, gạch dưới và $
-KHông đc bđ bằng số
Chuẩn đặt tên:camelCase
Vd: UserID, customerName, userShippingAddress,...
userEmail, username
*/
// Lưu ý: Khi cùng 1 phạm vi, Không đc khai báo lại biến
/*vd:
let a = 10;
let b;
let c = "An";
console.log(a);
console.log(b);
console.log(c);
*/

// let userID = 10;
// let customer;
// let customerName;

// userID = 30;

/*
Hằng số:
Quy tắc đặt tên giống như biến
Cú pháp: const tenhang = giatri;
Nếu hằng số đã xác định trc --> Đặt tên hằng là chữ hoa và nối bằng gạch dưới

*/
//vd:
// const fullname = "Thành Vinh";

// const TIMEOUT = 1000;
// const BASE_URL= "https://nerdcave.com/tailwind-cheat-sheet"

// for(let i=1; i<=5; i++){
//     const sqrValue= i*1;
//     console.log(sqrValue);
// }

/*Nối biến vào 1 chuỗi ký tự. Vd:
const company = "F8";
 const output = "Học lập trình tại" + company + "không khó";
//Thay bằng
const output = `Học lập trình tại ${company} không khó`;
console.log(output);
*/

/*Danh sách các kiểu dữ liệu
1.number
2.string
3.boolean
4.null
5.underfined
6.symbol
7.bigint
8.object
*/
//Vd:
// const user = {
//   name: "Thành Vinh",
//   email: "thanhvinh.k3@gmail.com",
// };
// console.log(user);
// const users = ["User 1", "User 2"];
// console.log(users);

/*
Cách kiểm tra kiểu dữ liệu
Dùng từ khoá typeof dulieu
*/
//vd:
// let age = 35;
// let fullname = "Thành Vinh";
// let customer = null;
// console.log(typeof age);
// console.log(typeof fullname);
// console.log(typeof customer);

/*Toán tử và biểu thức
Biểu thức = toán tử + toán hạng

1. Toán tử số học
+,-,*,/
**: luỹ thừa, %: chia lấy dư, ++:Tăng lên 1 đơn vị, --:Giảm đi 1 đơn vị 
*/
//vd:
// let a = "10";
// let b = 5;
// // a = Number(a); // Ép biến a thành number
// let total = a + b;
// console.log(total);

// let result = a ** b;
// console.log(result);

let count = 1;
// count++;
// ++count;
// count--;
// --count;
// console.log(count);

let total = count++ + ++count;
(count = count + 1) - 1
count = count + 1

console.log(`count`, count);
console.log(`total`, total);

let salePrice = 560000;
let saleRate = 15;
//Tính giá gốc
let price = salePrice /(100-saleRate) *100
console.log(price);


