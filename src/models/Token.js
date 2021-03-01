import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    refresh_token: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const Token = mongoose.model('Token', tokenSchema);
export default Token;
