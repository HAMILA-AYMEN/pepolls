import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersToFollow } from "../../redux/userSlice";
import { isEmpty } from "../Utils";
import FollowHandler from "./FollowHandler";

const FriendsHint = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(true);
 
  const userData = useSelector((state) => state.auth.user);
  const usersData = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(getUsersToFollow(usersData._id));
   
}, [ dispatch]);

  return (
    <div className="get-friends-container">
      <h4>Suggestions</h4>
      
      
        <ul>
          {
            usersData.map((user) => {
              
               
                  return (
                    <li className="user-hint" key={user}>
                      <img src={`uploads/profil/${user.picture}`} alt="user-pic" />
                      <p>{user.pseudo}</p>
                      <FollowHandler
                        idToFollow={user._id}
                        type={"suggestion"}
                      />
                    </li>
                  );
                
              
            })}
        </ul>
      
    </div>
  );
};

export default FriendsHint;
