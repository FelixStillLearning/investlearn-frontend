import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  challenges: [],
  currentChallenge: null,
  history: [],
  loading: true,
  error: {}
};

// Get all challenges
export const getChallenges = createAsyncThunk(
  'challenge/getChallenges',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/challenges');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Get challenge by ID
export const getChallengeById = createAsyncThunk(
  'challenge/getChallengeById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/challenges/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Join a challenge
export const joinChallenge = createAsyncThunk(
  'challenge/joinChallenge',
  async ({ challengeId, portfolioId }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const res = await axios.post(`/api/challenges/${challengeId}/join`, { portfolioId }, config);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Get user's challenge history
export const getChallengeHistoryById = createAsyncThunk(
  'challenge/getChallengeHistoryById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/challenges/${id}/history`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Get user's challenge history
export const getUserChallengeHistory = createAsyncThunk(
  'challenge/getUserChallengeHistory',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/challenges/history');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const challengeSlice = createSlice({
  name: 'challenge',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChallenges.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChallenges.fulfilled, (state, action) => {
        state.challenges = action.payload;
        state.loading = false;
      })
      .addCase(getChallenges.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getChallengeById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChallengeById.fulfilled, (state, action) => {
        state.currentChallenge = action.payload;
        state.loading = false;
      })
      .addCase(getChallengeById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(joinChallenge.pending, (state) => {
        state.loading = true;
      })
      .addCase(joinChallenge.fulfilled, (state, action) => {
        state.currentChallenge = action.payload.challenge;
        state.loading = false;
      })
      .addCase(joinChallenge.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getUserChallengeHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserChallengeHistory.fulfilled, (state, action) => {
        state.history = action.payload;
        state.loading = false;
      })
      .addCase(getUserChallengeHistory.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getChallengeHistoryById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChallengeHistoryById.fulfilled, (state, action) => {
        state.currentChallenge.history = action.payload;
        state.loading = false;
      })
      .addCase(getChallengeHistoryById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default challengeSlice.reducer;
