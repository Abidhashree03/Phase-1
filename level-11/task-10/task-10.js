
const firstName = "Abidha";
const lastName = "Shree";
const age = 20;


const sentence = `Hello, my name is ${firstName} ${lastName} and I am ${age} years old.`;

const multiLineText = `
Welcome to the JavaScript demo!
In 5 years, ${firstName} will be ${age + 5} years old.
`;
const ageMessage = `${firstName} is ${age >= 18 ? "an adult" : "a minor"}.`;

console.log(sentence);
console.log(multiLineText);
console.log(ageMessage);
