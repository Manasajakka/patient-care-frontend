import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

function SetAvailability() {
    const navigate = useNavigate();
    const location = useLocation();
    const prefillDoctorId = location.state?.doctorId || '';

    const [doctorId, setDoctorId] = useState(prefillDoctorId);
    const [selectedDays, setSelectedDays] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [slotDurationMinutes, setSlotDurationMinutes] = useState(30);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    function toggleDay(day) {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter((d) => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (selectedDays.length === 0) {
            setMessage('Please select at least one day.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const results = await Promise.all(
                selectedDays.map((day) =>
                    fetch('http://localhost:8080/api/availability', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            doctorId,
                            dayOfWeek: day,
                            startTime: startTime + ':00',
                            endTime: endTime + ':00',
                            slotDurationMinutes
                        })
                    })
                )
            );

            const allOk = results.every((r) => r.ok);

            if (allOk) {
                setMessage(`Availability saved for: ${selectedDays.join(', ')}. Redirecting...`);
                setSelectedDays([]);
                setTimeout(() => {
                    navigate('/doctor-portal');
                }, 1500);
            } else {
                setMessage('Some days failed to save. Please check and try again.');
            }
        } catch (error) {
            setMessage('Something went wrong. Is the backend server running?');
        }

        setLoading(false);
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
                width: '380px'
            }}>
                <Link to="/doctor-portal" style={backLinkStyle}>← Back to My Portal</Link>
                <h1 style={{ color: '#2C3E50', textAlign: 'center', marginBottom: '10px', fontSize: '22px' }}>
                    Set Your Availability
                </h1>
                <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '13px', marginBottom: '20px' }}>
                    {prefillDoctorId
                        ? 'Your Doctor ID has been filled in automatically.'
                        : 'Select all the days you share the same hours, then submit once.'}
                </p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        placeholder="Your Doctor ID"
                        value={doctorId}
                        onChange={(e) => setDoctorId(e.target.value)}
                        required
                        style={inputStyle}
                    />

                    <label style={labelStyle}>Select Days</label>
                    <div style={dayGridStyle}>
                        {DAYS.map((day) => (
                            <button
                                type="button"
                                key={day}
                                onClick={() => toggleDay(day)}
                                style={selectedDays.includes(day) ? dayButtonActive : dayButtonInactive}
                            >
                                {day.slice(0, 3)}
                            </button>
                        ))}
                    </div>

                    <label style={labelStyle}>Start Time</label>
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                        style={inputStyle}
                    />

                    <label style={labelStyle}>End Time</label>
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                        style={inputStyle}
                    />

                    <label style={labelStyle}>Slot Length (minutes)</label>
                    <input
                        type="number"
                        value={slotDurationMinutes}
                        onChange={(e) => setSlotDurationMinutes(e.target.value)}
                        required
                        style={inputStyle}
                    />

                    <button type="submit" disabled={loading} style={buttonStyle}>
                        {loading ? 'Saving...' : 'Save Availability'}
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

const backLinkStyle = {
    color: '#4A90D9',
    fontSize: '13px',
    marginBottom: '15px',
    display: 'inline-block',
    textDecoration: 'none'
};

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
    marginBottom: '6px'
};

const dayGridStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '15px'
};

const dayButtonInactive = {
    padding: '8px 10px',
    backgroundColor: '#F9FCFF',
    color: '#4A90D9',
    border: '1px solid #6FA8DC',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer'
};

const dayButtonActive = {
    ...dayButtonInactive,
    backgroundColor: '#6FA8DC',
    color: 'white'
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