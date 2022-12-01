import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  posts: [],
 
 
  
  auth: false,
  errors: [],
  loading: false,
 
  
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
      url: `api/post/like-post/${data.postId}`,
      data: { posterId: data.posterId },
    })
    return res.data

  } catch (error) {
    return rejectWithValue(error.response.data.errors)
  }
})
export const unlikePost = createAsyncThunk('post/unlikePost', async (data, { rejectWithValue }) => {
  try {
    const res = await axios({
      method: "patch",
      url: `api/post/unlike-post/${data.postId}`,
      data: { posterId: data.posterId},
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

export const addComment = createAsyncThunk('post/addComment', async (data, { rejectWithValue }) => {
  try {
    const res = await axios({
      method: "patch",
      url: `api/post/comment-post/${data.commentId}`,
      data:  {commenterId:data.commenterId,text:data.text,commenterPseudo:data.commenterPseudo,picture:data.picture} ,

    })

    return res.data

  } catch (error) {
    return rejectWithValue(error.response.data.errors)
  }
})

export const editComment  = createAsyncThunk('post/editComment', async (data, { rejectWithValue }) => {
  try {
    const res = await axios({
      method: "patch",
      url: `api/post/edit-comment-post/${data.postId}`,
      data: { text:data.text ,commentId:data.commentId},

    })

    return res.data

  } catch (error) {
    return rejectWithValue(error.response.data.errors)
  }
})

export const deleteComment  = createAsyncThunk('post/deleteComment', async (data, { rejectWithValue }) => {
  try {
    const res = await axios({
      method: "patch",
      url: `api/post/delete-comment-post/${data.postId}`,
      data: { commentId:data.commentId}
      
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
        state.posts=state.posts.filter(post =>post._id !== payload._id)

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
        state.posts.map(post => post._id === payload._id)
        state.likers=payload.posterId
       

      
       


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
        state.posts.posterId.filter(post => post._id !== payload._id)
       
        


      })
      .addCase(unlikePost.rejected, (state, { payload }) => {
        state.errors = payload
        state.loading = false

      })

      .addCase(addComment.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        state.auth = true
        state.loading = false

        state.comments=payload.comments
        


      })
      .addCase(addComment.rejected, (state, { payload }) => {
        state.errors = payload
        state.loading = false

      })

      .addCase(editComment.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(editComment.fulfilled, (state, { payload }) => {
        state.auth = true
        state.loading = false
        state.comments.find(comment => comment._id === payload._id)
        state.message = payload.message

        


      })
      .addCase(editComment.rejected, (state, { payload }) => {
        state.errors = payload
        state.loading = false

      })

      .addCase(deleteComment.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, { payload }) => {
        state.auth = true
        state.loading = false

        state.comments=state.comments.filter(comment =>comment._id !== payload._id)


      })
      .addCase(deleteComment.rejected, (state, { payload }) => {
        state.errors = payload
        state.loading = false

      })




  }
})

export default postSlice.reducer