const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const app = express();
app.use(express.json());

const SECRET_KEY = "your_secret_key";

// 🚀 1. Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/auth_system", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 🚀 2. Define User Schema & Model
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  resetToken: { type: String, default: null }
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);

// 🚀 3. Middleware for Authentication & Role-Based Access
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access Denied" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid Token" });
  }
};

const roleMiddleware = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Forbidden: Access Denied" });
  }
  next();
};

// 🚀 4. Register Route
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🚀 5. Login Route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// 🚀 6. Get User Profile (Protected)
app.get("/api/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// 🚀 7. Admin-Only Route
app.get("/api/admin/dashboard", authMiddleware, roleMiddleware(["admin"]), (req, res) => {
  res.json({ message: "Welcome, Admin!" });
});

// 🚀 8. Refresh Token
app.post("/api/refresh-token", authMiddleware, (req, res) => {
  const newToken = jwt.sign({ id: req.user.id, role: req.user.role }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token: newToken });
});

// 🚀 9. Forgot Password (Generate Reset Token)
app.post("/api/forgot-password", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetToken = resetToken;
  await user.save();

  // In real applications, send this token via email.
  res.json({ message: "Reset token generated", resetToken });
});

// 🚀 10. Reset Password
app.post("/api/reset-password", async (req, res) => {
  const user = await User.findOne({ resetToken: req.body.token });
  if (!user) return res.status(400).json({ error: "Invalid or expired token" });

  user.password = await bcrypt.hash(req.body.newPassword, 10);
  user.resetToken = null;
  await user.save();

  res.json({ message: "Password updated!" });
});

// 🚀 11. Start Server
app.listen(3000, () => console.log("Server running on port 3000"));
