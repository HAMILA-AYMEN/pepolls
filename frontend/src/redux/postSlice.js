import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  posts: [],
  auth: false,
  errors: [],
  loading: false
}
export const addPost = createAsyncThunk('post/addPost', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post("api/post", data)
    return res.data

  } catch (error) {
    return rejectWithValue(error.response.data.errors)
  }
})

export const getPosts = createAsyncThunk('post/getPosts', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.get("api/post")

    return res.data

  } catch (error) {
    return rejectWithValue(error.response.data.errors)
  }
})
export const likePost = createAsyncThunk('post/likePost', async (data, { rejectWithValue }) => {
  try {
    const res = await axios({
      method: "patch",
      url: `api/post/like-post/${data.posterId}`,
      data: { userId: data.userId },
    })
    return res.data

  } catch (error) {
    return rejectWithValue(error.response.data.errors)
  }
})
export const unlikePost = createAsyncThunk('post/unlikePost', async (posterId, userId, { rejectWithValue }) => {
  try {
    const res = await axios({
      method: "patch",
      url: `api/post/unlike-post/${posterId}`,
      data: { id: userId },
    })

    return res.data

  } catch (error) {
    return rejectWithValue(error.response.data.errors)
  }
})

export const updatePost = createAsyncThunk('post/updatePost', async (data, { rejectWithValue }) => {
  try {
    const res = await axios({
      method: "put",
      url: `api/post/${data.postId}`,
      data:  {message:data.message} ,
    })

    return res.data

  } catch (error) {
    return rejectWithValue(error.response.data.errors)
  }
})


export const deletePost = createAsyncThunk('post/deletePost', async (postId, { rejectWithValue }) => {
  try {
    const res = await axios({
      method: "delete",
      url: `api/post/${postId}`,

    })

    return res.data

  } catch (error) {
    return rejectWithValue(error.response.data.errors)
  }
})


const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {




  },

  extraReducers(builder) {
    builder
      .addCase(addPost.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(addPost.fulfilled, (state, { payload }) => {
        state.posts = payload.post
        state.auth = true
        state.loading = false
        localStorage.setItem('token', payload.token)

      })
      .addCase(addPost.rejected, (state, { payload }) => {
        state.errors = payload
        state.loading = false

      })
      .addCase(deletePost.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {

        state.auth = true
        state.loading = false
        const index = state.posts.find(post => post._id === payload._id)
        state.posts.splice(index, 1)

      })
      .addCase(deletePost.rejected, (state, { payload }) => {
        state.errors = payload
        state.loading = false

      })
      .addCase(getPosts.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, { payload }) => {

        state.posts = payload

        state.loading = false


      })
      .addCase(getPosts.rejected, (state, { payload }) => {
        state.errors = payload
        state.loading = false

      })
      .addCase(updatePost.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, { payload }) => {

        state.auth = true
        state.loading = false
        state.posts.find(post => post._id === payload._id)
        state.message = payload.message
        




      })
      .addCase(updatePost.rejected, (state, { payload }) => {
        state.errors = payload
        state.loading = false

      })

      .addCase(likePost.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(likePost.fulfilled, (state, { payload }) => {
        state.auth = true
        state.loading = false

        state.posterId=payload.posterId
        state.likes=payload.likes


      })
      .addCase(likePost.rejected, (state, { payload }) => {
        state.errors = payload
        state.loading = false

      })

      .addCase(unlikePost.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(unlikePost.fulfilled, (state, { payload }) => {
        state.auth = true
        state.loading = false

        return state.map((post) => {
          if (post._id === payload.posterId) {
            return {
              ...post,
              likers: post.likers.filter((id) => id !== payload.userId),
            };
          }
          return post;
        });


      })
      .addCase(unlikePost.rejected, (state, { payload }) => {
        state.errors = payload
        state.loading = false

      })






  }
})

export default postSlice.reducer