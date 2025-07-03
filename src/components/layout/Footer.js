
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="gradient-bg text-white p-2 rounded-lg">
                <i className="fas fa-chart-line text-xl"></i>
              </div>
              <h2 className="text-xl font-bold">Invest<span className="text-green-400">Learn</span></h2>
            </div>
            <p className="text-gray-400 text-sm">Learn to invest with confidence. Start small, learn big.</p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Learn</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Courses</a></li>
              <li><a href="#" className="hover:text-white">Tutorials</a></li>
              <li><a href="#" className="hover:text-white">Glossary</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Invest</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Portfolio</a></li>
              <li><a href="#" className="hover:text-white">Market Data</a></li>
              <li><a href="#" className="hover:text-white">Challenges</a></li>
              <li><a href="#" className="hover:text-white">Leaderboard</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Legal</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2023 InvestLearn. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
