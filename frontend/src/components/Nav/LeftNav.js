
import { NavLink } from 'react-router-dom';
import {  useSelector } from "react-redux";




const LeftNav = () => {
    const authData=useSelector(state=>state.auth.user)
    const auth = useSelector((state) => state.auth.auth)
  return (
    
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink to='/' className="active-left-nav">
            <img src="./images/icons/home.png" alt="home"/>
          </NavLink>
          <br/>
          <br/>
          <NavLink to='/trending' className="active-left-nav">
            <img src="./images/icons/rocket.png" alt="home"/>
          </NavLink>
          <br/>
          <br/>
          {auth ? (
          <NavLink to='/profil'  className="active-left-nav">
            <img style={{height: "30px",borderRadius: "46px"}} src={`uploads/profil/${authData?.picture}`} alt="user-pic"/>
          </NavLink>
          ) : (
            <NavLink to='/' activeclassName="active-left-nav">
            <img  src="./images/icons/user.png" alt="home"/>
          </NavLink>
          )}

        </div>
      </div>
    </div>
  );
};

export default LeftNav;