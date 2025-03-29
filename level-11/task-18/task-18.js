// Array of student objects
const students = [
    { name: "Abi", age: 22, grades: [85, 90, 78] },
    { name: "Barni", age: 19, grades: [70, 75, 80] }
];

// 1️⃣ Use map() to create an array of student names
const studentNames = students.map(student => student.name);
console.log("Student Names:", studentNames);

// 2️⃣ Use filter() to find students older than 20
const olderStudents = students.filter(student => student.age > 20);
console.log("Students older than 20:", olderStudents);

// 3️⃣ Use reduce() to find the average grade of all students
const totalGrades = students.reduce((sum, student) => 
    sum + student.grades.reduce((a, b) => a + b, 0) / student.grades.length, 0);

const avgGradeAll = totalGrades / students.length;
console.log("Average Grade of All Students:", avgGradeAll.toFixed(2));

// 4️⃣ Chain multiple methods to find the average grade of students older than 20
const avgGradeOlderStudents = students
    .filter(student => student.age > 20)  // Filter students older than 20
    .map(student => student.grades.reduce((a, b) => a + b, 0) / student.grades.length) // Get average grade of each
    .reduce((sum, grade, _, arr) => sum + grade / arr.length, 0); // Compute overall average

console.log("Average Grade of Students Older than 20:", avgGradeOlderStudents.toFixed(2));
