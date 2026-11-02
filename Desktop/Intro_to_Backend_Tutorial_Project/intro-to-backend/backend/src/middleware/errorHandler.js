export default function errorHandler(error, _req, res, _next) {
  if (error.code === 11000) {
    return res.status(409).json({ message: 'Email or unique value already exists' });
  }
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({ message: error.message });
  }
  if (error.type === 'entity.parse.failed' || (error instanceof SyntaxError && error.status === 400)) {
    return res.status(400).json({ message: 'Invalid JSON request body' });
  }
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
