
import React from 'react';

const WelcomeBanner = ({ username }) => {
  return (
    <div className="gradient-bg text-white rounded-xl p-6 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Welcome back, {username}!</h2>
          <p className="opacity-90">Continue your investment learning journey today</p>
        </div>
        <button className="mt-4 md:mt-0 bg-white text-green-600 font-medium px-6 py-2 rounded-lg hover:bg-opacity-90 transition">
          Start Learning
        </button>
      </div>
    </div>
  );
};

export default WelcomeBanner;
