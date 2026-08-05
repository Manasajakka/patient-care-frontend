import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SetAvailability from './pages/SetAvailability';
import MyAppointments from './pages/MyAppointments';
import DoctorDashboard from './pages/DoctorDashboard';
import AskAI from './pages/AskAI';
import Payment from './pages/Payment';
import CompleteDoctorProfile from './pages/CompleteDoctorProfile';
import FindDoctor from './pages/FindDoctor';
import PatientPortal from './pages/PatientPortal';
import DoctorPortal from './pages/DoctorPortal';
import ClinicReports from './pages/ClinicReports';
import AdminPanel from './pages/AdminPanel';
import AdminPortal from './pages/AdminPortal';
import CompletePatientProfile from './pages/CompletePatientProfile';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/availability" element={<SetAvailability />} />
                <Route path="/my-appointments" element={<MyAppointments />} />
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="/ask-ai" element={<AskAI />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/complete-doctor-profile" element={<CompleteDoctorProfile />} />
                <Route path="/find-doctor" element={<FindDoctor />} />
                <Route path="/patient-portal" element={<PatientPortal />} />
                <Route path="/doctor-portal" element={<DoctorPortal />} />
                <Route path="*" element={<Navigate to="/register" />} />
                <Route path="/clinic-reports" element={<ClinicReports />} />
                <Route path="/admin-panel" element={<AdminPanel />} />
                <Route path="/admin-portal" element={<AdminPortal />} />
                <Route path="/complete-patient-profile" element={<CompletePatientProfile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;