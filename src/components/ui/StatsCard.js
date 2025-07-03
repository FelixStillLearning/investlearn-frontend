
import React from 'react';

const StatsCard = ({ icon, title, value, change, changeType, xp, progress, challenge, leaderboard }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          <div className="flex items-center mt-2">
            {change && (
              <span className={`text-${changeType === 'positive' ? 'green' : 'red'}-500 text-sm font-medium flex items-center`}>
                <i className={`fas fa-arrow-${changeType === 'positive' ? 'up' : 'down'} mr-1`}></i> {change}
              </span>
            )}
            {xp && <span className="text-blue-500 text-sm font-medium">{xp}</span>}
            {challenge && <span className="text-purple-500 text-sm font-medium">{leaderboard}</span>}
            {progress && (
              <div className="relative w-12 h-12">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle className="text-gray-200" strokeWidth="8" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                  <circle className="progress-ring__circle text-blue-500" strokeWidth="8" strokeLinecap="round" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" style={{ strokeDashoffset: `calc(251.2 - (251.2 * ${progress}) / 100)` }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold">{progress}%</span>
                </div>
              </div>
            )}
            <span className="text-gray-500 text-sm ml-2">Today</span>
          </div>
        </div>
        <div className={`bg-${icon.color}-100 p-3 rounded-lg`}>
          <i className={`fas fa-${icon.name} text-${icon.color}-600 text-xl`}></i>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
