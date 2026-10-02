import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    points: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

export default model('User', userSchema);
