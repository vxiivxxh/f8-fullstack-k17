const arr = [
    [1, 2, 3],
    [4, 5, 6],
  ];
  const count = arr.flat().filter(num => num % 2 === 0).length;
  console.log(count);