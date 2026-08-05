import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AdminPanel() {
    const storedUser = localStorage.getItem('loggedInUser');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user && user.role === 'ADMIN') {
            loadDoctors();
            loadPatients();
        }
    }, []);

    function loadDoctors() {
        fetch('http://localhost:8080/api/doctors')
            .then((res) => res.json())
            .then((data) => setDoctors(data));
    }

    function loadPatients() {
        fetch('http://localhost:8080/api/patients')
            .then((res) => res.json())
            .then((data) => setPatients(data));
    }

    async function deleteDoctor(id) {
        if (!window.confirm('Are you sure you want to delete this doctor?')) return;

        const response = await fetch(`http://localhost:8080/api/doctors/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            setMessage('Doctor deleted.');
            loadDoctors();
        } else {
            setMessage('Failed to delete doctor.');
        }
    }

    async function deletePatient(id) {
        if (!window.confirm('Are you sure you want to delete this patient?')) return;

        const response = await fetch(`http://localhost:8080/api/patients/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            setMessage('Patient deleted.');
            loadPatients();
        } else {
            setMessage('Failed to delete patient.');
        }
    }

    if (!user || user.role !== 'ADMIN') {
        return (
            <div style={{ minHeight: '90vh', backgroundColor: '#F4F9FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial' }}>
                <p style={{ color: '#2C3E50' }}>You do not have permission to view this page.</p>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '90vh',
            backgroundColor: '#F4F9FF',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '50px',
            fontFamily: 'Arial',
            paddingBottom: '50px'
        }}>
            <div style={{
                backgroundColor: '#FFFFFF',
                padding: '40px',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(111, 168, 220, 0.2)',
                width: '600px',
                height: 'fit-content'
            }}>
                <Link to="/admin-portal" style={backLinkStyle}>← Back to Admin Portal</Link>
                <h1 style={{ color: '#2C3E50', textAlign: 'center', marginBottom: '10px' }}>
                    Admin Panel
                </h1>
                {message && (
                    <p style={{ textAlign: 'center', color: '#4A90D9', marginBottom: '15px' }}>{message}</p>
                )}

                <h2 style={{ color: '#2C3E50', fontSize: '18px', marginTop: '25px' }}>Doctors</h2>
                {doctors.map((doc) => (
                    <div key={doc.id} style={rowStyle}>
                        <div>
                            <strong>Dr. {doc.user.firstName} {doc.user.lastName}</strong> — {doc.specialization}
                            <div style={{ fontSize: '12px', color: '#6b7280' }}>Doctor ID: {doc.id}</div>
                        </div>
                        <button onClick={() => deleteDoctor(doc.id)} style={deleteButtonStyle}>Delete</button>
                    </div>
                ))}

                <h2 style={{ color: '#2C3E50', fontSize: '18px', marginTop: '25px' }}>Patients</h2>
                {patients.map((pat) => (
                    <div key={pat.id} style={rowStyle}>
                        <div>
                            <strong>{pat.user.firstName} {pat.user.lastName}</strong>
                            <div style={{ fontSize: '12px', color: '#6b7280' }}>Patient ID: {pat.id}</div>
                        </div>
                        <button onClick={() => deletePatient(pat.id)} style={deleteButtonStyle}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

const backLinkStyle = {
    color: '#4A90D9',
    fontSize: '13px',
    marginBottom: '15px',
    display: 'inline-block',
    textDecoration: 'none'
};

const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FCFF',
    border: '1px solid #DCEEFA',
    borderRadius: '8px',
    padding: '12px 15px',
    marginBottom: '8px'
};

const deleteButtonStyle = {
    backgroundColor: '#E57373',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '13px'
};

export default AdminPanel;