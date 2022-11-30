import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../redux/userSlice";
import { isEmpty } from "../Utils";

const FollowHandler = ({ idToFollow ,type}) => {
  const userData = useSelector((state) => state.auth.user);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser({followerId:userData._id, idToFollow}));
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser({followerId:userData._id, idToUnfollow:userData._id}));
    setIsFollowed(false);
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      } else setIsFollowed(false);
    }
  }, [userData, idToFollow]);

  return (
    <>
      {isFollowed && !isEmpty(userData) && (
        <span onClick={handleUnfollow}>
           {type === "suggestion" && <button className="unfollow-btn">Abonné</button>}
          {type === "card" && <img src="./images/icons/checked.svg" alt="checked"/>}
        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <span onClick={handleFollow}>
         {type === "suggestion" && <button className="follow-btn">Suivre</button>}
          {type === "card" && <img src="./images/icons/check.svg" alt="check"/>}
        </span>
      )}
    </>
  );
};

export default FollowHandler;