import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import DonorDashboard from './pages/DonorDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
import AdopterDashboard from './pages/AdopterDashboard';
import StaffDashboard from './pages/StaffDashboard';
import OrphanDashboard from './pages/OrphanDashboard';
import Dashboard from './pages/Dashboard';
import Orphans from './pages/Orphans';
import Donors from './pages/Donors';
import Funds from './pages/Funds';
import Expenses from './pages/Expenses';
import Volunteers from './pages/Volunteers';
import Staff from './pages/Staff';
import Salaries from './pages/Salaries';
import Adoptions from './pages/Adoptions';
// A simple PrivateRoute component could be added here, but for simplicity we'll just check localStorage
const AdminRoute = ({ children }) => {
  const role = localStorage.getItem('role');
  return role === 'ROLE_ADMIN' ? children : <Navigate to="/login" />;
};

const DonorRoute = ({ children }) => {
  const role = localStorage.getItem('role');
  return role === 'ROLE_DONOR' ? children : <Navigate to="/login" />;
};

const VolunteerRoute = ({ children }) => {
  const role = localStorage.getItem('role');
  return role === 'ROLE_VOLUNTEER' ? children : <Navigate to="/login" />;
};

const AdopterRoute = ({ children }) => {
  const role = localStorage.getItem('role');
  return role === 'ROLE_ADOPTER' ? children : <Navigate to="/login" />;
};

const StaffRoute = ({ children }) => {
  const role = localStorage.getItem('role');
  return role === 'ROLE_STAFF' ? children : <Navigate to="/login" />;
};

const OrphanRoute = ({ children }) => {
  const role = localStorage.getItem('role');
  return role === 'ROLE_ORPHAN' ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/donor-dashboard" element={<DonorRoute><DonorDashboard /></DonorRoute>} />
        <Route path="/volunteer-dashboard" element={<VolunteerRoute><VolunteerDashboard /></VolunteerRoute>} />
        <Route path="/adopter-dashboard" element={<AdopterRoute><AdopterDashboard /></AdopterRoute>} />
        <Route path="/staff-dashboard" element={<StaffRoute><StaffDashboard /></StaffRoute>} />
        <Route path="/orphan-dashboard" element={<OrphanRoute><OrphanDashboard /></OrphanRoute>} />
        
        <Route path="/" element={<AdminRoute><Layout /></AdminRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="orphans" element={<Orphans />} />
          <Route path="staff" element={<Staff />} />
          <Route path="donors" element={<Donors />} />
          <Route path="funds" element={<Funds />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="volunteers" element={<Volunteers />} />
          <Route path="adoptions" element={<Adoptions />} />
          <Route path="salaries" element={<Salaries />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
