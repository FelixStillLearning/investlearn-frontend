import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  badges: [],
  loading: true,
  error: {}
};

// Get all badges
export const getBadges = createAsyncThunk(
  'badge/getBadges',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/badges');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const badgeSlice = createSlice({
  name: 'badge',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBadges.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBadges.fulfilled, (state, action) => {
        state.badges = action.payload;
        state.loading = false;
      })
      .addCase(getBadges.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default badgeSlice.reducer;
