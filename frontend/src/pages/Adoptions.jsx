import { useState, useEffect } from 'react';
import api from '../api/api';
import { Plus, Trash2, Edit2, CheckCircle, XCircle } from 'lucide-react';

const Adoptions = () => {
  const [adoptionList, setAdoptionList] = useState([]);
  const [orphanList, setOrphanList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    applicantName: '',
    spouseName: '',
    address: '',
    phone: '',
    email: '',
    occupation: '',
    annualIncome: '',
    orphanId: '',
    motivation: ''
  });

  useEffect(() => {
    fetchAdoptions();
    fetchOrphans();
  }, []);

  const fetchAdoptions = async () => {
    try {
      const response = await api.get('/adoptions');
      setAdoptionList(response.data);
    } catch (error) {
      console.error('Error fetching adoptions:', error);
    }
  };
  
  const fetchOrphans = async () => {
    try {
      const response = await api.get('/orphans');
      setOrphanList(response.data);
    } catch (error) {
      console.error('Error fetching orphans:', error);
    }
  };

  const getOrphanName = (id) => {
    const orphan = orphanList.find(o => o.id === id);
    return orphan ? `${orphan.firstName} ${orphan.lastName}` : 'Unknown';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/adoptions/${editingId}`, formData);
      } else {
        await api.post('/adoptions', formData);
      }
      setIsModalOpen(false);
      resetForm();
      fetchAdoptions();
    } catch (error) {
      console.error('Error saving adoption request:', error);
    }
  };

  const handleEdit = (adoption) => {
    setEditingId(adoption.id);
    setFormData({
      applicantName: adoption.applicantName || '',
      spouseName: adoption.spouseName || '',
      address: adoption.address || '',
      phone: adoption.phone || '',
      email: adoption.email || '',
      occupation: adoption.occupation || '',
      annualIncome: adoption.annualIncome || '',
      orphanId: adoption.orphanId || '',
      motivation: adoption.motivation || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this adoption request?')) {
      try {
        await api.delete(`/adoptions/${id}`);
        fetchAdoptions();
      } catch (error) {
        console.error('Error deleting request:', error);
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    const notes = prompt(`Enter verification notes for status ${status}:`, '');
    if (notes !== null) {
        try {
          await api.put(`/adoptions/${id}/status?status=${status}&notes=${encodeURIComponent(notes)}`);
          fetchAdoptions();
        } catch (error) {
          console.error('Error updating status:', error);
        }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      applicantName: '', spouseName: '', address: '', phone: '', email: '', 
      occupation: '', annualIncome: '', orphanId: '', motivation: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Adoption Management</h1>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>New Adoption Request</span>
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Child</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {adoptionList.map((adoption) => (
              <tr key={adoption.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{adoption.applicantName}</div>
                  {adoption.spouseName && <div className="text-sm text-gray-500">Spouse: {adoption.spouseName}</div>}
                  <div className="text-sm text-gray-500">Date: {adoption.requestDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {getOrphanName(adoption.orphanId)}
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">
                  <div>Inc: ${adoption.annualIncome}</div>
                  <div>Occ: {adoption.occupation}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    adoption.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                    adoption.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 
                    adoption.status === 'UNDER_VERIFICATION' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {adoption.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {adoption.status !== 'APPROVED' && adoption.status !== 'REJECTED' && (
                    <>
                      <button onClick={() => handleStatusChange(adoption.id, 'APPROVED')} className="text-green-600 hover:text-green-900 ml-3" title="Approve">
                        <CheckCircle size={18} />
                      </button>
                      <button onClick={() => handleStatusChange(adoption.id, 'REJECTED')} className="text-red-600 hover:text-red-900 ml-3" title="Reject">
                        <XCircle size={18} />
                      </button>
                    </>
                  )}
                  <button onClick={() => handleEdit(adoption)} className="text-blue-600 hover:text-blue-900 ml-4">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(adoption.id)} className="text-red-600 hover:text-red-900 ml-4">
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
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Adoption Request' : 'New Adoption Request'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Applicant Name</label>
                  <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.applicantName} onChange={(e) => setFormData({...formData, applicantName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Spouse Name (Optional)</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.spouseName} onChange={(e) => setFormData({...formData, spouseName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Occupation</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.occupation} onChange={(e) => setFormData({...formData, occupation: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Annual Income</label>
                  <input type="number" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.annualIncome} onChange={(e) => setFormData({...formData, annualIncome: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Select Child for Adoption</label>
                  <select required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.orphanId} onChange={(e) => setFormData({...formData, orphanId: e.target.value})}>
                    <option value="" disabled>Select Child</option>
                    {orphanList.map(o => (
                      <option key={o.id} value={o.id}>{o.firstName} {o.lastName} (Age: {new Date().getFullYear() - new Date(o.dateOfBirth).getFullYear()})</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Motivation for Adoption</label>
                  <textarea className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 h-20"
                    value={formData.motivation} onChange={(e) => setFormData({...formData, motivation: e.target.value})} />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adoptions;
