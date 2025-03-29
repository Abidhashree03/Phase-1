import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import contactRoutes from "./contactRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.use("/contacts", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
