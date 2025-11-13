const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1200 },
  { id: 2, name: "Phone", category: "Electronics", price: 800 },
  { id: 3, name: "Shirt", category: "Clothing", price: 40 },
  { id: 4, name: "Shoes", category: "Clothing", price: 60 },
  { id: 5, name: "Headphones", category: "Electronics", price: 150 },
];

//Lọc các  sản phẩm thuộc danh mục electronics

const filtered = products.filter((product) => product.category === "Electronics");
console.log("Sản phẩm Electronics:", filtered);

const total = filtered.reduce((sum, product) => sum + product.price, 0);

console.log("Tổng giá:", total);
