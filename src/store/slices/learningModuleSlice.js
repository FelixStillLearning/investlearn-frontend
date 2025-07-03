import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  modules: [],
  currentModule: null,
  loading: true,
  error: {}
};

// Get all learning modules
export const getLearningModules = createAsyncThunk(
  'learningModule/getLearningModules',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/learningmodules');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Get learning module by ID or Slug
export const getLearningModuleById = createAsyncThunk(
  'learningModule/getLearningModuleById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/learningmodules/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Mark learning module as completed
export const completeLearningModule = createAsyncThunk(
  'learningModule/completeLearningModule',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/learningmodules/${id}/complete`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const learningModuleSlice = createSlice({
  name: 'learningModule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLearningModules.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLearningModules.fulfilled, (state, action) => {
        state.modules = action.payload;
        state.loading = false;
      })
      .addCase(getLearningModules.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getLearningModuleById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLearningModuleById.fulfilled, (state, action) => {
        state.currentModule = action.payload;
        state.loading = false;
      })
      .addCase(getLearningModuleById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(completeLearningModule.fulfilled, (state, action) => {
        // Optionally update user's completed modules or XP in auth slice if needed
        console.log('Module completed successfully:', action.payload);
      })
      .addCase(completeLearningModule.rejected, (state, action) => {
        console.error('Failed to complete module:', action.payload);
      });
  },
});

export default learningModuleSlice.reducer;
