const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    commenterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
   
    commenterPseudo: String,
   
    text: String,
    timestamp: Number,
  }

)
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
    comments: [CommentSchema]
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('post', PostSchema);
module.exports = Post;