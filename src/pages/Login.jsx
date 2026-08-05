import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const user = await response.json();
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                setMessage(`Login successful! Welcome, ${user.firstName}.`);

                if (user.role === 'DOCTOR') {
                    setTimeout(() => navigate('/doctor-portal'), 1500);
                } else if (user.role === 'ADMIN') {
                    setTimeout(() => navigate('/admin-portal'), 1500);
                } else {
                    setTimeout(() => navigate('/patient-portal'), 1500);
                }
            } else {
                const text = await response.text();
                setMessage(`Error: ${text}`);
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
                    Welcome Back
                </h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                    <button type="submit" style={buttonStyle}>
                        Login
                    </button>
                </form>
                {message && (
                    <p style={{ textAlign: 'center', color: '#4A90D9', marginTop: '15px' }}>
                        {message}
                    </p>
                )}
                <p style={{ textAlign: 'center', marginTop: '20px', color: '#2C3E50' }}>
                    Don't have an account?{' '}
                    <Link to="/register" style={{ color: '#4A90D9' }}>
                        Register here
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

export default Login;