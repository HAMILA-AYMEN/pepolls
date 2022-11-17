import React, {  useEffect,useState } from "react";
import TextField from '@mui/material/TextField';
import {useDispatch , useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'



import { loginUser } from '../../redux/authSlice';


const SignInForm = () => {
    const [data, setData] = useState({ email: "", password: ""})
    const user=useSelector(state=>state.auth.user)
   

    
    const dispatch=useDispatch()
    const navigate=useNavigate()
 
    


    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleLogin = (e) => {
      e.preventDefault();
      dispatch(loginUser(data))
      
    };
    useEffect(()=>{
      if(user){
        navigate('/')
      }
      },[user,navigate])
      

   
    
    return (
      <form action="" onSubmit={handleLogin} id="sign-up-form">
        
        <br />
        <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              name="email"
              onChange={handleChange}
             
            />
        <div className="email error"></div>
        <br />
       
        <br />
        <TextField
              id="standard-basic"
              label="Mot de passe "
              variant="standard"
              type="password"
              name="password"
              onChange={handleChange}
            />
        <div className="password error"></div>
        <br />
        <input type="submit" value="Se connecter" />
      </form>
    );
  };
  
  export default SignInForm;