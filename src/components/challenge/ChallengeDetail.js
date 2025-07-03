import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getChallengeById, joinChallenge, getChallengeHistoryById } from '../../store/slices/challengeSlice';
import { getPortfolios } from '../../store/slices/portfolioSlice';
import { format } from 'date-fns';

const ChallengeDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentChallenge, loading, error } = useSelector((state) => state.challenge);
  const { portfolios, loading: portfoliosLoading } = useSelector((state) => state.portfolio);
  const [selectedPortfolio, setSelectedPortfolio] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(getChallengeById(id));
      dispatch(getPortfolios());
      dispatch(getChallengeHistoryById(id)); // Fetch challenge history
    }
  }, [dispatch, id]);

  const handleJoinChallenge = async () => {
    if (!selectedPortfolio) {
      alert('Please select a portfolio to join the challenge.');
      return;
    }
    try {
      await dispatch(joinChallenge({ challengeId: id, portfolioId: selectedPortfolio })).unwrap();
      alert('Successfully joined the challenge!');
      // Optionally refresh challenge data or redirect
    } catch (err) {
      console.error('Failed to join challenge:', err);
      alert(`Failed to join challenge: ${err.msg || 'Unknown error'}`);
    }
  };

  if (loading || portfoliosLoading) return <p>Loading challenge details...</p>;
  if (error.message) return <p>Error: {error.message}</p>;
  if (!currentChallenge) return <p>Challenge not found.</p>;

  const isJoined = currentChallenge.participants.some(p => p.userId === currentChallenge.createdBy); // Simplified check

  return (
    <div className="container mx-auto px-4 py-6">
      <Link to="/challenges" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Challenges</Link>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{currentChallenge.title}</h1>
      <p className="text-gray-600 mb-6">{currentChallenge.description}</p>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Challenge Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><strong>Type:</strong> {currentChallenge.type}</p>
          <p><strong>Status:</strong> {currentChallenge.status}</p>
          <p><strong>Duration:</strong> {currentChallenge.rules.duration} days</p>
          <p><strong>Starting Capital:</strong> ${currentChallenge.rules.startingCapital.toFixed(2)}</p>
          <p><strong>Start Date:</strong> {format(new Date(currentChallenge.startDate), 'MMM dd, yyyy')}</p>
          <p><strong>End Date:</strong> {format(new Date(currentChallenge.endDate), 'MMM dd, yyyy')}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Leaderboard</h3>
        {currentChallenge.leaderboard.length === 0 ? (
          <p className="text-gray-500">Leaderboard is empty. Be the first to join!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return (%)</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return ($)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentChallenge.leaderboard.map((entry) => (
                  <tr key={entry.userId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.rank}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.username}</td>
                    <td className={`${entry.returnPercentage >= 0 ? 'text-green-600' : 'text-red-600'} px-6 py-4 whitespace-nowrap text-sm font-medium`}>
                      {entry.returnPercentage.toFixed(2)}%
                    </td>
                    <td className={`${entry.return >= 0 ? 'text-green-600' : 'text-red-600'} px-6 py-4 whitespace-nowrap text-sm font-medium`}>
                      ${entry.return.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!isJoined && currentChallenge.status === 'upcoming' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Join Challenge</h3>
          <div className="mb-4">
            <label htmlFor="portfolioSelect" className="block text-gray-700 text-sm font-bold mb-2">
              Select Portfolio to Use:
            </label>
            <select
              id="portfolioSelect"
              value={selectedPortfolio}
              onChange={(e) => setSelectedPortfolio(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">-- Select a portfolio --</option>
              {portfolios.map(port => (
                <option key={port._id} value={port._id}>{port.name}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleJoinChallenge}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
          >
            Join Challenge
          </button>
        </div>
      )}

      {currentChallenge.history && currentChallenge.history.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Leaderboard History</h3>
          {currentChallenge.history.map((snapshot, index) => (
            <div key={index} className="mb-6 border-b pb-4 last:border-b-0 last:pb-0">
              <h4 className="text-md font-semibold text-gray-700 mb-2">Snapshot on {format(new Date(snapshot.date), 'MMM dd, yyyy HH:mm')}</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return (%)</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return ($)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {snapshot.leaderboardSnapshot.map((entry) => (
                      <tr key={entry.userId}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.rank}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.username}</td>
                        <td className={`${entry.returnPercentage >= 0 ? 'text-green-600' : 'text-red-600'} px-6 py-4 whitespace-nowrap text-sm font-medium`}>
                          {entry.returnPercentage.toFixed(2)}%
                        </td>
                        <td className={`${entry.return >= 0 ? 'text-green-600' : 'text-red-600'} px-6 py-4 whitespace-nowrap text-sm font-medium`}>
                          ${entry.return.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChallengeDetail;
