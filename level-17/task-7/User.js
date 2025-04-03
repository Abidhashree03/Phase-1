const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isActive: { type: Boolean, default: true }
});

// Pre-save hook to hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Post-save hook to log when a new user is created
userSchema.post('save', function (doc) {
  console.log(`New user created: ${doc.email}`);
});

// Pre-find hook to exclude inactive users
userSchema.pre(/^find/, function (next) {
  this.where({ isActive: true });
  next();
});

// Instance method to generate a profile object
userSchema.methods.generateProfile = function () {
  return {
    name: this.name,
    email: this.email
  };
};

// Static method to find users by email domain
userSchema.statics.findByEmailDomain = function (domain) {
  return this.find({ email: new RegExp(`@${domain}$`, 'i') });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
