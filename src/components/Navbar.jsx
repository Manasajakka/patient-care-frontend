import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={{
            padding: '15px 30px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #DCEEFA',
            fontFamily: 'Arial',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 2px 10px rgba(111, 168, 220, 0.1)'
        }}>
      <span style={{ color: '#2C3E50', fontWeight: 'bold', marginRight: '30px' }}>
        AI Patient Care
      </span>
            <Link to="/register" style={linkStyle}>Register</Link>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
            <Link to="/my-appointments" style={linkStyle}>My Appointments</Link>
            <Link to="/availability" style={linkStyle}>Set Availability</Link>
            <Link to="/doctor-dashboard" style={linkStyle}>My Patients</Link>
            <Link to="/ask-ai" style={linkStyle}>Ask AI</Link>
            <Link to="/payment" style={linkStyle}>Pay</Link>
        </nav>
    );
}

const linkStyle = {
    color: '#4A90D9',
    textDecoration: 'none',
    marginRight: '20px',
    fontSize: '14px'
};

export default Navbar;