import { getBlog, setBlogLike, setBlogSaved } from './blogAPI';

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
    const newlike = await setBlogLike({ id, likes });
    return newlike;
  }
);

export const updateSaveAsync = createAsyncThunk(
  'blog/updateBlogSave',
  async ({ id, isSaved }) => {
    const newIsSaved = await setBlogSaved({ id, isSaved });
    return newIsSaved;
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
      // .addCase(updateLikeAsync.pending, (state) => {
      //   state.isError = false;
      //   state.isLoading = true;
      // })
      .addCase(updateLikeAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blog.likes = action.payload;
      })
      .addCase(updateLikeAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      // .addCase(updateSaveAsync.pending, (state) => {
      //   state.isError = false;
      //   state.isLoading = true;
      // })
      .addCase(updateSaveAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blog.isSaved = action.payload;
      })
      .addCase(updateSaveAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default blogSlice.reducer;
