import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Heart, LogOut, DollarSign, Receipt } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Orphans', path: '/orphans', icon: Users },
    { name: 'Staff', path: '/staff', icon: Users },
    { name: 'Salaries', path: '/salaries', icon: DollarSign },
    { name: 'Donors', path: '/donors', icon: Heart },
    { name: 'Funds', path: '/funds', icon: DollarSign },
    { name: 'Expenses', path: '/expenses', icon: Receipt },
    { name: 'Adoptions', path: '/adoptions', icon: Users },
    { name: 'Volunteers', path: '/volunteers', icon: Heart },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">OMS Portal</h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
          className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
