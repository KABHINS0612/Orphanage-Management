import { useState, useEffect } from 'react';
import api from '../api/api';
import { Plus, Trash2 } from 'lucide-react';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ amount: '', date: '', category: '', description: '' });

  const categories = ['Food', 'Education', 'Healthcare', 'Utilities', 'Maintenance', 'Clothing', 'Other'];

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await api.get('/expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/expenses', formData);
      setIsModalOpen(false);
      setFormData({ amount: '', date: '', category: '', description: '' });
      fetchExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this expense record?')) {
      try {
        await api.delete(`/expenses/${id}`);
        fetchExpenses();
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Expenses Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus size={20} />
          <span>Record Expense</span>
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{expense.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {expense.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-red-600 font-semibold">${expense.amount}</td>
                <td className="px-6 py-4 text-gray-500">{expense.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleDelete(expense.id)} className="text-red-600 hover:text-red-900 ml-4">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {expenses.length === 0 && (
                <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">No expenses recorded.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Record New Expense</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                  <option value="">Select a category...</option>
                  {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount ($)</label>
                <input type="number" step="0.01" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input type="date" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description / Notes</label>
                <textarea className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;
