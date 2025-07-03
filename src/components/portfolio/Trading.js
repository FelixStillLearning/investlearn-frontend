import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getMarketData, searchMarketData } from '../../store/slices/marketDataSlice';
import { getPortfolioById, buyStock, sellStock } from '../../store/slices/portfolioSlice';

const Trading = () => {
  const { id } = useParams(); // Portfolio ID
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { portfolio, loading: portfolioLoading, error: portfolioError } = useSelector(state => state.portfolio);
  const { marketData, loading: marketDataLoading, error: marketDataError } = useSelector(state => state.marketData);

  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [isBuy, setIsBuy] = useState(true); // true for Buy, false for Sell
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (id) {
      dispatch(getPortfolioById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (searchQuery.length > 2) {
      dispatch(searchMarketData(searchQuery)).then(res => {
        if (res.payload) {
          setSearchResults(res.payload);
        }
      });
    } else {
      setSearchResults([]);
    }
  }, [dispatch, searchQuery]);

  const onSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  const onSelectStock = (selectedSymbol) => {
    setSymbol(selectedSymbol);
    setSearchQuery(''); // Clear search query
    setSearchResults([]); // Clear search results
    dispatch(getMarketData(selectedSymbol)); // Fetch detailed data for selected stock
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!symbol || quantity <= 0) {
      alert('Please enter a valid symbol and quantity');
      return;
    }

    try {
      if (isBuy) {
        await dispatch(buyStock({ portfolioId: id, symbol, quantity })).unwrap();
      } else {
        await dispatch(sellStock({ portfolioId: id, symbol, quantity })).unwrap();
      }
      navigate(`/portfolio/${id}`); // Redirect to portfolio detail page
    } catch (err) {
      console.error('Trading failed:', err);
      alert(`Trading failed: ${err.msg || 'Unknown error'}`);
    }
  };

  const currentStockData = marketData.find(item => item.symbol === symbol.toUpperCase());

  if (portfolioLoading) return <p>Loading portfolio...</p>;
  if (portfolioError) return <p>Error: {portfolioError.msg}</p>;
  if (!portfolio) return <p>Portfolio not found.</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{isBuy ? 'Buy' : 'Sell'} Stocks for {portfolio.name}</h1>

      <form onSubmit={onSubmit} className="bg-white rounded-xl shadow-sm p-6 max-w-2xl mx-auto">
        <div className="mb-4">
          <label htmlFor="symbol" className="block text-gray-700 text-sm font-bold mb-2">
            Stock Symbol <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="symbol"
            name="symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            onFocus={(e) => setSearchQuery(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., AAPL"
            required
          />
          {searchQuery.length > 2 && searchResults.length > 0 && (
            <div className="absolute z-10 bg-white border border-gray-200 mt-1 w-full rounded-md shadow-lg max-h-60 overflow-y-auto">
              {searchResults.map(result => (
                <div
                  key={result.symbol}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                  onClick={() => onSelectStock(result.symbol)}
                >
                  <span>{result.symbol} - {result.name}</span>
                  <span className="text-gray-500 text-sm">${result.currentPrice?.toFixed(2) || 'N/A'}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {currentStockData && (
          <div className="mb-4 p-4 bg-gray-50 rounded-md">
            <p className="text-lg font-bold">{currentStockData.name} ({currentStockData.symbol})</p>
            <p className="text-md">Current Price: ${currentStockData.currentPrice?.toFixed(2) || 'N/A'}</p>
            <p className={`${currentStockData.dayChangePercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {currentStockData.dayChange?.toFixed(2) || 'N/A'} ({currentStockData.dayChangePercentage?.toFixed(2) || 'N/A'}%) Today
            </p>
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">
            Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., 10"
            min="1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Action
          </label>
          <div className="flex items-center">
            <label className="mr-4">
              <input
                type="radio"
                name="actionType"
                value="buy"
                checked={isBuy}
                onChange={() => setIsBuy(true)}
                className="mr-2 leading-tight"
              />
              <span className="text-gray-700">Buy</span>
            </label>
            <label>
              <input
                type="radio"
                name="actionType"
                value="sell"
                checked={!isBuy}
                onChange={() => setIsBuy(false)}
                className="mr-2 leading-tight"
              />
              <span className="text-gray-700">Sell</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className={`${isBuy ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200`}
          >
            {isBuy ? 'Buy Stock' : 'Sell Stock'}
          </button>
          <Link to={`/portfolio/${id}`} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Trading;
