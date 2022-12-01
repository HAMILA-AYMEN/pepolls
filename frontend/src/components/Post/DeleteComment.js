import React from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../redux/postSlice";

const DeleteCard = ({postId,comment}) => {
  const dispatch = useDispatch();


  const deleteQuote = () => dispatch(deleteComment({postId,commentId:comment._id}));
  

  return (
    <div className="edit-comment"
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
          deleteQuote();
        }
      }}
    >
      <img src="./images/icons/trash.svg" alt="delete" />
    </div>
  );
};

export default DeleteCard;

