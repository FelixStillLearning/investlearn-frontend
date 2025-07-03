import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  marketData: [],
  loading: true,
  error: {}
};

// Get market data for a symbol
export const getMarketData = createAsyncThunk(
  'marketData/getMarketData',
  async (symbol, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/marketdata/${symbol}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Search market data
export const searchMarketData = createAsyncThunk(
  'marketData/searchMarketData',
  async (query, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/marketdata/search?query=${query}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const marketDataSlice = createSlice({
  name: 'marketData',
  initialState,
  reducers: {
    updateMarketData: (state, action) => {
      const index = state.marketData.findIndex(item => item.symbol === action.payload.symbol);
      if (index !== -1) {
        state.marketData[index] = action.payload;
      } else {
        state.marketData.push(action.payload);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMarketData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMarketData.fulfilled, (state, action) => {
        const index = state.marketData.findIndex(item => item.symbol === action.payload.symbol);
        if (index !== -1) {
          state.marketData[index] = action.payload;
        } else {
          state.marketData.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(getMarketData.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(searchMarketData.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchMarketData.fulfilled, (state, action) => {
        state.marketData = action.payload;
        state.loading = false;
      })
      .addCase(searchMarketData.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { updateMarketData } = marketDataSlice.actions;
export default marketDataSlice.reducer;
