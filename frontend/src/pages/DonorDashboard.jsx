import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    purpose: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem('token');
      const donorId = localStorage.getItem('donorId');
      if (!token || !donorId) return navigate('/login');

      // Note: Ideally, there would be a backend endpoint to fetch donations BY donor ID.
      // Since we don't have it explicitly right now, we fetch all and filter, or just fetch all
      // assuming a simple implementation for now.
      const response = await axios.get('http://localhost:8080/api/donations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const myDonations = response.data.filter(d => d.donorId === donorId);
      setDonations(myDonations);
    } catch (err) {
      console.error('Error fetching donations:', err);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      const donorId = localStorage.getItem('donorId');
      
      await axios.post('http://localhost:8080/api/donations', 
        { ...formData, donorId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setShowForm(false);
      setFormData({ amount: '', purpose: '', date: new Date().toISOString().split('T')[0] });
      fetchDonations();
    } catch (err) {
      setError('Failed to submit donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900">Donor Portal</h1>
            <button 
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Donations</h2>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow-sm"
            >
              Send Fund
            </button>
          </div>

          {showForm && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-lg font-medium mb-4">Make a Donation</h3>
              {error && <div className="text-red-600 mb-4 text-sm">{error}</div>}
              
              <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount ($)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    step="0.01"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Purpose</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Education, Food, General Fund"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Submit Donation'}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {donations.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                You haven't made any donations yet. Click "Send Fund" to make a difference!
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {donations.map((donation) => (
                  <li key={donation.id}>
                    <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition duration-150">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          ${donation.amount}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Processed
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            {donation.purpose}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p>
                            Submitted on {new Date(donation.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DonorDashboard;
