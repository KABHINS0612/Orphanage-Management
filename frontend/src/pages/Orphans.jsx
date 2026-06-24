import { useState, useEffect } from 'react';
import api from '../api/api';
import { Plus, Trash2 } from 'lucide-react';

const Orphans = () => {
  const [orphans, setOrphans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    firstName: '', lastName: '', dateOfBirth: '', gender: '', 
    admissionDate: '', healthStatus: '', notes: '',
    educationDetails: '', medicalRecords: '', guardianDetails: '',
    photoUrl: '', documentUrl: '' 
  });

  useEffect(() => {
    fetchOrphans();
  }, []);

  const fetchOrphans = async () => {
    try {
      const response = await api.get('/orphans');
      setOrphans(response.data);
    } catch (error) {
      console.error('Error fetching orphans:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/orphans', formData);
      setIsModalOpen(false);
      setFormData({ 
        firstName: '', lastName: '', dateOfBirth: '', gender: '', 
        admissionDate: '', healthStatus: '', notes: '',
        educationDetails: '', medicalRecords: '', guardianDetails: '',
        photoUrl: '', documentUrl: '' 
      });
      fetchOrphans();
    } catch (error) {
      console.error('Error adding orphan:', error);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this record?')) {
      try {
        await api.delete(`/orphans/${id}`);
        fetchOrphans();
      } catch (error) {
        console.error('Error deleting orphan:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Orphans Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add Orphan</span>
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orphans.map((orphan) => (
              <tr key={orphan.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{orphan.firstName} {orphan.lastName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{orphan.dateOfBirth}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{orphan.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{orphan.admissionDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleDelete(orphan.id)} className="text-red-600 hover:text-red-900 ml-4">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl my-8">
            <h2 className="text-xl font-bold mb-4">Add New Orphan</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.dateOfBirth} onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                    <option value="">Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Admission Date</label>
                  <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.admissionDate} onChange={(e) => setFormData({...formData, admissionDate: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Health Status</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.healthStatus} onChange={(e) => setFormData({...formData, healthStatus: e.target.value})} />
                </div>
              </div>

              <hr className="my-4" />
              <h3 className="text-lg font-medium text-gray-900">Additional Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Education Details</label>
                  <textarea className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.educationDetails} onChange={(e) => setFormData({...formData, educationDetails: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Medical Records</label>
                  <textarea className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.medicalRecords} onChange={(e) => setFormData({...formData, medicalRecords: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Guardian Details</label>
                  <textarea className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.guardianDetails} onChange={(e) => setFormData({...formData, guardianDetails: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Notes / Background</label>
                  <textarea className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Photo URL</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="https://..."
                    value={formData.photoUrl} onChange={(e) => setFormData({...formData, photoUrl: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Document URL</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="https://..."
                    value={formData.documentUrl} onChange={(e) => setFormData({...formData, documentUrl: e.target.value})} />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Orphan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orphans;
