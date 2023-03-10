import { getBlog } from './blogAPI';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const initialState = {
  blog: {},
  isLoading: false,
  isError: false,
  error: '',
};

export const fetchBlogAsync = createAsyncThunk('blog/fetchBlog', async (id) => {
  const blog = await getBlog(id);
  return blog;
});

export const updateLikeAsync = createAsyncThunk(
  'blog/updateBlogLike',
  async ({ id, likes }) => {
    const response = await fetch(`http://localhost:9000/blogs/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        likes: likes + 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const newblog = await response.json();
    return newblog;
  }
);

export const updateSaveAsync = createAsyncThunk(
  'blog/updateBlogSave',
  async ({ id, isSaved }) => {
    // console.log(blog.getState().blog.blog);
    const response = await fetch(`http://localhost:9000/blogs/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        isSaved: !isSaved,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const newblog = await response.json();
    return newblog;
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogAsync.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchBlogAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blog = action.payload;
      })
      .addCase(fetchBlogAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.blog = {};
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(updateLikeAsync.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(updateLikeAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blog = action.payload;
      })
      .addCase(updateLikeAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.blog = {};
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(updateSaveAsync.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(updateSaveAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blog = action.payload;
      })
      .addCase(updateSaveAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.blog = {};
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default blogSlice.reducer;
