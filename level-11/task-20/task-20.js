
function operateOnArray(arr, operation) {
    return arr.map(operation);
}

function double(num) {
    return num * 2;
}


function square(num) {
    return num * num;
}

function toString(num) {
    return num.toString();
}


const numbers = [1, 2, 3, 4, 5];


const doubledArray = operateOnArray(numbers, double);
const squaredArray = operateOnArray(numbers, square);
const stringArray = operateOnArray(numbers, toString);

console.log("Original Array:", numbers);
console.log("Doubled Array:", doubledArray);
console.log("Squared Array:", squaredArray);
console.log("String Array:", stringArray);
