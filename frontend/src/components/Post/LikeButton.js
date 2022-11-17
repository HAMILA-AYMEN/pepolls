import React, {  useEffect, useState } from "react";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch,useSelector } from "react-redux";
import { likePost, unlikePost } from "../../redux/postSlice";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const auth = useSelector((state) => state.auth.auth)
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost({posterId:post._id,auth}))
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(post._id, auth))
    setLiked(false);
  };

  useEffect(() => {
    if (post.likers.includes(auth)) setLiked(true);
    else setLiked(false);
  }, [auth, post.likers, liked]);

  return (
    <div className="like-container">
      {auth === null && (
        <Popup
          trigger={<img src="./images/icons/heart.svg" alt="like" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour aimer un post !</div>
        </Popup>
      )}
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
