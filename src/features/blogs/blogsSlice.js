import { getBlogs } from "./blogsAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    blogs: [],
    isLoading: false,
    isError: false,
    error: '',
};

export const fetchBlogsAsync = createAsyncThunk('blogs/fetchBlogs', async() => {
    const blogs = await getBlogs();
    return blogs;
});

const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(fetchBlogsAsync.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(fetchBlogsAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.blogs = action.payload;
        })
        .addCase(fetchBlogsAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.blogs = [];
            state.isError = true;
            state.error = action.error?.message;
        })
    }
});

export default blogsSlice.reducer;