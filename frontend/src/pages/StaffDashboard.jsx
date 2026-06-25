import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const staffId = localStorage.getItem('staffId');
        
        if (!token || !staffId) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`http://localhost:8080/api/staff/${staffId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setStaff(response.data);

        // Fetch salary history
        const salaryResponse = await axios.get(`http://localhost:8080/api/salaries/staff/${staffId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSalaries(salaryResponse.data);
      } catch (err) {
        setError('Failed to load staff details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffDetails();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900">Staff Portal</h1>
            <button 
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            Welcome to your Staff Dashboard{staff && `, ${staff.firstName}`}!
          </h2>
          
          {loading ? (
            <p className="text-gray-500">Loading details...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="mt-6 border-t border-gray-200 pt-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Employee ID</dt>
                  <dd className="mt-1 text-sm text-gray-900 font-semibold">{staff.employeeId || 'Not Assigned'}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Designation</dt>
                  <dd className="mt-1 text-sm text-gray-900">{staff.designation || 'Not specified'}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{staff.email || 'Not specified'}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Attendance Record</dt>
                  <dd className="mt-1 text-sm text-gray-900 font-semibold">
                    {staff.attendance || 'No records available'}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Base Salary</dt>
                  <dd className="mt-1 text-sm text-gray-900 font-semibold">
                    {staff.salary ? `$${staff.salary}` : 'Not available'}
                  </dd>
                </div>
              </dl>
            </div>
          )}

          {!loading && !error && (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-bold mb-4">Salary History</h3>
              <div className="bg-white shadow rounded-lg overflow-hidden border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Month / Year</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deductions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {salaries.map(salary => (
                      <tr key={salary.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{salary.month} {salary.year}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">${salary.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${salary.deductions}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${salary.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {salary.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {salaries.length === 0 && (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500 text-sm">
                          No salary history available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
