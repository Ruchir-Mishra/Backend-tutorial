import Post from '../models/Post.js';

export async function createPost(req, res) {
  const { title, content } = req.body || {};
  const post = await Post.create({ title, content, author: req.userId });
  res.status(201).json(post);
}

export async function getPosts(_req, res) {
  const posts = await Post.find().populate('author', 'name email').sort({ createdAt: -1 });
  res.json(posts);
}

export async function getPostById(req, res) {
  const post = await Post.findById(req.params.id).populate('author', 'name email');
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
}

export async function updatePost(req, res) {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  if (String(post.author) !== String(req.userId)) {
    return res.status(403).json({ message: 'You can edit only your own posts' });
  }

  const { title, content } = req.body || {};
  if (title !== undefined) post.title = title;
  if (content !== undefined) post.content = content;
  await post.save();
  res.json(post);
}

export async function deletePost(req, res) {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  if (String(post.author) !== String(req.userId)) {
    return res.status(403).json({ message: 'You can delete only your own posts' });
  }
  await post.deleteOne();
  res.json({ message: 'Post deleted successfully' });
}
