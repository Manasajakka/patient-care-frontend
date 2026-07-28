import { useState } from 'react';

function SetAvailability() {
    const [formData, setFormData] = useState({
        doctorId: '',
        dayOfWeek: 'MONDAY',
        startTime: '',
        endTime: '',
        slotDurationMinutes: 30
    });

    const [message, setMessage] = useState('');

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/availability', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    startTime: formData.startTime + ':00',
                    endTime: formData.endTime + ':00'
                })
            });

            if (response.ok) {
                setMessage('Availability added successfully!');
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
                <h1 style={{ color: '#2C3E50', textAlign: 'center', marginBottom: '25px', fontSize: '24px' }}>
                    Set Your Availability
                </h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        name="doctorId"
                        placeholder="Your Doctor ID"
                        value={formData.doctorId}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                    <select name="dayOfWeek" value={formData.dayOfWeek} onChange={handleChange} style={inputStyle}>
                        <option value="MONDAY">Monday</option>
                        <option value="TUESDAY">Tuesday</option>
                        <option value="WEDNESDAY">Wednesday</option>
                        <option value="THURSDAY">Thursday</option>
                        <option value="FRIDAY">Friday</option>
                        <option value="SATURDAY">Saturday</option>
                        <option value="SUNDAY">Sunday</option>
                    </select>
                    <label style={labelStyle}>Start Time</label>
                    <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                    <label style={labelStyle}>End Time</label>
                    <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                    <label style={labelStyle}>Slot Length (minutes)</label>
                    <input
                        type="number"
                        name="slotDurationMinutes"
                        value={formData.slotDurationMinutes}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                    <button type="submit" style={buttonStyle}>
                        Save Availability
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

const labelStyle = {
    display: 'block',
    color: '#2C3E50',
    fontSize: '13px',
    marginBottom: '5px'
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

export default SetAvailability;