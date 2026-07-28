import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'PATIENT'
  });

  const [message, setMessage] = useState('');

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
        setMessage(`Registration successful! Welcome, ${data.firstName}`);
      } else {
        const errorText = await response.text();
        setMessage(`Error: ${errorText}`);
      }
    } catch (error) {
      setMessage('Something went wrong. Is the backend server running?');
    }
  }

  return (
      <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'Arial' }}>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
          />
          <br /><br />
          <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
          />
          <br /><br />
          <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
          />
          <br /><br />
          <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
          />
          <br /><br />
          <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
          />
          <br /><br />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="PATIENT">Patient</option>
            <option value="DOCTOR">Doctor</option>
          </select>
          <br /><br />
          <button type="submit">Register</button>
        </form>
        {message && <p>{message}</p>}
      </div>
  );
}

export default App;