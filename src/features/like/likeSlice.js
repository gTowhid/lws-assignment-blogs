const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const initialState = {
  blog: {},
  isLoading: false,
  isError: false,
  error: '',
};

export const updateLikeAsync = createAsyncThunk(
  'like/updateBlogLike',
  async ({ id, likes }) => {
    console.log(likes);
    const response = await fetch(`http://localhost:9000/blogs/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        likes: likes + 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const blog = await response.json();
    console.log(blog);
    return blog;
  }
);

const likeSlice = createSlice({
  name: 'like',
  initialState,
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default likeSlice.reducer;
