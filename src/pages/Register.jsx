import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: 'PATIENT',
        adminCode: ''
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(`Registration successful! Your User ID is ${data.id}.`);

                setTimeout(() => {
                    if (data.role === 'DOCTOR') {
                        navigate('/complete-doctor-profile', { state: { userId: data.id } });
                    } else if (data.role === 'PATIENT') {
                        navigate('/complete-patient-profile', { state: { userId: data.id } });
                    } else {
                        navigate('/login');
                    }
                }, 1500);
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
                <h1 style={{ color: '#2C3E50', textAlign: 'center', marginBottom: '25px' }}>
                    Create Account
                </h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required style={inputStyle} />
                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required style={inputStyle} />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={inputStyle} />
                    <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required style={inputStyle} />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={inputStyle} />
                    <select name="role" value={formData.role} onChange={handleChange} style={inputStyle}>
                        <option value="PATIENT">Patient</option>
                        <option value="DOCTOR">Doctor</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                    {formData.role === 'ADMIN' && (
                        <input
                            type="text"
                            name="adminCode"
                            placeholder="Admin Signup Code"
                            value={formData.adminCode}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    )}
                    <button type="submit" style={buttonStyle}>
                        Register
                    </button>
                </form>
                {message && (
                    <p style={{ textAlign: 'center', color: '#4A90D9', marginTop: '15px' }}>
                        {message}
                    </p>
                )}
                <p style={{ textAlign: 'center', marginTop: '20px', color: '#2C3E50' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#4A90D9' }}>
                        Login here
                    </Link>
                </p>
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

export default Register;