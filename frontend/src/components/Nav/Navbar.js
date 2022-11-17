import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

import Logout from "../Log/Logout";
import { followUser, getAllUsers } from "../../redux/userSlice";

const Navbar = () => {
  const auth = useSelector((state) => state.auth.auth)
  const userData = useSelector((state) => state.auth.user);
  const [Popup, setPopup] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    
    dispatch(getAllUsers(usersData._id));
   
  
}, [ dispatch]);
 
  const usersData = useSelector((state) => state.user.users);
    
  


  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink  to="/">
            <div className="logo">
              <img src="./images/favicon-pepolls.svg" alt="icon" />
              <h3>Pepolls</h3>
            </div>
          </NavLink>
        </div>
        {auth? (
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink  to="/profil">
                <h5>Bienvenue {userData.pseudo} </h5>
              </NavLink>
             
            </li>
            
  
            <NavLink>
             
            <Badge color="primary" badgeContent={userData.followers.length} onClick={() => setPopup(true)}>
           
        <MailIcon />
      </Badge>
      
              </NavLink>
              {Popup && (
             <div className="popup-profil-container">
             <div className="modal">
             <span className="cross" onClick={() => setPopup(false)}>
        &#10005;
      </span>
      <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.following.length; i++) {
                  if (user._id === userData.following[i]) {
                    return (
                      <li key={user._id}>
                        <img src={`uploads/profil/${user.picture}`} alt="user-pic" />
                        <h4>{user.pseudo} vous suit</h4>
                        
                      </li>
                    );
                  }
                }
              })}
              </ul>
              </div>
  </div> 
  ) }

            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink  to="/profil">
                <img src="./images/icons/login.png" alt="login"/>
              </NavLink>
            </li>
          </ul>
        )}
      </div>
      
    </nav>
  );
};

export default Navbar;


       