import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserChallengeHistory } from '../../store/slices/challengeSlice';
import { Link } from 'react-router-dom';

const ChallengeHistory = () => {
  const dispatch = useDispatch();
  const { history, loading, error } = useSelector((state) => state.challenge);

  useEffect(() => {
    dispatch(getUserChallengeHistory());
  }, [dispatch]);

  if (loading) return <p>Loading challenge history...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Challenge History</h1>
      {history.length === 0 ? (
        <p className="text-gray-500">You haven't participated in any completed challenges yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((challenge) => (
            <div key={challenge._id} className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{challenge.title}</h2>
              <p className="text-gray-600 mb-4">{challenge.description}</p>
              <div className="text-sm text-gray-500 mb-2">
                <p>Type: {challenge.type}</p>
                <p>Status: {challenge.status}</p>
                <p>Dates: {new Date(challenge.startDate).toLocaleDateString()} - {new Date(challenge.endDate).toLocaleDateString()}</p>
              </div>
              {challenge.yourPerformance && (
                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <h3 className="font-bold text-gray-700">Your Performance:</h3>
                  <p>Rank: {challenge.yourPerformance.rank || 'N/A'}</p>
                  <p>Return: {challenge.yourPerformance.return?.toFixed(2) || 'N/A'}</p>
                  <p>Return %: {challenge.yourPerformance.returnPercentage?.toFixed(2) || 'N/A'}%</p>
                  {challenge.yourPortfolio && (
                    <p>Portfolio: <Link to={`/portfolio/${challenge.yourPortfolio._id}`} className="text-blue-500 hover:underline">{challenge.yourPortfolio.name}</Link></p>
                  )}
                </div>
              )}
              {challenge.finalLeaderboard && challenge.finalLeaderboard.length > 0 && (
                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <h3 className="font-bold text-gray-700">Final Leaderboard:</h3>
                  <ul className="list-disc list-inside text-sm">
                    {challenge.finalLeaderboard.map((entry, index) => (
                      <li key={index}>{entry.rank}. {entry.username} - {entry.returnPercentage?.toFixed(2)}%</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChallengeHistory;