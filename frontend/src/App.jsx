import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import DonorDashboard from './pages/DonorDashboard';
import Dashboard from './pages/Dashboard';
import Orphans from './pages/Orphans';
import Donors from './pages/Donors';
import Funds from './pages/Funds';
import Expenses from './pages/Expenses';
import Staff from './pages/Staff';
import Volunteers from './pages/Volunteers';
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/donor-dashboard" element={<DonorRoute><DonorDashboard /></DonorRoute>} />
        
        <Route path="/" element={<AdminRoute><Layout /></AdminRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="orphans" element={<Orphans />} />
          <Route path="staff" element={<Staff />} />
          <Route path="donors" element={<Donors />} />
          <Route path="funds" element={<Funds />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="volunteers" element={<Volunteers />} />
          <Route path="adoptions" element={<Adoptions />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
