import React, {  useEffect, useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
import {  editComment, getPosts } from "../../redux/postSlice";


const Edit = ({ comment,commenterId ,postId}) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [textUpdate, setTextUpdate] = useState("");
  const auth = useSelector((state) => state.auth.auth)
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();
    console.log(textUpdate)

    if (textUpdate) {
      console.log(postId)
      dispatch(editComment({postId, commentId:comment._id, text:textUpdate}));
      dispatch(getPosts());
      setTextUpdate("");
      setEdit(false);
    }
  };

 
  useEffect(() => {
    const checkAuthor = () => {
      if (auth._id === commenterId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [auth,  commenterId]);


  return (
    <div className="edit-comment" >
     
     {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./images/icons/edit.svg" alt="edit-comment" />
        </span>
      )}
        
        
     {isAuthor && edit && (
      
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setTextUpdate(e.target.value)}
            defaultValue={comment.text}
          />
          
          <br />
          <div className="btn">
           
            <input type="submit" value="Valider modification" />
          </div>
        </form>
        )}
     
    </div>
  );
};

export default Edit;
