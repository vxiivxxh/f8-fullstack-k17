const products = [
  { name: "Laptop", price: 15000000 },
  { name: "Mouse", price: 250000 },
  { name: "Keyboard", price: 800000 },
];

//Tạo mảng mới và chỉ trả về tên sản phẩm
const names = products.map((product) => product.name);
console.log(names);
//map thì là tạo mảng mới từ mảng cũ và không thay đổi mảng gốc
//push thì là thêm phần tử vào mảng hiện tại, thay đổi mảng gốc vaf trả về độ dài mảng

//Tính tổng giá trị các sản phẩm
const totalPrice = products.reduce((acc, cur) => (acc += cur.price), 0);
console.log(totalPrice);
//,0 để đặt giá trị ban đầu của acc là 0. Nếu không có 0 thì nó bị lỗi nên để 0
//reduce() dùng để gộp  toàn bộ mảng lại thành một giá trị duy nhất( chuỗi, mảng, số, object)

//Lọc ra sản phẩm có giá lớn hơn 1 triệu.
const expProduct = products.filter((acc) => acc.price > 1000000);
const result = expProduct.map((product) => product.name);
console.log(result);
