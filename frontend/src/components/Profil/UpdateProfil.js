import React, { useState ,useEffect} from "react";
import LeftNav from "../Nav/LeftNav";
import { useDispatch, useSelector } from "react-redux";
import { updateBio,getAllUsers} from "../../redux/userSlice"
import { dateParser } from "../Utils";
import UploadImg from "./Uploadimg";
import FollowHandler from "./FollowHandler";



const UpdateProfil = () => {
    const [bio, setBio] = useState("");
    const [updateForm, setUpdateForm] = useState(false);
    const authData = useSelector((state) => state.auth.user);

    const usersData = useSelector((state) => state.user.users);
    
   
    
    

    const dispatch = useDispatch();
    const [followingPopup, setFollowingPopup] = useState(false);
    const [followersPopup, setFollowersPopup] = useState(false);
  
    const handleUpdate = () => {
      dispatch(updateBio({userId:authData?._id,bio}));
      setUpdateForm(false);
    };
    
    useEffect(() => {
    
      dispatch(getAllUsers(usersData._id));
     
    
  }, [ dispatch]);
   
    return (
      <div className="profil-container">
        <LeftNav />
        
        <h1> Profil de {authData?.pseudo}</h1>
        
        
        <div className="update-container">
          <div className="left-part">
            <h3>Photo de profil</h3>
            <img src={`uploads/profil/${authData?.picture}`} alt="user-pic" />
            <UploadImg />
          </div>
          <div className="right-part">
            <div className="bio-update">
             
              <h3>Bio</h3>
              
              {updateForm === false && (
                <>
                  <p onClick={() => setUpdateForm(!updateForm)}>{authData?.bio}</p>
                  <button onClick={() => setUpdateForm(!updateForm)}>
                    Modifier bio
                  </button>
                </>
              )}
              {updateForm && (
                <>
                  <textarea
                    type="text"
                    defaultValue={authData?.bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                  <button onClick={handleUpdate}>Valider modifications</button>
                  

                </>
              )}
            </div>
            <h4>Membre depuis le : {dateParser(authData.createdAt)}</h4>
            <h5 onClick={() => setFollowingPopup(true)}>
              Abonnements : {authData.following ? authData.following.length : ""}
            </h5>
            <h5 onClick={() => setFollowersPopup(true)}>
              Abonnés : {authData.followers ? authData.followers.length : ""}
            </h5>
          </div>
        </div>
        {followingPopup && (
          <div className="popup-profil-container">
            <div className="modal">
              <h3>Abonnements</h3>
              <span className="cross" onClick={() => setFollowingPopup(false)}>
                &#10005;
              </span>
              <ul>
              {usersData.map((user) => {
                for (let i = 0; i < authData.following.length; i++) {
                  if (user._id === authData.following[i]) {
                    return (
                      <li key={user._id}>
                        <img src={`uploads/profil/${user.picture}`} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler idToFollow={user._id} />
                        </div>
                      </li>
                    );
                  }
                }
              })}
              </ul>
            </div>
          </div>
        )}
        
        {followersPopup && (
          <div className="popup-profil-container">
            <div className="modal">
              <h3>Abonnés</h3>
              <span className="cross" onClick={() => setFollowersPopup(false)}>
                &#10005;
              </span>
              <ul>
              {usersData.map((user) => {
                for (let i = 0; i < authData.followers.length; i++) {
                  if (user._id === authData.followers[i]) {
                    return (
                      <li key={user._id}>
                        <img src={`uploads/profil/${user.picture}`} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler idToFollow={user._id} />
                        </div>
                      </li>
                    );
                  }
                }
              })}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default UpdateProfil;
  