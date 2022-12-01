const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema(
  {
    posterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
   
    
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    picture: {
      type: String,
    },
    video: {
      type: String,
    },
    likers: {
      type: [String]
      
    },
    comments:  {
      type: [{
      commenterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
      },
     
      commenterPseudo: String,
     
      text: String,
      timestamp: Number,
    }],
    required: true,
    }
  
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('post', PostSchema);
module.exports = Post;