const employees = [
  { id: 1, name: "Mai", department: "IT", salary: 1200 },
  { id: 2, name: "Nam", department: "HR", salary: 800 },
  { id: 3, name: "Hà", department: "IT", salary: 1500 },
  { id: 4, name: "Linh", department: "Marketing", salary: 900 },
  { id: 5, name: "Phúc", department: "IT", salary: 1100 },
];

//Tính tổng lương của từng phòng
const totalSalary = employees.reduce((acc, emp) => {
  if (!acc[emp.department]) {
    acc[emp.department] = 0;
  }
  acc[emp.department] += emp.salary;
  return acc;
}, {});

console.log(totalSalary);
