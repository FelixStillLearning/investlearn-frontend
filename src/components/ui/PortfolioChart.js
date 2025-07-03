import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PortfolioPerformanceChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Portfolio Value',
        data: [1000, 1100, 1050, 1200, 1300, 1250],
        borderColor: '#059669',
        backgroundColor: 'rgba(5, 150, 105, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Portfolio Performance',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          borderDash: [8, 4],
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Portfolio Performance</h3>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm rounded-lg bg-gray-100 text-gray-700">1M</button>
          <button className="px-3 py-1 text-sm rounded-lg bg-green-600 text-white">3M</button>
          <button className="px-3 py-1 text-sm rounded-lg bg-gray-100 text-gray-700">1Y</button>
          <button className="px-3 py-1 text-sm rounded-lg bg-gray-100 text-gray-700">All</button>
        </div>
      </div>
      <div className="portfolio-chart h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default PortfolioPerformanceChart;