import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  gamificationData: null,
  loading: true,
  error: {}
};

// Get user gamification data
export const getUserGamification = createAsyncThunk(
  'gamification/getUserGamification',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/gamification/${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Update user's learning streak
export const updateStreak = createAsyncThunk(
  'gamification/updateStreak',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.put('/api/gamification/update-streak');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const gamificationSlice = createSlice({
  name: 'gamification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserGamification.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserGamification.fulfilled, (state, action) => {
        state.gamificationData = action.payload;
        state.loading = false;
      })
      .addCase(getUserGamification.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateStreak.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStreak.fulfilled, (state, action) => {
        state.gamificationData.streak = action.payload.streak;
        state.loading = false;
      })
      .addCase(updateStreak.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default gamificationSlice.reducer;