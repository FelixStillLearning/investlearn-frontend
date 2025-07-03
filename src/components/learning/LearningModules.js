import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLearningModules } from '../../store/slices/learningModuleSlice';

const LearningModules = () => {
  const dispatch = useDispatch();
  const { modules, loading, error } = useSelector((state) => state.learningModule);

  useEffect(() => {
    dispatch(getLearningModules());
  }, [dispatch]);

  if (loading) return <p>Loading learning modules...</p>;
  if (error.message) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Learning Modules</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <div key={module._id} className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{module.title}</h2>
            <p className="text-gray-600 mb-4">{module.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
              <span>Category: {module.category}</span>
              <span>Difficulty: {module.difficulty}</span>
              <span>Est. Time: {module.estimatedTime} mins</span>
            </div>
            <Link
              to={`/learn/${module.slug}`}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 inline-block"
            >
              Start Learning
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningModules;
