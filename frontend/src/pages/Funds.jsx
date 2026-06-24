import { useState, useEffect } from 'react';
import api from '../api/api';
import { Plus, Trash2 } from 'lucide-react';

const Funds = () => {
  const [funds, setFunds] = useState([]);
  const [donors, setDonors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ amount: '', date: '', purpose: '', donorId: '' });

  useEffect(() => {
    fetchFunds();
    fetchDonors();
  }, []);

  const fetchFunds = async () => {
    try {
      const response = await api.get('/donations');
      setFunds(response.data);
    } catch (error) {
      console.error('Error fetching funds:', error);
    }
  };

  const fetchDonors = async () => {
    try {
      const response = await api.get('/donors');
      setDonors(response.data);
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/donations', formData);
      setIsModalOpen(false);
      setFormData({ amount: '', date: '', purpose: '', donorId: '' });
      fetchFunds();
    } catch (error) {
      console.error('Error adding fund:', error);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this fund record?')) {
      try {
        await api.delete(`/donations/${id}`);
        fetchFunds();
      } catch (error) {
        console.error('Error deleting fund:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Funds Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add Fund</span>
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {funds.map((fund) => (
              <tr key={fund.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{fund.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{fund.donor.firstName} {fund.donor.lastName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-green-600 font-semibold">${fund.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{fund.purpose}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleDelete(fund.id)} className="text-red-600 hover:text-red-900 ml-4">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {funds.length === 0 && (
                <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">No funds found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Record New Fund</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Donor</label>
                <select required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formData.donorId} onChange={(e) => setFormData({...formData, donorId: e.target.value})}>
                  <option value="">Select a donor...</option>
                  {donors.map(donor => (
                      <option key={donor.id} value={donor.id}>{donor.firstName} {donor.lastName}</option>
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
                <label className="block text-sm font-medium text-gray-700">Purpose / Notes</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formData.purpose} onChange={(e) => setFormData({...formData, purpose: e.target.value})} />
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Funds;
