import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify';


const initialState={
    user:null,
    auth:false,
    errors:[],
    loading:false
}
export const registerUser=createAsyncThunk('auth/registerUser',async(data,{rejectWithValue})=>{
    try {
        const res=await axios.post("api/auth/register",data)
        return res.data
        
    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
})

export const loginUser=createAsyncThunk('auth/loginUser',async(data,{rejectWithValue})=>{
    try {
        const res=await axios.post("api/auth/login",data)
        return res.data
        
       
    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
})

export const currentUser=createAsyncThunk('auth/currentUser',async(arg,{rejectWithValue})=>{
  
  try {
      const res=await axios.get('api/auth/current',)
      return res.data
  } catch (error) {
      return rejectWithValue(error.response.data.errors)
  }
})


const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        
       

        
    },
   
    extraReducers(builder){
        builder
              .addCase(registerUser.pending,(state,{payload})=>{
               state.loading=true;
              })
              .addCase(registerUser.fulfilled,(state,{payload})=>{
                state.user=payload.user
                state.auth=true
                state.loading=false
              
                toast.success(payload.msg)
              })
              .addCase(registerUser.rejected,(state,{payload})=>{
                state.errors=payload
                state.loading=false
                payload.forEach(error=>toast.error(error.msg))
              })
              .addCase(loginUser.pending,(state,{payload})=>{
                state.loading=true;
               })
               .addCase(loginUser.fulfilled,(state,{payload})=>{
                 state.user=payload.user
                 state.auth=true
                 state.loading=false
                 
                 toast.success(payload.msg)
               })
               .addCase(loginUser.rejected,(state,{payload})=>{
                 state.errors=payload
                 state.loading=false
                 payload.forEach(error=>toast.error(error.msg))
               })

               .addCase(currentUser.pending,(state,{payload})=>{
                state.loading=true;
               })
               .addCase(currentUser.fulfilled,(state,{payload})=>{
                 state.user=payload
                 state.auth=true
                 state.loading=false
                
               })
               .addCase(currentUser.rejected,(state,{payload})=>{
                 state.errors=payload
                 state.loading=false
               })
               
    }
})

export default authSlice.reducer