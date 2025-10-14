import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPostsApi, getPostDetailApi } from "../services/postService";

const initialState = {
    allPosts: [],
    postDetail: null,
    loading: { all: false, detail: false },
    error: null,
};

export const fetchAllPosts = createAsyncThunk("post/fetchAll", async (admin = false, thunkAPI) => {
    try {
        const res = await getAllPostsApi(admin);
        if (res.success) return res.data;
        return thunkAPI.rejectWithValue(res.message);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const fetchPostDetail = createAsyncThunk(
    "post/fetchDetail",
    async ({ slug, admin = false }, thunkAPI) => {
        try {
        const data = await getPostDetailApi(slug, admin);
        return data;
        } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
        }
    }
    );

    const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllPosts.pending, (state) => {
            state.loading.all = true;
            state.error = null;
        })
        .addCase(fetchAllPosts.fulfilled, (state, action) => {
            state.loading.all = false;
            state.allPosts = action.payload;
        })
        .addCase(fetchAllPosts.rejected, (state, action) => {
            state.loading.all = false;
            state.error = action.payload;
        })
        .addCase(fetchPostDetail.pending, (state) => {
            state.loading.detail = true;
            state.error = null;
            state.postDetail = null;
        })
        .addCase(fetchPostDetail.fulfilled, (state, action) => {
            state.loading.detail = false;
            state.postDetail = action.payload;
            state.error = null;
        })
        .addCase(fetchPostDetail.rejected, (state, action) => {
            state.loading.detail = false;
            state.error = action.payload;
            state.postDetail = null;
        });
    },
});

export default postSlice.reducer;