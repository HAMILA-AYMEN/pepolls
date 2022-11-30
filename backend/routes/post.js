const express=require('express')
const router=express.Router()
const { requireAuth } = require('../middleware/authMiddleware')
const { readPost,createPost,updatePost,deletePost,likePost,unlikePost,commentPost,editCommentPost,deleteCommentPost} = require('../controllers/postController')
const upload=require('../middleware/uploads')


router.get('/',readPost);
router.post('/', requireAuth,upload.single("file"), createPost);
router.put('/:id',requireAuth, updatePost);
router.delete('/:id',requireAuth, deletePost);
router.patch('/like-post/:id',requireAuth, likePost);
router.patch('/unlike-post/:id',requireAuth, unlikePost);


router.patch('/comment-post/:id',requireAuth, commentPost);
router.patch('/edit-comment-post/:id',requireAuth, editCommentPost);
router.delete('/delete-comment-post/:id',requireAuth, deleteCommentPost);





module.exports = router;