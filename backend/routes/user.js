const express=require('express')
const router=express.Router()
const { userInfo ,updateUser,deleteUser,follow, unfollow, getAllUsers, getUsersToFollow} = require('../controllers/userController')
const {uploadProfil}=require('../controllers/uploadController')
const upload=require('../middleware/uploads')
const {requireAuth}=require('../middleware/authMiddleware')



router.get('/', getAllUsers);
router.get('/users-to-follow',requireAuth, getUsersToFollow);
router.get('/:id',requireAuth,userInfo);
router.put('/update/:id',requireAuth,updateUser);
router.delete('/:id',requireAuth,deleteUser)
router.patch('/follow/:id',requireAuth,follow)
router.patch('/unfollow/:id',requireAuth,unfollow)

// update image profil
router.put('/uploadimage',upload.single("file"),requireAuth,uploadProfil)

module.exports = router;