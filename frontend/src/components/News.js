import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/postSlice";
import Card from "./Post/Card";


const Thread = () => {
 
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    
      dispatch(getPosts());
     
    
  }, [ dispatch]);

  return (
    <div className="thread-container">
        
      <ul>
        {
          posts?.map((post) => <Card post={post} key={post._id} />)}
      </ul>
    </div>
  );
};

export default Thread;
