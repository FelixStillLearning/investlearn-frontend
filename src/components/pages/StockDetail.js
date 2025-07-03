import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMarketData } from '../../store/slices/marketDataSlice';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockDetail = () => {
  const { symbol } = useParams();
  const dispatch = useDispatch();
  const { marketData, loading, error } = useSelector((state) => state.marketData);

  const stock = marketData.find(item => item.symbol === symbol.toUpperCase());

  useEffect(() => {
    if (symbol) {
      dispatch(getMarketData(symbol));
    }
  }, [dispatch, symbol]);

  if (loading) return <p>Loading stock data...</p>;
  if (error.message) return <p>Error: {error.message}</p>;
  if (!stock) return <p>Stock not found.</p>;

  const chartData = {
    labels: stock.priceHistory ? stock.priceHistory.map(data => new Date(data.date).toLocaleDateString()) : [],
    datasets: [
      {
        label: `${stock.symbol} Price`,
        data: stock.priceHistory ? stock.priceHistory.map(data => data.close) : [],
        borderColor: '#059669',
        backgroundColor: 'rgba(5, 150, 105, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${stock.name} Price History`,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          borderDash: [8, 4],
        },
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{stock.name} ({stock.symbol})</h1>
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Current Price</p>
            <h2 className="text-4xl font-bold text-green-600">${stock.currentPrice.toFixed(2)}</h2>
            <p className={`${stock.dayChange >= 0 ? 'text-green-500' : 'text-red-500'} text-lg font-medium`}>
              {stock.dayChange >= 0 ? '+' : ''}{stock.dayChange.toFixed(2)} ({stock.dayChangePercentage.toFixed(2)}%)
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Volume</p>
            <p className="text-xl font-bold">{stock.volume ? stock.volume.toLocaleString() : 'N/A'}</p>
            <p className="text-gray-500 text-sm mt-2">Market Cap: {stock.marketCap ? stock.marketCap.toLocaleString() : 'N/A'}</p>
            <p className="text-gray-500 text-sm">P/E Ratio: {stock.peRatio ? stock.peRatio.toFixed(2) : 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Price History</h3>
        <div className="h-96">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Add more details like fundamentals, news, etc. */}
    </div>
  );
};

export default StockDetail;
