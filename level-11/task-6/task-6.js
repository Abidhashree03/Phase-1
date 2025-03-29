
let sumEvenNumbers = 0;
for (let i = 1; i <= 10; i++) {
    
    if (i % 2 === 0) {
        console.log(i); 
        sumEvenNumbers += i;  
    }
}
console.log("Sum of even numbers:", sumEvenNumbers);
