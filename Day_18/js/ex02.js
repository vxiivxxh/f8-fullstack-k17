const names = [" hoang ", "AN", " f8 ", "Education"];
const lowerCaseNames = [];
for (let i = 0; i < names.length; i++) {
  lowerCaseNames.push(names[i].trim().toLowerCase());
}
console.log(lowerCaseNames);

const upperFirstCharName = [];
for (let i = 0; i < names.length; i++) {
  const trimmedName = names[i].trim();
  const upperFirstCharNames =
    trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1).toLowerCase();
  upperFirstCharName.push(upperFirstCharNames);
}
console.log(upperFirstCharName);

