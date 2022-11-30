import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    User: null,
    users:[],
    auth: true,
    errors: [],
    loading: false,
   
}
export const getAllUsers=createAsyncThunk('user/getAllUsers',async(data,{rejectWithValue})=>{

    try {
        const res=await axios.get("api/user",data)
        return res.data
      
    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
})

export const getUsersToFollow=createAsyncThunk('user/getUsersToFollow',async(data,{rejectWithValue})=>{

    try {
        const res=await axios.get("api/user/users-to-follow",data)
        return res.data
      
    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
})

export const getUser = createAsyncThunk('user/getUser', async (id, { rejectWithValue }) => {

    try {
        const res = await axios.get(`api/user/${id}`)
        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
})


export const uploadPicture = createAsyncThunk('user/uploadPicture', async (data,{ rejectWithValue }) => {
    try {
        const res = await axios.put("api/user/uploadimage",data)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
})

export const updateBio = createAsyncThunk('user/updateBio', async (data, { rejectWithValue }) => {

    try {
        const res = await axios.put(`api/user/update/${data.userId}`,{bio:data.bio})
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
})


export const followUser = createAsyncThunk('user/followUser', async (data, { rejectWithValue }) => {

    try {
        const res = await axios({
            method: "patch",
            url: `api/user/follow/${data.followerId}`,
            data: { idToFollow:data.idToFollow },
        })
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
})


export const unfollowUser = createAsyncThunk('user/unfollowUser', async (data, { rejectWithValue }) => {

    try {
        const res = await axios({
            method: "patch",
            url: `api/user/unfollow/${data.followerId}`,
            data: { idToUnfollow:data.idToUnfollow },
        })
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
})




const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {




    },

    extraReducers(builder) {
        builder
        .addCase(getAllUsers.pending, (state, { payload }) => {
            state.loading = true;
        })
        .addCase(getAllUsers.fulfilled, (state, { payload }) => {
            state.users = payload
            
            state.auth = true
            state.loading = false
           

        })
        .addCase(getAllUsers.rejected, (state, { payload }) => {
            state.errors = payload
            state.loading = false

        })
        .addCase(getUsersToFollow.pending, (state, { payload }) => {
            state.loading = true;
        })
        .addCase(getUsersToFollow.fulfilled, (state, { payload }) => {
            state.users = payload
            
            state.auth = true
            state.loading = false
           

        })
        .addCase(getUsersToFollow.rejected, (state, { payload }) => {
            state.errors = payload
            state.loading = false

        })

            .addCase(getUser.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, { payload }) => {
                state.User = payload.user
                state.pseudo = payload.pseudo
                state.picture = payload.picture
                state.auth = true
                state.loading = false
                

            })
            .addCase(getUser.rejected, (state, { payload }) => {
                state.errors = payload
                state.loading = false

            })

            .addCase(uploadPicture.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(uploadPicture.fulfilled, (state, { payload }) => {
                state.picture = payload.picture
               
                state.loading = false
               

            })
            .addCase(uploadPicture.rejected, (state, { payload }) => {
                state.errors = payload
                state.loading = false

            })

            .addCase(updateBio.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(updateBio.fulfilled, (state, { payload }) => {
                state.bio = payload.bio
              
                state.loading = false
            


            })
            .addCase(updateBio.rejected, (state, { payload }) => {
                state.errors = payload
                state.loading = false

            })

            .addCase(followUser.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(followUser.fulfilled, (state, { payload }) => {
                state.followers = payload.followerId
                state.following = payload.idToFollow
                state.data = payload.data
                state.auth = true
                state.loading = false
               


            })
            .addCase(followUser.rejected, (state, { payload }) => {
                state.errors = payload
                state.loading = false

            })

            .addCase(unfollowUser.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(unfollowUser.fulfilled, (state, { payload }) => {
                const index=  state.following.filter(follow => follow.idToUnfollow === payload.idToUnfollow)
                    
                
                state.following.splice(index, 1)
                
                state.auth = true
                state.loading = false
                


            })
            .addCase(unfollowUser.rejected, (state, { payload }) => {
                state.errors = payload
                state.loading = false

            })
    }
})

export default userSlice.reducer