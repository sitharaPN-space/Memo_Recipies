import express from 'express';

import { getPosts } from '../controllers/posts.js';
import { createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);   // patch is for updates 
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
export default router;