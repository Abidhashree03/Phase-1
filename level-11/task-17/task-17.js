
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const combinedArray = [...array1, ...array2];
console.log("Combined Array:", combinedArray);

const copiedArray = [...array1]; 
copiedArray.push(10);
console.log("Original Array:", array1);
console.log("Modified Copy:", copiedArray);


const object1 = { name: "Abi", age: 25 };
const object2 = { city: "cbe", country: "india" };


const combinedObject = { ...object1, ...object2 };
console.log("Combined Object:", combinedObject);


const copiedObject = { ...object1 };
copiedObject.age = 30;
console.log("Original Object:", object1);
console.log("Modified Copy:", copiedObject);
