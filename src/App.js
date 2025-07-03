import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './store/slices/authSlice';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WelcomeBanner from './components/ui/WelcomeBanner';
import StatsCard from './components/ui/StatsCard';
import PortfolioChart from './components/ui/PortfolioChart';
import RecentTransactions from './components/ui/RecentTransactions';
import RecommendedLearning from './components/ui/RecommendedLearning';
import MarketWatch from './components/ui/MarketWatch';
import Badges from './components/ui/Badges';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/pages/Profile';
import PrivateRoute from './components/routing/PrivateRoute';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <main className="container px-4 py-6 mx-auto">
      <WelcomeBanner username={user ? user.username : 'Guest'} />
    <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
      <StatsCard 
        title="Portfolio Value" 
        value="$1,234.56" 
        change="5.2%" 
        changeType="positive" 
        icon={{ name: 'wallet', color: 'green' }} 
      />
      <StatsCard 
        title="Learning Progress" 
        value="3/10 Modules" 
        xp="+150 XP today" 
        progress={30} 
        icon={{ name: 'book-open', color: 'blue' }} 
      />
      <StatsCard 
        title="Active Challenges" 
        value="2 Running" 
        leaderboard="#15 in Leaderboard" 
        icon={{ name: 'trophy', color: 'purple' }} 
      />
    </div>
    <PortfolioChart />
    <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
      <RecentTransactions />
      <RecommendedLearning />
    </div>
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <MarketWatch />
      <Badges />
    </div>
  </main>
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <div className="font-sans bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-portfolio"
            element={
              <PrivateRoute>
                <CreatePortfolio />
              </PrivateRoute>
            }
          />
          <Route path="/stock/:symbol" element={<StockDetail />} />
          <Route
            path="/portfolio/:id/trade"
            element={
              <PrivateRoute>
                <Trading />
              </PrivateRoute>
            }
          />
          <Route
            path="/portfolio/:id"
            element={
              <PrivateRoute>
                <PortfolioDetail />
              </PrivateRoute>
            }
          />
          <Route path="/learn" element={<LearningModules />} />
          <Route path="/learn/:slug" element={<LearningModuleDetail />} />
          <Route path="/challenges" element={<ChallengeList />} />
          <Route path="/challenges/:id" element={<ChallengeDetail />} />
          <Route
            path="/risk-assessment"
            element={
              <PrivateRoute>
                <RiskAssessment />
              </PrivateRoute>
            }
          />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;