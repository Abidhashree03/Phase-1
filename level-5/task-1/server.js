require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  mongoose.connect("mongodb://127.0.0.1:27017/task_manager")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Define Mongoose Schema
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  dueDate: String,
});

// Explicitly set the collection name to "task_details"
const Task = mongoose.model("Task", TaskSchema, "task_details");

app.get('/', (req, res) =>{
    StudModel.find({})
    .then(stud => res.json(stud))
    .catch(err => res.json(err))
})

app.get("/getUser/:id", (req, res) =>{
    const id = req.params.id;
    StudModel.findById({_id:id})
    .then(stud => res.json(stud))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    StudModel.findByIdAndUpdate({_id: id}, {
        name: req.body.name,
        age: req.body.age,
        stud: req.body.stud
    })
    .then(stud => res.json(stud))
    .catch(err => res.json(err))
})

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    StudModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})


app.post('/stud', (req, res) => {
     StudModel.create(req.body)
     .then(stud => res.json(stud))
     .catch(err => res.json(err))
})



app.listen(3001, () => {
    console.log("server is running")
})



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
