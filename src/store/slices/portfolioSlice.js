import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  portfolios: [],
  portfolio: null,
  loading: true,
  error: {}
};

// Create Portfolio
export const createPortfolio = createAsyncThunk(
  'portfolio/createPortfolio',
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const res = await axios.post('/api/portfolios', formData, config);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Get all portfolios for a user
export const getPortfolios = createAsyncThunk(
  'portfolio/getPortfolios',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/portfolios');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Get portfolio by ID
export const getPortfolioById = createAsyncThunk(
  'portfolio/getPortfolioById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/portfolios/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Buy Stock
export const buyStock = createAsyncThunk(
  'portfolio/buyStock',
  async ({ portfolioId, symbol, quantity }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const res = await axios.post(`/api/portfolios/${portfolioId}/buy`, { symbol, quantity }, config);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Sell Stock
export const sellStock = createAsyncThunk(
  'portfolio/sellStock',
  async ({ portfolioId, symbol, quantity }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const res = await axios.post(`/api/portfolios/${portfolioId}/sell`, { symbol, quantity }, config);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Copy Portfolio
export const copyPortfolio = createAsyncThunk(
  'portfolio/copyPortfolio',
  async (portfolioId, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/portfolios/${portfolioId}/copy`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPortfolio.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPortfolio.fulfilled, (state, action) => {
        state.portfolios.push(action.payload);
        state.loading = false;
      })
      .addCase(createPortfolio.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getPortfolios.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPortfolios.fulfilled, (state, action) => {
        state.portfolios = action.payload;
        state.loading = false;
      })
      .addCase(getPortfolios.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getPortfolioById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPortfolioById.fulfilled, (state, action) => {
        state.portfolio = action.payload;
        state.loading = false;
      })
      .addCase(getPortfolioById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(buyStock.pending, (state) => {
        state.loading = true;
      })
      .addCase(buyStock.fulfilled, (state, action) => {
        state.portfolio = action.payload;
        state.loading = false;
      })
      .addCase(buyStock.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(sellStock.pending, (state) => {
        state.loading = true;
      })
      .addCase(sellStock.fulfilled, (state, action) => {
        state.portfolio = action.payload;
        state.loading = false;
      })
      .addCase(sellStock.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(copyPortfolio.pending, (state) => {
        state.loading = true;
      })
      .addCase(copyPortfolio.fulfilled, (state, action) => {
        state.portfolios.push(action.payload);
        state.loading = false;
      })
      .addCase(copyPortfolio.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default portfolioSlice.reducer;
