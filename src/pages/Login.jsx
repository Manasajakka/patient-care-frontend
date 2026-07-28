import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');

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

            const text = await response.text();

            if (response.ok) {
                setMessage(text);
            } else {
                setMessage(`Error: ${text}`);
            }
        } catch (error) {
            setMessage('Something went wrong. Is the backend server running?');
        }
    }

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'Arial' }}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <br /><br />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <br /><br />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    );
}

export default Login;