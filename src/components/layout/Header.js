
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="gradient-bg text-white p-2 rounded-lg">
            <i className="fas fa-chart-line text-xl"></i>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Invest<span className="text-green-600">Learn</span></h1>
        </div>
        
        <nav className="hidden md:flex space-x-6">
                <Link to="/" className="text-green-600 font-medium">Dashboard</Link>
                <Link to="/learn" className="text-gray-600 hover:text-green-600">Learn</Link>
                <Link to="/portfolio" className="text-gray-600 hover:text-green-600">Portfolio</Link>
                <Link to="/challenges" className="text-gray-600 hover:text-green-600">Challenges</Link>
                <Link to="/market" className="text-gray-600 hover:text-green-600">Market</Link>
            </nav>
            
            <div className="flex items-center space-x-4">
                <button className="md:hidden text-gray-600">
                    <i className="fas fa-bars text-xl"></i>
                </button>
                {isAuthenticated ? (
                    <>
                        <div className="relative">
                            <button className="text-gray-600 hover:text-green-600">
                                <i className="fas fa-bell text-xl"></i>
                                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                            </button>
                        </div>
                        <div className="hidden md:flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-600 font-medium">{user && user.username.charAt(0).toUpperCase()}</span>
                            </div>
                            <span className="text-gray-700">{user && user.username}</span>
                            <button onClick={onLogout} className="text-gray-600 hover:text-green-600">
                                <i className="fas fa-sign-out-alt text-xl"></i>
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-gray-600 hover:text-green-600">Login</Link>
                        <Link to="/register" className="text-gray-600 hover:text-green-600">Register</Link>
                    </>
                )}
            </div>
      </div>
    </header>
  );
};

export default Header;
