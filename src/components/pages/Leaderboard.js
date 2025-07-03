import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLeaderboard } from '../../store/slices/authSlice';

const Leaderboard = () => {
  const dispatch = useDispatch();
  const { leaderboard, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getLeaderboard());
  }, [dispatch]);

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Leaderboard</h1>
      {leaderboard.length === 0 ? (
        <p className="text-gray-500">No users on the leaderboard yet.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">XP</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaderboard.map((user, index) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                    <img src={user.profile.avatar || 'https://via.placeholder.com/30'} alt="Avatar" className="w-8 h-8 rounded-full object-cover mr-2" />
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.gamification.level}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.gamification.xp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;