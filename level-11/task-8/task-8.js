
let person = {
    name: "Abi",
    age: 20,
    city: "cbe",
    hobbies: ["singing", "Cycling", "Gaming"]
};

console.log("Name:", person.name);
console.log("Age:", person.age);
console.log("City:", person.city);
console.log("Hobbies:", person.hobbies.join(", "));

person.job = "Software Developer";

person.age = 26;

person.greet = function() {
    return `Hello, my name is ${this.name} and I live in ${this.city}.`;
};


console.log(person.greet());

console.log("Updated Person Object:", person);
