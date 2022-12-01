import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../redux/postSlice";
import FollowHandler from "../Profil/FollowHandler";
import {  timestampParser } from "../Utils";
import Edit from "./Edit";
import DeleteComment from './DeleteComment'


const CardComments = ({ post }) => {
  const [text, setText] = useState("");
 
 
  const authData = useSelector((state) => state.auth.user);
  


  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();

    
      dispatch(addComment({commentId:post._id, commenterId:authData._id, text, commenterPseudo:post.pseudo}))
        dispatch(getPosts())
        setText('');
    
  };

  return (
    <div className="comments-container" >
      {post.comments.map((comment) => {
        return (
          <div
            className={
              comment.commenterId === authData._id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment._id}
          >
            <div className="left-part">
      
              <img src={`uploads/profil/${comment.commenterId.picture}`} alt="commenter-pic"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>{comment.commenterId.pseudo}</h3>
                  {comment.commenterId._id !== authData._id&& (
                    <FollowHandler
                      idToFollow={comment.commenterId}
                      type={"card"}
                    />
                  )}
                </div>
                <span>{timestampParser(comment.timestamp)}</span>
              </div>
              <p>{comment.text}</p>
              
              {comment.commenterId._id === authData._id && (
                <>
                  <Edit  postId={post._id} comment={comment}/>
                  <DeleteComment comment={comment} postId={post._id} />
                  </>
                )}
            </div>
            
          </div>
        );
      })}
     {authData._id &&(
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Laisser un commentaire"
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
  );
};

export default CardComments;
