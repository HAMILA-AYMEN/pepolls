const User = require("../models/User")

exports.uploadProfil = async (req, res) => {
    console.log(req.file)
    try {
     await User.findByIdAndUpdate(req.user.id,{
      $set:{picture:req.file.filename}
    }
      
      )
      res.status(200).send('image uploaded')
      
    } catch (error) {
      res.status(500).send('server error')
    }
   
  };