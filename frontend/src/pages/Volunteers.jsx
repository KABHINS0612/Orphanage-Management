import { useState, useEffect } from 'react';
import api from '../api/api';
import { Plus, Trash2, Edit2, CheckCircle, XCircle } from 'lucide-react';

const Volunteers = () => {
  const [volunteerList, setVolunteerList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    skills: '',
    availability: '',
    eventsParticipated: '',
  });

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const response = await api.get('/volunteers');
      setVolunteerList(response.data);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
        eventsParticipated: formData.eventsParticipated.split(',').map(s => s.trim()).filter(s => s),
      };
      
      if (editingId) {
        await api.put(`/volunteers/${editingId}`, payload);
      } else {
        await api.post('/volunteers', payload);
      }
      setIsModalOpen(false);
      resetForm();
      fetchVolunteers();
    } catch (error) {
      console.error('Error saving volunteer:', error);
    }
  };

  const handleEdit = (volunteer) => {
    setEditingId(volunteer.id);
    setFormData({
      firstName: volunteer.firstName || '',
      lastName: volunteer.lastName || '',
      email: volunteer.email || '',
      phone: volunteer.phone || '',
      address: volunteer.address || '',
      skills: volunteer.skills ? volunteer.skills.join(', ') : '',
      availability: volunteer.availability || '',
      eventsParticipated: volunteer.eventsParticipated ? volunteer.eventsParticipated.join(', ') : '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this volunteer?')) {
      try {
        await api.delete(`/volunteers/${id}`);
        fetchVolunteers();
      } catch (error) {
        console.error('Error deleting volunteer:', error);
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/volunteers/${id}/status?status=${status}`);
      fetchVolunteers();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      firstName: '', lastName: '', email: '', phone: '', address: '', skills: '', availability: '', eventsParticipated: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Volunteer Management</h1>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add Volunteer</span>
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Skills</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {volunteerList.map((volunteer) => (
              <tr key={volunteer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{volunteer.firstName} {volunteer.lastName}</div>
                  <div className="text-sm text-gray-500">Reg: {volunteer.registrationDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  <div>{volunteer.email}</div>
                  <div className="text-sm">{volunteer.phone}</div>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">{volunteer.skills?.join(', ')}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    volunteer.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                    volunteer.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {volunteer.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {volunteer.status === 'PENDING' && (
                    <>
                      <button onClick={() => handleStatusChange(volunteer.id, 'APPROVED')} className="text-green-600 hover:text-green-900 ml-3" title="Approve">
                        <CheckCircle size={18} />
                      </button>
                      <button onClick={() => handleStatusChange(volunteer.id, 'REJECTED')} className="text-red-600 hover:text-red-900 ml-3" title="Reject">
                        <XCircle size={18} />
                      </button>
                    </>
                  )}
                  <button onClick={() => handleEdit(volunteer)} className="text-blue-600 hover:text-blue-900 ml-4">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(volunteer.id)} className="text-red-600 hover:text-red-900 ml-4">
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
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Volunteer' : 'Add New Volunteer'}</h2>
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
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="e.g. Teaching, Nursing"
                    value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Availability</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="e.g. Weekends"
                    value={formData.availability} onChange={(e) => setFormData({...formData, availability: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Events Participated (comma separated)</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.eventsParticipated} onChange={(e) => setFormData({...formData, eventsParticipated: e.target.value})} />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
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

export default Volunteers;
