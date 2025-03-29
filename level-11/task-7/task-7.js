
let favoriteFoods = ["Pizza", "Burger", "Pasta", "Sushi", "Tacos"];
favoriteFoods.push("Ice Cream");
favoriteFoods.shift();
let arrayLength = favoriteFoods.length;
let foodIndex = favoriteFoods.indexOf("Sushi");
let slicedFoods = favoriteFoods.slice(1, 4);

console.log("Original Array after modifications:", favoriteFoods);
console.log("Length of Array:", arrayLength);
console.log("Index of 'Sushi':", foodIndex);
console.log("Sliced Array (index 1 to 3):", slicedFoods);
