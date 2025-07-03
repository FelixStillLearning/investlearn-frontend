import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  clientSecret: null,
  loading: true,
  error: {}
};

// Create Payment Intent
export const createPaymentIntent = createAsyncThunk(
  'payment/createPaymentIntent',
  async (amount, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const res = await axios.post('/api/payments/create-payment-intent', { amount, currency: 'usd' }, config);
      return res.data.clientSecret;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Initiate Withdrawal
export const initiateWithdrawal = createAsyncThunk(
  'payment/initiateWithdrawal',
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const res = await axios.post('/api/payments/withdraw', formData, config);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentIntent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.clientSecret = action.payload;
        state.loading = false;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(initiateWithdrawal.pending, (state) => {
        state.loading = true;
      })
      .addCase(initiateWithdrawal.fulfilled, (state, action) => {
        state.loading = false;
        // Handle success, maybe clear form or show success message
      })
      .addCase(initiateWithdrawal.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default paymentSlice.reducer;
