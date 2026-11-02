import { Router } from 'express';
import {
  createPost, getPosts, getPostById, updatePost, deletePost
} from '../controllers/postController.js';
import requireAuth from '../middleware/requireAuth.js';

const router = Router();
router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', requireAuth, createPost);
router.put('/:id', requireAuth, updatePost);
router.delete('/:id', requireAuth, deletePost);

export default router;
