import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMarketData } from '../../store/slices/marketDataSlice';
import io from 'socket.io-client';

const socket = io(process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000'); // Connect to your backend URL

const MarketWatch = () => {
  const dispatch = useDispatch();
  const { marketData, loading, error } = useSelector((state) => state.marketData);

  useEffect(() => {
    // Fetch initial market data for some default symbols
    const symbols = ['AAPL', 'MSFT', 'TSLA'];
    symbols.forEach(symbol => {
      dispatch(getMarketData(symbol));
    });

    // Listen for real-time market data updates
    socket.on('market_data_update', (data) => {
      // Dispatch an action to update the Redux store with real-time data
      // You'll need to define this action in your marketDataSlice
      // For now, let's assume updateMarketData action exists
      dispatch(getMarketData(data.symbol)); // Re-fetch for simplicity, ideally update specific fields
    });

    return () => {
      socket.off('market_data_update');
    };
  }, [dispatch]);

  if (loading) return <p>Loading market data...</p>;
  if (error.message) return <p>Error: {error.message}</p>;

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Market Watch</h3>
        <button className="text-sm text-green-600 font-medium">View All</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {marketData.map((stock) => (
          <div key={stock.symbol} className="stock-card bg-white border border-gray-200 rounded-lg p-4 transition duration-300">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold">{stock.symbol}</h4>
                <p className="text-sm text-gray-500">{stock.name}</p>
              </div>
              {/* You might want to add dynamic icons based on symbol */}
              <div className={`${stock.dayChangePercentage >= 0 ? 'bg-green-100' : 'bg-red-100'} p-1 rounded`}>
                <i className={`fas fa-${stock.dayChangePercentage >= 0 ? 'arrow-up text-green-600' : 'arrow-down text-red-600'}`}></i>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xl font-bold">${stock.currentPrice ? stock.currentPrice.toFixed(2) : 'N/A'}</p>
              <div className="flex items-center mt-1">
                <span className={`${stock.dayChangePercentage >= 0 ? 'text-green-500' : 'text-red-500'} text-sm font-medium flex items-center`}>
                  <i className={`fas fa-${stock.dayChangePercentage >= 0 ? 'arrow-up' : 'arrow-down'} mr-1`}></i> {stock.dayChangePercentage ? stock.dayChangePercentage.toFixed(2) : 'N/A'}%
                </span>
                <span className="text-gray-500 text-sm ml-2">Today</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketWatch;