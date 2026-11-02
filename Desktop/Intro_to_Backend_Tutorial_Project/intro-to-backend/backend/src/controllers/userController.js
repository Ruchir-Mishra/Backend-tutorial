import bcrypt from 'bcrypt';
import { randomBytes, createHash } from 'node:crypto';
import User from '../models/User.js';
import Session from '../models/Session.js';

export async function register(req, res) {
  const { name, email, password } = req.body || {};
  if (typeof name !== 'string' || !name.trim() ||
      typeof email !== 'string' || !email.trim() ||
      typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ message: 'Provide name, email and password (8+ characters)' });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, passwordHash });
  res.status(201).json({
    message: 'Registered successfully',
    user: { id: user.id, name: user.name, email: user.email }
  });
}

export async function login(req, res) {
  const { email, password } = req.body || {};
  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'Email and password required' });
  }

  const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+passwordHash');
  const correctPassword = user ? await bcrypt.compare(password, user.passwordHash) : false;
  if (!correctPassword) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = randomBytes(32).toString('hex');
  const tokenHash = createHash('sha256').update(token).digest('hex');
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await Session.create({ user: user._id, tokenHash, expiresAt });

  res.json({
    message: 'Logged in successfully', token, expiresAt,
    user: { id: user.id, name: user.name, email: user.email }
  });
}

export async function me(req, res) {
  const user = await User.findById(req.userId);
  res.json({ user: { id: user.id, name: user.name, email: user.email } });
}

export async function logout(req, res) {
  await Session.findByIdAndDelete(req.sessionId);
  res.json({ message: 'Logged out successfully' });
}
