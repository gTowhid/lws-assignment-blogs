import { getBlog } from "./blogAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    blog: {},
    isLoading: false,
    isError: false,
    error: '',
};

export const fetchBlogAsync = createAsyncThunk('blog/fetchBlog', async(id) => {
    const blog = await getBlog(id);
    return blog;
});

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
    }
});

export default blogSlice.reducer;