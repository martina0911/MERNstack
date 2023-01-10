import express from 'express';
import { createPost, DeletePost, getPost, getTimelinePosts, likePost, UpdatePost } from '../Controllers/PostController.js';

const router = express.Router();

router.post('/', createPost)
router.get('/:id', getPost)
router.put('/:id', UpdatePost)
router.delete('/:id', DeletePost)
router.put('/:id/like', likePost)
router.get('/:id/timeline', getTimelinePosts)

export default router;