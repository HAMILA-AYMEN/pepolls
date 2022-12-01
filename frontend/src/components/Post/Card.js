import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
import LikeButton from "./LikeButton";
import { getPosts, updatePost } from "../../redux/postSlice";
import DeleteCard from "./DeleteCard";
import CardComments from "./CardComments";
import FollowHandler from "../Profil/FollowHandler";
import { getAllUsers } from "../../redux/userSlice";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const usersData = useSelector((state) => state.user.users);
  const userData = useSelector((state) => state.auth.user);
 
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost({postId:post._id,message: textUpdate}));
      dispatch(getPosts());
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    dispatch(getAllUsers)
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData,dispatch]);

 

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={`uploads/profil/${post.posterId.picture}`}
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
            
              <h3>
                  {post.posterId.pseudo}
                </h3>
              {post.posterId._id !== userData._id && (
            
                  <FollowHandler idToFollow={post.posterId._id} type={"card"} />
                )}
                
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />message
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider modification
                  </button>
                </div>
              </div>
            )}
            {post.picture && (
              <img src={`uploads/profil/${post.picture}`} alt="card-pic" className="card-pic" />
            )}
            {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={post._id}
              ></iframe>
            )}
            
            {userData._id === post.posterId._id && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./images/icons/edit.svg" alt="edit" />
                </div>
                <DeleteCard id={post._id} />
              </div>
            )}
            
            <div className="card-footer">
              <div className="comment-icon">
                <img
                  onClick={() => setShowComments(!showComments)}
                  src="./images/icons/message1.svg"
                  alt="comment"
                />
                <span>{post.comments.length}</span>
              </div>
              <LikeButton post={post} />
              <img src="./images/icons/share.svg" alt="share" />
            </div>
            {showComments && <CardComments post={post} />}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
