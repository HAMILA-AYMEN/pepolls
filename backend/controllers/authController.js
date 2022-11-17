const User = require("../models/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.PRIVATE_TOKEN, {
      expiresIn: maxAge
    })
  };

exports.signUp=async(req,res)=>{
    const {pseudo,email,password}=req.body
    try {
        // check user
        const checkuser=await User.findOne({email})
        if(checkuser){
            return res.status(401).json({errors:[{msg:"utilisateur existe déja"}]})
        }
        const user= new User({
            pseudo,email,password
        })
        user.password=await bcrypt.hash(password,10)
        await user.save()

        // generate token
     const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true,maxAge });
     

        res.status(200).json({user,msg:"utilisateur crée"})
    } catch (error) {
        res.status(500).send('server error')
    }
}

exports.signIn=async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({errors:[{msg:"bad credentials"}]})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({errors:[{msg:"bad credentials"}]})
        }

        // generate token
        const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true,maxAge });

        res.status(200).json({user,msg:"login with success"})
    } catch (error) {
        res.status(500).send('server error')
    }
}


exports.current = async(req, res) => {
  try {
    const user=await User.findById(req.user.id)
    res.send(user)
  } catch (error) {
    
  }
  }




exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}