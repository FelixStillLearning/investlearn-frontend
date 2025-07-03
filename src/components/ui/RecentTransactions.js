import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../../store/slices/transactionSlice';
import { format } from 'date-fns';

const RecentTransactions = ({ portfolioId }) => {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector(state => state.transaction);

  useEffect(() => {
    dispatch(getTransactions(portfolioId));
  }, [dispatch, portfolioId]);

  if (loading) return <p>Loading transactions...</p>;
  if (error.message) return <p>Error: {error.message}</p>;

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Recent Transactions</h3>
        <button className="text-sm text-green-600 font-medium">View All</button>
      </div>
      <div className="space-y-4">
        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet.</p>
        ) : (
          transactions.map(transaction => (
            <div key={transaction._id} className="flex justify-between items-center py-2 border-b border-gray-100">
              <div className="flex items-center">
                <div className={`${transaction.type === 'buy' ? 'bg-blue-100' : transaction.type === 'sell' ? 'bg-red-100' : 'bg-green-100'} p-2 rounded-lg mr-3`}>
                  <i className={`fas fa-${transaction.type === 'buy' ? 'arrow-up text-blue-600' : transaction.type === 'sell' ? 'arrow-down text-red-600' : 'coins text-green-600'}`}></i>
                </div>
                <div>
                  <p className="font-medium">{transaction.type === 'buy' ? `Bought ${transaction.symbol}` : transaction.type === 'sell' ? `Sold ${transaction.symbol}` : `Dividend ${transaction.symbol}`}</p>
                  <p className="text-sm text-gray-500">{transaction.quantity} shares @ ${transaction.price?.toFixed(2)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{transaction.type === 'sell' ? '+' : '-'}${transaction.total?.toFixed(2)}</p>
                <p className="text-sm text-gray-500">{format(new Date(transaction.createdAt), 'MMM dd, hh:mm a')}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;