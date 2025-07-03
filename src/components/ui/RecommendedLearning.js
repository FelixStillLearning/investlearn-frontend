import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLearningModules } from '../../store/slices/learningModuleSlice';

const RecommendedLearning = () => {
  const dispatch = useDispatch();
  const { modules, loading, error } = useSelector((state) => state.learningModule);

  useEffect(() => {
    dispatch(getLearningModules());
  }, [dispatch]);

  if (loading) return <p>Loading recommended learning...</p>;
  if (error.message) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Continue Learning</h3>
        <Link to="/learn" className="text-sm text-green-600 font-medium">Browse All</Link>
      </div>
      <div className="space-y-4">
        {modules.length === 0 ? (
          <p className="text-gray-500">No learning modules available yet.</p>
        ) : (
          modules.slice(0, 3).map((module) => ( // Display top 3 modules for recommendation
            <div key={module._id} className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-blue-800">{module.title}</h4>
                  <p className="text-sm text-blue-600 mt-1">{module.description.substring(0, 50)}...</p>
                  <div className="flex items-center mt-3">
                    <div className="w-full bg-blue-200 rounded-full h-1.5">
                      {/* Assuming module has a progress field, otherwise this needs to be calculated */}
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${module.progress || 0}%` }}></div>
                    </div>
                    <span className="text-xs text-blue-600 ml-2">{module.progress || 0}%</span>
                  </div>
                </div>
                <Link to={`/learn/${module.slug}`} className="bg-blue-600 text-white p-2 rounded-lg">
                  <i className="fas fa-play"></i>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecommendedLearning;