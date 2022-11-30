import { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../redux/authSlice';
import { toast } from 'react-toastify';




const SignUpForm = () => {

    const [data, setData] = useState({ pseudo: "", email: "", password: "", controllPassword: "" })

    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {   handleSubmit } = useForm()


    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleRegister = async (e) => {
        if (data.password !== data.controllPassword) {
            toast("Les mots de passe ne correspondent pas")
            
          }
        else {
            dispatch(registerUser(data))
        }
     
        
       
            
        







    }
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user, navigate])


    return (
        <>



            <form action="" onSubmit={handleSubmit(handleRegister)} id="sign-up-form">

                <br />

                <TextField
                    id="standard-basic"
                    label="Pseudo"
                    variant="standard"
                    name="pseudo"
                    onChange={handleChange}

                />
                <div className="pseudo error"></div>

                <TextField
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    name="email"
                    onChange={handleChange}
                />
                <div className="email error"></div>

                <TextField
                    id="standard-basic"
                    label="Mot de passe "
                    variant="standard"
                    type="password"
                    name="password"
                    onChange={handleChange}
                />
                <div className="password error"></div>

                <TextField
                    id="standard-basic"
                    label="Confirmer mot de passe "
                    variant="standard"
                    type="password"
                    name="controllPassword"
                    onChange={handleChange}
                />
                <div className="password-confirm error"></div>
                <br />
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">
                    J'accepte les{" "}
                    <a href="/" target="_blank" rel="noopener noreferrer">
                        conditions générales
                    </a>
                </label>
                <div className="terms error"></div>
                <br />
                <input type="submit" value="Valider inscription" />
            </form>

        </>
    );



}
export default SignUpForm;