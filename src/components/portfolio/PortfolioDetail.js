import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPortfolioById, copyPortfolio, updatePortfolio } from '../../store/slices/portfolioSlice';
import RecentTransactions from '../ui/RecentTransactions';
import CommentSection from '../ui/CommentSection';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PortfolioDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { portfolio, loading, error } = useSelector((state) => state.portfolio);

  useEffect(() => {
    if (id) {
      dispatch(getPortfolioById(id));
    }
  }, [dispatch, id]);

  const handleCopyPortfolio = async () => {
    try {
      await dispatch(copyPortfolio(id)).unwrap();
      navigate('/dashboard'); // Redirect to dashboard after successful copy
    } catch (err) {
      console.error('Failed to copy portfolio:', err);
      // TODO: Display error message to user
    }
  };

  const handleTogglePublic = async () => {
    try {
      await dispatch(updatePortfolio({ id, settings: { isPublic: !portfolio.settings.isPublic } })).unwrap();
    } catch (err) {
      console.error('Failed to toggle portfolio visibility:', err);
      // TODO: Display error message to user
    }
  };

  if (loading) return <p>Loading portfolio...</p>;
  if (error.message) return <p>Error: {error.message}</p>;
  if (!portfolio) return <p>Portfolio not found.</p>;

  const allocationData = {
    labels: portfolio.allocations.map(alloc => alloc.symbol),
    datasets: [
      {
        data: portfolio.allocations.map(alloc => alloc.marketValue),
        backgroundColor: [
          '#059669',
          '#3B82F6',
          '#DC2626',
          '#F59E0B',
          '#8B5CF6',
          '#EC4899',
        ],
        borderColor: [
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
        ],
        borderWidth: 1,
      },
    ],
  };

  const performanceChartData = {
    labels: portfolio.history.map(entry => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Portfolio Value',
        data: portfolio.history.map(entry => entry.totalValue),
        borderColor: '#059669',
        backgroundColor: 'rgba(5, 150, 105, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{portfolio.name}</h1>
      <p className="text-gray-600 mb-6">{portfolio.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Current Value</h3>
          <p className="text-4xl font-bold text-green-600">${portfolio.performance.totalValue.toFixed(2)}</p>
          <p className={`${portfolio.performance.dayChangePercentage >= 0 ? 'text-green-500' : 'text-red-500'} text-lg font-medium`}>
            {portfolio.performance.dayChange >= 0 ? '+' : ''}{portfolio.performance.dayChange.toFixed(2)} ({portfolio.performance.dayChangePercentage.toFixed(2)}%)
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Total Return</h3>
          <p className={`${portfolio.performance.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'} text-4xl font-bold`}>
            {portfolio.performance.totalReturn >= 0 ? '+' : ''}{portfolio.performance.totalReturn.toFixed(2)}
          </p>
          <p className={`${portfolio.performance.returnPercentage >= 0 ? 'text-green-500' : 'text-red-500'} text-lg font-medium`}>
            ({portfolio.performance.returnPercentage.toFixed(2)}%)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Asset Allocation</h3>
          <div className="h-80">
            <Pie data={allocationData} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Performance History</h3>
          <div className="h-80">
            <Line data={performanceChartData} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Holdings</h3>
        {portfolio.allocations.length === 0 ? (
          <p className="text-gray-500">No holdings in this portfolio yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Cost</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Value</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gain/Loss</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Gain/Loss</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {portfolio.allocations.map(holding => (
                  <tr key={holding.symbol}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{holding.symbol}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{holding.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{holding.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${holding.averagePrice.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${holding.currentPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${holding.marketValue.toFixed(2)}</td>
                    <td className={`${holding.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'} px-6 py-4 whitespace-nowrap text-sm font-medium`}>
                      {holding.gainLoss >= 0 ? '+' : ''}{holding.gainLoss.toFixed(2)}
                    </td>
                    <td className={`${holding.gainLossPercentage >= 0 ? 'text-green-600' : 'text-red-600'} px-6 py-4 whitespace-nowrap text-sm font-medium`}>
                      {holding.gainLossPercentage >= 0 ? '+' : ''}{holding.gainLossPercentage.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <RecentTransactions portfolioId={id} />
      <CommentSection targetType="portfolio" targetId={id} />

      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={handleCopyPortfolio}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
        >
          Copy Portfolio
        </button>
        <button
          onClick={handleTogglePublic}
          className={`${portfolio.settings.isPublic ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200`}
        >
          {portfolio.settings.isPublic ? 'Make Private' : 'Make Public'}
        </button>
        <Link
          to={`/portfolio/${id}/trade`}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
        >
          Trade Stocks
        </Link>
      </div>
    </div>
  );
};

export default PortfolioDetail;