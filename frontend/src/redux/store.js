import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import postSlice from "./postSlice"
import userSlice from "./userSlice"


const store=configureStore({
    reducer:{
        auth:authSlice,
        user:userSlice,
        post:postSlice,
       

    }
})

export default store