import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getChallenges } from '../../store/slices/challengeSlice';
import { format } from 'date-fns';

const ChallengeList = () => {
  const dispatch = useDispatch();
  const { challenges, loading, error } = useSelector((state) => state.challenge);

  useEffect(() => {
    dispatch(getChallenges());
  }, [dispatch]);

  if (loading) return <p>Loading challenges...</p>;
  if (error.message) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Challenges</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.length === 0 ? (
          <p className="text-gray-500">No challenges available yet.</p>
        ) : (
          challenges.map((challenge) => (
            <div key={challenge._id} className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{challenge.title}</h2>
              <p className="text-gray-600 mb-4">{challenge.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                <span>Type: {challenge.type}</span>
                <span>Status: {challenge.status}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>Duration: {challenge.rules.duration} days</span>
                <span>Starts: {format(new Date(challenge.startDate), 'MMM dd, yyyy')}</span>
              </div>
              <Link
                to={`/challenges/${challenge._id}`}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 inline-block"
              >
                View Challenge
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChallengeList;
