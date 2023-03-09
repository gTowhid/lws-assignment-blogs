import { getRelatedBlogs } from './relatedBlogsAPI';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const initialState = {
  relatedBlogs: [],
  isLoading: false,
  isError: false,
  error: '',
};

export const fetchRelatedBlogsAsync = createAsyncThunk(
  'relatedBlogs/fetcRelatedBlogs',
  async ({ tags, id }) => {
    const relatedBlogs = await getRelatedBlogs({ tags, id });
    return relatedBlogs;
  }
);

const relatedBlogsSlice = createSlice({
  name: 'relatedBlogs',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelatedBlogsAsync.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchRelatedBlogsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.relatedBlogs = action.payload;
      })
      .addCase(fetchRelatedBlogsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.relatedBlogs = [];
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default relatedBlogsSlice.reducer;
