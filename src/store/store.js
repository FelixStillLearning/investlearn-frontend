
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import portfolioReducer from './slices/portfolioSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    portfolio: portfolioReducer,
    marketData: marketDataReducer,
    learningModule: learningModuleReducer,
    gamification: gamificationReducer,
    badge: badgeReducer,
    social: socialReducer,
    challenge: challengeReducer,
    payment: paymentReducer,
  },
});
