
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


const squaredNumbers = numbers.map(num => num ** 2);

const oddNumbers = numbers.filter(num => num % 2 !== 0);

const sum = numbers.reduce((accumulator, num) => accumulator + num, 0);

console.log("Number | Square Root");
numbers.forEach(num => {
    console.log(`${num}     | ${Math.sqrt(num).toFixed(2)}`);
});

console.log("Original Array:", numbers);
console.log("Squared Numbers:", squaredNumbers);
console.log("Odd Numbers:", oddNumbers);
console.log("Sum of All Numbers:", sum);
