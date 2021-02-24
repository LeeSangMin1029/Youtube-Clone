import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  profile_id: String,
  email: String,
  locale: String,
  name: String,
  refresh_token: String,
});

const User = mongoose.model('User', userSchema);
export default User;
