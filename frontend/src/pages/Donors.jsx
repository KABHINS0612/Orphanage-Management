import { useState, useEffect } from 'react';
import api from '../api/api';
import { Plus, Trash2 } from 'lucide-react';

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '' });

  useEffect(() => {
    fetchDonors();
  }, []);

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
      await api.post('/donors', formData);
      setIsModalOpen(false);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', address: '' });
      fetchDonors();
    } catch (error) {
      console.error('Error adding donor:', error);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this donor?')) {
      try {
        await api.delete(`/donors/${id}`);
        fetchDonors();
      } catch (error) {
        console.error('Error deleting donor:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Donors Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add Donor</span>
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {donors.map((donor) => (
              <tr key={donor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{donor.firstName} {donor.lastName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{donor.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{donor.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleDelete(donor.id)} className="text-red-600 hover:text-red-900 ml-4">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Donor</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donors;
