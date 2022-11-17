const express=require('express')
const router=express.Router()
const { signUp, signIn, logout,current} = require('../controllers/authController')
const { requireAuth } = require('../middleware/authMiddleware')
const { registerRules,validator, loginRules } = require('../middleware/validator')




// create new user and generate token
router.post('/register',registerRules,validator,signUp)
router.post('/login',loginRules,validator,signIn)
router.get('/current',requireAuth,current)

router.get("/logout", logout);



module.exports = router;