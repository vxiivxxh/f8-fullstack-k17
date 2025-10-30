//In ra những từ có tổng chữ cái >=5
const words = ["javascript", "php", "css", "html", "python", "java"];
const longWords = [];
for (let i = 0; i < words.length; i++) {
  if (words[i].length >= 5) {
    longWords.push(words[i]);
  }
}
console.log(longWords);

//Viết hoa toàn bộ
const upperWords = [];
for (let i = 0; i < words.length; i++) {
  const upperWordsNew = words[i].toUpperCase();
  upperWords.push(upperWordsNew);
}
console.log(upperWords);

//Viết ngược từng chuỗi
const reversedWords = [];
for (let i = 0; i < words.length; i++) {
  const reversed = words[i].split("").reverse().join(""); // tách từng chữ riêng lẻ rồi đảo ngược và ghép lại vào chuỗi
  reversedWords.push(reversed);
}
console.log(reversedWords);
