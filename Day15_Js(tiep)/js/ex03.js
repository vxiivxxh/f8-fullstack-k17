//Vòng lặp
//- Cú pháp trong lập trình
//- Cho phép đoạn chương trình chạy lặp đi lặp lại theo số lần nhất định

//1. Vòng lặp với số lần lặp xác định trước:for
//2. Vòng lặp với số lần lặp khôngn xác định trước: while, do while

/*
for (giatrikhoitao; dieukienchay; buocnhay) {
    Khoilenh
}
*/
// for(i=1; i<=6; i++){
//     console.log("Xin chào F8",i);
// }

// for (let i=5; i>=1; i--){
//     console.log(i);
// }

// for(let i=1; i<=5; i++){
//     for(let j=1; j<=5; j++){
//         console.log(`i=${i}`,`j=${j}`);
//     }
// }

//Ví dụ: S= 1+2+3+4+5+...+n

// let n = 10;
// let total = 0;

// for (let i = 1; i <= n; i++) {
//   total += i;
// }
// console.log(total);

//Bài tập: Tính n! = 1*2*3*4*...*n
// let n = 10;
// let factorial = 1;
// for (let i = 1; i <= n; i++) {
//   factorial *= i;
// }
// console.log(factorial);

//Bài tập:
//S= 1+ 1*2+ 1*2*3+...+1*2*3*...*n
let n = 5;
let factorial = 1;
let total = 0;
for (let i = 1; i <= n; i++) {
  factorial *= 1;
  total += factorial;
}
console.log(total);
