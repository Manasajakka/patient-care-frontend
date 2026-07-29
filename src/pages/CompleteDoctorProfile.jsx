import { useState } from 'react';

function CompleteDoctorProfile() {
    const [formData, setFormData] = useState({
        userId: '',
        specialization: '',
        licenseNumber: '',
        yearsExperience: ''
    });

    const [message, setMessage] = useState('');

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/doctors/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(`Profile completed! Your Doctor ID is ${data.id}. Use this ID for Set Availability and My Patients.`);
            } else {
                const errorText = await response.text();
                setMessage(`Error: ${errorText}`);
            }
        } catch (error) {
            setMessage('Something went wrong. Is the backend server running?');
        }
    }

    return (
        <div style={{
            minHeight: '90vh',
            backgroundColor: '#F4F9FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Arial'
        }}>
            <div style={{
                backgroundColor: '#FFFFFF',
                padding: '40px',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(111, 168, 220, 0.2)',
                width: '350px'
            }}>
                <h1 style={{ color: '#2C3E50', textAlign: 'center', marginBottom: '10px', fontSize: '22px' }}>
                    Complete Your Doctor Profile
                </h1>
                <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '13px', marginBottom: '20px' }}>
                    Enter the User ID you received when you registered.
                </p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        name="userId"
                        placeholder="Your User ID"
                        value={formData.userId}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                    <input
                        type="text"
                        name="specialization"
                        placeholder="Specialization (e.g. Cardiologist)"
                        value={formData.specialization}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                    <input
                        type="text"
                        name="licenseNumber"
                        placeholder="License Number"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                    <input
                        type="number"
                        name="yearsExperience"
                        placeholder="Years of Experience"
                        value={formData.yearsExperience}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                    <button type="submit" style={buttonStyle}>
                        Save Profile
                    </button>
                </form>
                {message && (
                    <p style={{ textAlign: 'center', color: '#4A90D9', marginTop: '15px' }}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #DCEEFA',
    borderRadius: '8px',
    backgroundColor: '#F9FCFF',
    fontSize: '14px',
    boxSizing: 'border-box'
};

const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#6FA8DC',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer'
};

export default CompleteDoctorProfile;