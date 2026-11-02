import { createHash } from 'node:crypto';
import Session from '../models/Session.js';
import User from '../models/User.js';

export default async function requireAuth(req, res, next) {
  try {
    const authorization = req.get('Authorization') || '';
    const match = /^Bearer\s+(.+)$/i.exec(authorization);
    if (!match) return res.status(401).json({ message: 'Bearer token required: log in first' });

    const tokenHash = createHash('sha256').update(match[1]).digest('hex');
    const session = await Session.findOne({
      tokenHash,
      expiresAt: { $gt: new Date() }
    });
    if (!session) return res.status(401).json({ message: 'Token missing, expired, or logged out' });

    const user = await User.findById(session.user);
    if (!user) return res.status(401).json({ message: 'Account no longer exists' });

    req.userId = user._id;
    req.sessionId = session._id;
    next();
  } catch (error) {
    next(error);
  }
}
