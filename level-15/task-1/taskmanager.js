const fs = require("fs").promises;
const path = "tasks.json";

// Load tasks from JSON file
const loadTasks = async () => {
    try {
        const data = await fs.readFile(path, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Save tasks to JSON file
const saveTasks = async (tasks) => {
    await fs.writeFile(path, JSON.stringify(tasks, null, 2), "utf8");
};

// Add a new task
const addTask = async (title, description, status = "pending", dueDate = null) => {
    const tasks = await loadTasks();
    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        status,
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    };
    tasks.push(newTask);
    await saveTasks(tasks);
    console.log(`✅ Task added: ${title}`);
};

// List tasks with optional filtering
const listTasks = async (status = null, sortByDate = false) => {
    let tasks = await loadTasks();
    if (status) {
        tasks = tasks.filter(task => task.status === status);
    }
    if (sortByDate) {
        tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }
    console.log("\n📋 Task List:");
    tasks.forEach(task => {
        console.log(`${task.id}. ${task.title} - ${task.status} (Due: ${task.dueDate || "No due date"})`);
    });
};

// Update a task by ID
const updateTask = async (id, field, value) => {
    const tasks = await loadTasks();
    const task = tasks.find(t => t.id === parseInt(id));
    if (!task) return console.log("❌ Task not found");

    task[field] = value;
    await saveTasks(tasks);
    console.log(`✅ Task ${id} updated`);
};

// Delete a task by ID
const deleteTask = async (id) => {
    let tasks = await loadTasks();
    const newTasks = tasks.filter(task => task.id !== parseInt(id));
    if (tasks.length === newTasks.length) return console.log("❌ Task not found");
    
    await saveTasks(newTasks);
    console.log(`✅ Task ${id} deleted`);
};

// Command-line argument handling
const [,, command, ...args] = process.argv;
(async () => {
    switch (command) {
        case "add":
            await addTask(args[0], args[1], args[2], args[3]);
            break;
        case "list":
            await listTasks(args[0], args.includes("--sort"));
            break;
        case "update":
            await updateTask(args[0], args[1], args[2]);
            break;
        case "delete":
            await deleteTask(args[0]);
            break;
        default:
            console.log("❌ Invalid command. Use add, list, update, delete.");
    }
})();
