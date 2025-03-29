
let myString = "Hello, World!"; 
let myNumber = 42;               
let myBoolean = true;            
let myNull = null;             
let myUndefined;                 
let myObject = { name: "John", age: 25 }; // Object

// Printing the type of each variable
console.log("Type of myString:", typeof myString);
console.log("Type of myNumber:", typeof myNumber);
console.log("Type of myBoolean:", typeof myBoolean);
console.log("Type of myNull:", typeof myNull);  // Special case: typeof null is "object"
console.log("Type of myUndefined:", typeof myUndefined);
console.log("Type of myObject:", typeof myObject);

// Converting a string to a number
let stringNumber = "123";
let convertedNumber = parseInt(stringNumber);

console.log("Converted Number:", convertedNumber);
console.log("Type of convertedNumber:", typeof convertedNumber);
