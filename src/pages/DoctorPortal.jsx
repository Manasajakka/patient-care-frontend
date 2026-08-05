import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function DoctorPortal() {
    const [user, setUser] = useState(null);
    const [doctor, setDoctor] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const stored = localStorage.getItem('loggedInUser');
        if (!stored) {
            navigate('/login');
            return;
        }
        const parsedUser = JSON.parse(stored);
        setUser(parsedUser);

        fetch(`http://localhost:8080/api/doctors/by-user/${parsedUser.id}`)
            .then((res) => {
                if (!res.ok) throw new Error('not found');
                return res.json();
            })
            .then((data) => setDoctor(data))
            .catch(() => setError('You have not completed your doctor profile yet.'));
    }, [navigate]);

    if (!user) return null;

    return (
        <div style={{
            minHeight: '90vh',
            backgroundColor: '#F4F9FF',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '50px',
            fontFamily: 'Arial'
        }}>
            <div style={{
                backgroundColor: '#FFFFFF',
                padding: '40px',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(111, 168, 220, 0.2)',
                width: '450px',
                height: 'fit-content'
            }}>
                <h1 style={{ color: '#2C3E50', textAlign: 'center', marginBottom: '5px' }}>
                    Welcome, Dr. {user.lastName}
                </h1>
                <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '13px', marginBottom: '25px' }}>
                    {user.email}
                </p>

                {error && (
                    <div style={{ ...cardStyle, textAlign: 'center' }}>
                        <p style={{ color: '#4A90D9', margin: '0 0 10px 0' }}>{error}</p>
                        <Link to="/complete-doctor-profile" style={{ color: '#4A90D9' }}>
                            Complete your profile now
                        </Link>
                    </div>
                )}

                {doctor && (
                    <div style={cardStyle}>
                        <p style={{ margin: '0 0 5px 0', color: '#2C3E50' }}>
                            <strong>Doctor ID:</strong> {doctor.id}
                        </p>
                        <p style={{ margin: '0 0 5px 0', color: '#2C3E50' }}>
                            <strong>Specialization:</strong> {doctor.specialization}
                        </p>
                        <p style={{ margin: '0 0 5px 0', color: '#2C3E50' }}>
                            <strong>License:</strong> {doctor.licenseNumber}
                        </p>
                        <p style={{ margin: 0, color: '#2C3E50' }}>
                            <strong>Experience:</strong> {doctor.yearsExperience} years
                        </p>
                    </div>
                )}

                {doctor && (
                    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Link to="/availability" style={linkButtonStyle}>Set Availability</Link>
                        <Link to="/doctor-dashboard" style={linkButtonStyle}>My Patients</Link>
                        <Link to="/ask-ai" style={linkButtonStyle}>Ask AI Assistant</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

const cardStyle = {
    backgroundColor: '#F9FCFF',
    border: '1px solid #DCEEFA',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '10px'
};

const linkButtonStyle = {
    display: 'block',
    textAlign: 'center',
    padding: '12px',
    backgroundColor: '#6FA8DC',
    color: 'white',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '15px'
};

export default DoctorPortal;