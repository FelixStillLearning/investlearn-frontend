import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  followers: [],
  following: [],
  loading: true,
  error: {}
};

// Follow a user
export const followUser = createAsyncThunk(
  'social/followUser',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/social/follow/${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Unfollow a user
export const unfollowUser = createAsyncThunk(
  'social/unfollowUser',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/social/unfollow/${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Get followers of a user
export const getFollowers = createAsyncThunk(
  'social/getFollowers',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/social/followers/${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Get users a user is following
export const getFollowing = createAsyncThunk(
  'social/getFollowing',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/social/following/${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(followUser.fulfilled, (state, action) => {
        // Optionally update state if needed, e.g., add to following list
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        // Optionally update state if needed, e.g., remove from following list
      })
      .addCase(getFollowers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.followers = action.payload;
        state.loading = false;
      })
      .addCase(getFollowers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getFollowing.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFollowing.fulfilled, (state, action) => {
        state.following = action.payload;
        state.loading = false;
      })
      .addCase(getFollowing.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default socialSlice.reducer;
