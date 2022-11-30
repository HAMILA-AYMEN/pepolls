import React from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../redux/postSlice";

const DeleteCard = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = () => dispatch(deleteComment(props.id));

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

