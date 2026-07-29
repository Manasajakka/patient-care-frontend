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
                <Route path="*" element={<Navigate to="/register" />} />
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="/ask-ai" element={<AskAI />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/complete-doctor-profile" element={<CompleteDoctorProfile />} />
                <Route path="/find-doctor" element={<FindDoctor />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;