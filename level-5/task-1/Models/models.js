const mongoose = require('mongoose')

const StudSchema = new mongoose.Schema({
    name: String,
    age: Number,
    stud: Number
})

const StudModel = mongoose.model("studdetails", StudSchema)
module.exports = StudModel