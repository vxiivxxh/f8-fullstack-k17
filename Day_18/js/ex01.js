const arr = [1, 2, 3, 4, 5, 6];

//mảng mới chứa bình phương của từng phần tử.


// mảng mới chứa các số chẵn trong mảng.
const evenNum=[];
for(let i=0; i<arr.length;i++){
    if(arr[i]%2 ===0 ){
        evenNum.push(arr[i]);
    }
}
console.log(evenNum);
