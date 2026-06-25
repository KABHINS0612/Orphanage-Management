import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { Plus, Trash2, CheckCircle } from 'lucide-react';

const Salaries = () => {
  const [salaries, setSalaries] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    staffId: '',
    amount: '',
    deductions: '0',
    month: '',
    year: new Date().getFullYear().toString(),
    status: 'Paid'
  });

  useEffect(() => {
    fetchSalaries();
    fetchStaff();
  }, []);

  const fetchSalaries = async () => {
    try {
      const response = await api.get('/salaries');
      setSalaries(response.data);
    } catch (error) {
      console.error('Error fetching salaries:', error);
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await api.get('/staff');
      setStaffList(response.data);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/salaries', formData);
      setIsModalOpen(false);
      resetForm();
      fetchSalaries();
    } catch (error) {
      console.error('Error saving salary:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this salary record?')) {
      try {
        await api.delete(`/salaries/${id}`);
        fetchSalaries();
      } catch (error) {
        console.error('Error deleting salary:', error);
      }
    }
  };

  const getStaffName = (staffId) => {
    const staff = staffList.find(s => s.id === staffId);
    return staff ? `${staff.firstName} ${staff.lastName}` : 'Unknown';
  };

  const resetForm = () => {
    setFormData({
      staffId: '',
      amount: '',
      deductions: '0',
      month: '',
      year: new Date().getFullYear().toString(),
      status: 'Paid'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Salary Management</h1>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Log Salary Payment</span>
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Member</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month / Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {salaries.map((salary) => (
              <tr key={salary.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {getStaffName(salary.staffId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {salary.month} {salary.year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">
                  ${salary.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${salary.deductions}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${salary.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {salary.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleDelete(salary.id)} className="text-red-600 hover:text-red-900 ml-4">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {salaries.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No salary records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl my-8">
            <h2 className="text-xl font-bold mb-4">Log Salary Payment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Staff Member</label>
                  <select
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.staffId}
                    onChange={(e) => {
                      const staff = staffList.find(s => s.id === e.target.value);
                      setFormData({
                        ...formData, 
                        staffId: e.target.value,
                        amount: staff ? staff.salary || '' : '' // Auto-fill base salary
                      });
                    }}
                  >
                    <option value="" disabled>Select a staff member</option>
                    {staffList.map(staff => (
                      <option key={staff.id} value={staff.id}>
                        {staff.firstName} {staff.lastName} ({staff.employeeId || 'No ID'})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount to Pay ($)</label>
                  <input type="number" step="0.01" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Deductions ($)</label>
                  <input type="number" step="0.01" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.deductions} onChange={(e) => setFormData({...formData, deductions: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Month</label>
                  <select required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.month} onChange={(e) => setFormData({...formData, month: e.target.value})}
                  >
                    <option value="" disabled>Select Month</option>
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Year</label>
                  <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2">
                  <CheckCircle size={16} /> <span>Save Payment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Salaries;
