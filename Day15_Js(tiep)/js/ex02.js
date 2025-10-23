//Câu lệnh rẽ nhánh
/*
if (dieukien) {
    Khoi_lenh
}

if (dieukien) {
    Khoi_lenh_dung
} else {
    Khoi_lenh_sai
}

if (dieukien1) {
    Khoi_lenh_1

} else if(dieukien2){
    Khoi_lenh_2
} else if(diekien3){
    Khoi_lenh_3
} else(dieukien4) {
    Khoi_lenh_4
}
*/

// let age = 60;
// if (age < 0) {
//   console.log("Không hợp lệ");
// } else if (age < 3) {
//   console.log("Trẻ sơ sinh");
// } else if (age < 5) {
//   console.log("Trẻ em");
// } else if (age < 15) {
//   console.log("Trẻ dưới vị thành niên");
// } else if (age < 18) {
//   console.log("Thanh niên");
// } else if (age < 35) {
//   console.log("Trung niên");
// } else {
//   console.log("Người già");
// }

//Bài tập 1: Tính lương thực nhận của nhân viên sau khi trừ thuế
/*
-Lương <=5tr -->0%
-LƯơng >6tr và <=10tr --> 3%
-Lương >11tr và <=20tr --> 5%
-Lương >21tr --> 7%

Yêu cầu:
-Công thức hoá
*/
let salary = 6000000;
let income;
let tax;
if (salary > 0) {
} else if (salaray <= 500000) {
  tax = 0;
} else if (salary <= 10000000) {
  tax = 3;
} else if (salary <= 20000000) {
  tax = 5;
}
else{
    tax=7;
}


//Bài tập: Tính tiền taxi khi biết số km
// – Số km <= 1: Giá 15.000
// – 1 < số km <= 5: Giá 13.500
// – Số km > 5: Giá 11.000
// – Số km > 120: Giảm 10% trên tổng tiền

//Ví dụ: Đi 6km
//Số tiền phải trả = 1*15000 + 4*13500 + 1*11000
// const PRICE_1 = 15000;
// const PRICE_2 = 13500;
// const PRICE_3 = 11000;
// const DISCOUNT = 10;
// const DISTANT_1 = 1;
// const DISTANT_2 = 5;
// const DISTANT_3 = 120;
// let km;
// let total = 0;
// if (DISTANT_1 > 0) {
//   console.log("Không hợp lệ");
// } else if (km <= DISTANT_1) {
//   total = PRICE_1;
// } else if (km <= DISTANT_2) {
//   total = PRICE_1 + (DISTANT_2 - DISTANT_1) * PRICE_2;
// } else {
//   total =
//     PRICE_1 + (DISTANT_2 - DISTANT_1) * PRICE_2 + (km - DISTANT_2) * PRICE_3;
//   if (km > DISTANT_3) {
//     total = total - (total * DISCOUNT) / 100;
//   }
// }

// console.log(total);


//Câu lệnh switch case
//-Chỉ chấp nhận so sánh===
// const action="update";
// switch (action){
//     case "create":
//     case "insert":
//     case "add":
//         console.log("Thêm mới");
//         break;
//     case"update":
//     case"edit":
//         console.log("Cập nhật");
//         break;
//     case"delete":
//     case "remove":
//         console.log("Xoá");
//         break;
//     default:
//         console.log("Không hợp lệ");
//         break;
// }

//Bài tập :Viết lại đoạn trên bằng if else

if(create, insert, add){
 console.log("Thêm mới");
}else if(update, edit){
    console.log("Cập nhật");
}else if(delete, remove){
    console.log("Xoá");
}else{
    console.log("Không hợp lệ");
}
