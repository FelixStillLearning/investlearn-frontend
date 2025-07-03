import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPortfolios } from '../../store/slices/portfolioSlice';

const PortfolioList = () => {
  const dispatch = useDispatch();
  const { portfolios, loading, error } = useSelector((state) => state.portfolio);

  useEffect(() => {
    dispatch(getPortfolios());
  }, [dispatch]);

  if (loading) return <p>Loading portfolios...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Portfolios</h1>
        <Link to="/create-portfolio" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200">
          Create Portfolio
        </Link>
      </div>
      {portfolios.length === 0 ? (
        <p className="text-gray-500">You don't have any portfolios yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio) => (
            <Link to={`/portfolio/${portfolio._id}`} key={portfolio._id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition duration-200 block">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{portfolio.name}</h2>
              <p className="text-gray-600 mb-4">{portfolio.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-green-600">${portfolio.performance.totalValue.toFixed(2)}</p>
                <p className={`${portfolio.performance.dayChangePercentage >= 0 ? 'text-green-500' : 'text-red-500'} text-lg font-medium`}>
                  {portfolio.performance.dayChange >= 0 ? '+' : ''}{portfolio.performance.dayChange.toFixed(2)} ({portfolio.performance.dayChangePercentage.toFixed(2)}%)
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioList;