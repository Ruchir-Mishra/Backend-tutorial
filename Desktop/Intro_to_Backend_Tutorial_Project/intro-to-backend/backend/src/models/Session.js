import mongoose from 'mongoose';

// Sessions let login/logout actually work; Postman sends the token as a Bearer token.
const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tokenHash: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true, expires: 0 }
}, { timestamps: true });

export default mongoose.model('Session', sessionSchema);
