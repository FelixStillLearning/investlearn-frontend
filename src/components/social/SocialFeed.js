import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSocialFeed } from '../../store/slices/socialSlice';

const SocialFeed = () => {
  const dispatch = useDispatch();
  const { feed, loading, error } = useSelector((state) => state.social);

  useEffect(() => {
    dispatch(getSocialFeed());
  }, [dispatch]);

  if (loading) return <p>Loading social feed...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Social Feed</h3>
      {feed.length === 0 ? (
        <p className="text-gray-500">No recent activity.</p>
      ) : (
        <div className="space-y-4">
          {feed.map((entry) => (
            <div key={entry._id} className="flex items-start space-x-3">
              <img
                src={entry.userId.profile.avatar || 'https://via.placeholder.com/40'}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-gray-800 font-medium">{entry.userId.username}</p>
                <p className="text-gray-600 text-sm">{entry.message}</p>
                <p className="text-gray-500 text-xs">{new Date(entry.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialFeed;