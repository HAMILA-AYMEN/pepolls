import React, {  useEffect, useState } from "react";


import { useDispatch,useSelector } from "react-redux";
import { getPosts, likePost, unlikePost } from "../../redux/postSlice";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const auth = useSelector((state) => state.auth.auth)
  const authData = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost({postId:post._id,posterId: authData._id}))
    dispatch(getPosts())
    setLiked(true);
   
  };

  const unlike = () => {
    dispatch(unlikePost({postId:post._id,posterId: authData._id}))
    dispatch(getPosts())
    setLiked(false);
  };

  useEffect(() => {
    if (post.likers.includes(authData._id)) setLiked(true);
    else setLiked(false);
  }, [authData._id, post.likers, liked]);

  return (
    <div className="like-container">
    
        
       {console.log(liked)}
         
       
      
      {auth && liked === false && (
        <img src="./images/icons/heart.svg" onClick={like} alt="like" />
      )}
      {auth && liked && (
        <img src="./images/icons/heart-filled.svg" onClick={unlike} alt="unlike" />
      )}
      <span>{post.likers.length}</span>
    </div>
  );
};

export default LikeButton;
