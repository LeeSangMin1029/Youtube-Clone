import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    google_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    image_url: { type: String, required: true },
    accepted: { type: Date, default: Date.now },
    locale: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
