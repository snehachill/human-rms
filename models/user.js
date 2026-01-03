import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: false }, // "select: false" hides it from queries by default
  role: { 
    type: String, 
    enum: ["admin", "employee"], 
    default: "employee" 
  },
  // Basic Profile details requested in spec [cite: 56, 57]
  department: { type: String },
  designation: { type: String },
  salary: { type: Number, default: 0 }, // For payroll visibility [cite: 96]
  joinedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const User = mongoose.models?.User || mongoose.model("User", UserSchema);