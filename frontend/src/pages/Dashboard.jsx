import { useState, useEffect } from 'react';
import api from '../api/api';
import { Users, Heart, ArrowUpRight, DollarSign, Receipt, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({ orphans: 0, donors: 0, totalFunds: 0, totalExpenses: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [orphansRes, donorsRes, fundsRes, expRes] = await Promise.all([
          api.get('/orphans'),
          api.get('/donors'),
          api.get('/donations'),
          api.get('/expenses')
        ]);
        
        const totalF = fundsRes.data.reduce((sum, fund) => sum + parseFloat(fund.amount), 0);
        const totalE = expRes.data.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
        
        setStats({
          orphans: orphansRes.data.length,
          donors: donorsRes.data.length,
          totalFunds: totalF,
          totalExpenses: totalE
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Orphans</p>
            <p className="text-2xl font-bold text-gray-900">{stats.orphans}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4">
          <div className="p-3 bg-pink-100 text-pink-600 rounded-lg">
            <Heart size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Donors</p>
            <p className="text-2xl font-bold text-gray-900">{stats.donors}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Funds</p>
            <p className="text-2xl font-bold text-gray-900">${stats.totalFunds.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-lg">
            <Receipt size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Expenses</p>
            <p className="text-2xl font-bold text-gray-900">${stats.totalExpenses.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-indigo-100 text-indigo-600 rounded-xl">
            <TrendingUp size={32} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">Net Balance</p>
            <p className={`text-4xl font-bold ${(stats.totalFunds - stats.totalExpenses) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${(stats.totalFunds - stats.totalExpenses).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <a href="/orphans" className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <span className="font-medium text-gray-700">Manage Orphans</span>
            <ArrowUpRight size={20} className="text-gray-400" />
          </a>
          <a href="/donors" className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <span className="font-medium text-gray-700">Manage Donors</span>
            <ArrowUpRight size={20} className="text-gray-400" />
          </a>
          <a href="/funds" className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <span className="font-medium text-gray-700">Manage Funds</span>
            <ArrowUpRight size={20} className="text-gray-400" />
          </a>
          <a href="/expenses" className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <span className="font-medium text-gray-700">Manage Expenses</span>
            <ArrowUpRight size={20} className="text-gray-400" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
