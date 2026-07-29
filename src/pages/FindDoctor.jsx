import { useState, useEffect } from 'react';

function FindDoctor() {
    const [doctors, setDoctors] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/doctors')
            .then((response) => response.json())
            .then((data) => setDoctors(data))
            .catch(() => setMessage('Could not load doctors. Is the backend running?'));
    }, []);

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
                width: '500px',
                height: 'fit-content'
            }}>
                <h1 style={{ color: '#2C3E50', textAlign: 'center', marginBottom: '25px' }}>
                    Find a Doctor
                </h1>
                {message && <p style={{ color: '#4A90D9', textAlign: 'center' }}>{message}</p>}
                {doctors.map((doc) => (
                    <div key={doc.id} style={cardStyle}>
                        <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#2C3E50' }}>
                            Dr. {doc.user.firstName} {doc.user.lastName}
                        </p>
                        <p style={{ margin: '0 0 5px 0', color: '#4A90D9' }}>
                            {doc.specialization}
                        </p>
                        <p style={{ margin: 0, color: '#6b7280', fontSize: '13px' }}>
                            Doctor ID: {doc.id} &nbsp;|&nbsp; {doc.yearsExperience} years experience
                        </p>
                    </div>
                ))}
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

export default FindDoctor;
