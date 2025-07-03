import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBadges } from '../../store/slices/badgeSlice';

const Badges = () => {
  const dispatch = useDispatch();
  const { badges, loading, error } = useSelector((state) => state.badge);

  useEffect(() => {
    dispatch(getBadges());
  }, [dispatch]);

  if (loading) return <p>Loading badges...</p>;
  if (error.message) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Recent Badges</h3>
        <button className="text-sm text-green-600 font-medium">View All</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {badges.length === 0 ? (
          <p className="text-gray-500">No badges earned yet.</p>
        ) : (
          badges.map((badge) => (
            <div key={badge._id} className="flex flex-col items-center">
              <div className="badge-shadow bg-yellow-100 p-3 rounded-full w-14 h-14 flex items-center justify-center">
                <i className={`${badge.icon} text-yellow-600 text-xl`}></i>
              </div>
              <p className="text-xs text-center mt-2 font-medium">{badge.name}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Badges;