import React from 'react';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl font-bold text-gradient mb-4">
            🚀 InvestLearn Platform
          </h1>
          <p className="text-xl text-secondary-600 mb-8">
            Micro-Investment Learning Platform
          </p>
          
          <div className="max-w-md mx-auto mb-12">
            <div className="card animate-slide-up">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Welcome to InvestLearn! 🎉
              </h2>
              <p className="text-gray-600 mb-6">
                Your MERN stack setup is complete and ready for development.
              </p>
              
              <div className="space-y-3">
                <button className="btn-primary w-full">
                  🎯 Get Started
                </button>
                <button className="btn-outline w-full">
                  📚 Learn More
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
            <div className="card text-center group hover:scale-105 transition-transform">
              <div className="text-4xl mb-4 group-hover:animate-bounce-gentle">📈</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800">Smart Investing</h3>
              <p className="text-sm text-gray-600">
                Learn investment strategies with micro-investments starting from $1
              </p>
              <div className="mt-3">
                <span className="badge-success">Coming Soon</span>
              </div>
            </div>
            
            <div className="card text-center group hover:scale-105 transition-transform">
              <div className="text-4xl mb-4 group-hover:animate-bounce-gentle">🎯</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800">Goal Tracking</h3>
              <p className="text-sm text-gray-600">
                Set and track your financial goals with real-time progress monitoring
              </p>
              <div className="mt-3">
                <span className="badge-warning">In Development</span>
              </div>
            </div>
            
            <div className="card text-center group hover:scale-105 transition-transform">
              <div className="text-4xl mb-4 group-hover:animate-bounce-gentle">📊</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800">Analytics</h3>
              <p className="text-sm text-gray-600">
                Detailed insights and performance analytics for your portfolio
              </p>
              <div className="mt-3">
                <span className="badge-success">Ready</span>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                🛠️ Development Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Backend API (Express + MongoDB)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Frontend React App</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Tailwind CSS Styling</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-700">Authentication System</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-gray-700">Portfolio Management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-gray-700">Real-time Market Data</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
                <p className="text-sm text-primary-700">
                  <strong>Next Step:</strong> Setup MongoDB and create authentication system
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
