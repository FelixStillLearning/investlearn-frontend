import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createPortfolio } from '../../store/slices/portfolioSlice';

const CreatePortfolio = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'simulation',
    isPublic: false,
    riskLevel: 'moderate'
  });

  const { name, description, type, isPublic, riskLevel } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onCheckboxChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.checked });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(createPortfolio({ name, description, type, settings: { isPublic, riskLevel } }))
      .unwrap()
      .then(() => {
        navigate('/dashboard'); // Redirect to dashboard after successful creation
      })
      .catch(error => {
        console.error('Failed to create portfolio:', error);
        // TODO: Display error message to user
      });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Portfolio</h1>
      <form onSubmit={onSubmit} className="bg-white rounded-xl shadow-sm p-6 max-w-2xl mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Portfolio Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., My First Simulation"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
            placeholder="A brief description of your portfolio goals"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">
            Portfolio Type
          </label>
          <select
            id="type"
            name="type"
            value={type}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="simulation">Simulation</option>
            <option value="real">Real (Coming Soon)</option>
            <option value="challenge">Challenge (Coming Soon)</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="riskLevel" className="block text-gray-700 text-sm font-bold mb-2">
            Risk Level
          </label>
          <select
            id="riskLevel"
            name="riskLevel"
            value={riskLevel}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="conservative">Conservative</option>
            <option value="moderate">Moderate</option>
            <option value="aggressive">Aggressive</option>
          </select>
        </div>

        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="isPublic"
            name="isPublic"
            checked={isPublic}
            onChange={onCheckboxChange}
            className="mr-2 leading-tight"
          />
          <label htmlFor="isPublic" className="text-gray-700 text-sm font-bold">
            Make this portfolio public
          </label>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
          >
            Create Portfolio
          </button>
          <Link to="/dashboard" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreatePortfolio;