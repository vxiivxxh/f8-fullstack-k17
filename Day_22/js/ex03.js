const orders = [
  {
    orderId: 101,
    customer: "John",
    items: [{ name: "Laptop", price: 1000, quantity: 1 }],
  },
  {
    orderId: 102,
    customer: "Alice",
    items: [
      { name: "Phone", price: 500, quantity: 2 },
      { name: "Charger", price: 50, quantity: 3 },
    ],
  },
  {
    orderId: 103,
    customer: "Bob",
    items: [{ name: "Headphones", price: 200, quantity: 2 }],
  },
];
//Tính tổng tiền của từng đơn hàng.
const calculateOrder = (arr) =>
  arr.map((order) =>
    order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
console.log(calculateOrder(orders));
