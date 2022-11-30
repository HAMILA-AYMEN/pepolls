import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/postSlice";

const DeleteCard = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = () => dispatch(deletePost(props.id));

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer cet article ?")) {
          deleteQuote();
        }
      }}
    >
      <img src="./images/icons/trash.svg" alt="delete" />
    </div>
  );
};

export default DeleteCard;

