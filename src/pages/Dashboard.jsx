import { useState } from 'react';

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hourNum = parseInt(hours, 10);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum % 12 === 0 ? 12 : hourNum % 12;
    return `${displayHour}:${minutes} ${period}`;
}

function Dashboard() {
    const [patientId, setPatientId] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [date, setDate] = useState('');
    const [slots, setSlots] = useState([]);
    const [message, setMessage] = useState('');

    async function fetchOpenSlots(event) {
        event.preventDefault();
        setMessage('');
        setSlots([]);

        try {
            const response = await fetch(
                `http://localhost:8080/api/availability/doctor/${doctorId}/open-slots?date=${date}`
            );

            if (response.ok) {
                const data = await response.json();
                setSlots(data);
                if (data.length === 0) {
                    setMessage('No open slots for this date.');
                }
            } else {
                setMessage('Could not fetch slots. Check the doctor ID and date.');
            }
        } catch (error) {
            setMessage('Something went wrong. Is the backend server running?');
        }
    }

    async function bookSlot(time) {
        try {
            const response = await fetch('http://localhost:8080/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    patientId: patientId,
                    doctorId: doctorId,
                    appointmentDate: date,
                    appointmentTime: time
                })
            });

            const text = await response.text();

            if (response.ok) {
                setMessage(`Appointment booked for ${formatTime(time)}!`);
                setSlots(slots.filter((slot) => slot !== time));
            } else {
                setMessage(`Booking failed: ${text}`);
            }
        } catch (error) {
            setMessage('Something went wrong booking the appointment.');
        }
    }

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
                <h1 style={{ color: '#2C3E50', textAlign: 'center', marginBottom: '25px' }}>
                    Book an Appointment
                </h1>
                <form onSubmit={fetchOpenSlots}>
                    <input
                        type="number"
                        placeholder="Your Patient ID"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <input
                        type="number"
                        placeholder="Doctor ID"
                        value={doctorId}
                        onChange={(e) => setDoctorId(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <button type="submit" style={buttonStyle}>
                        Find Open Slots
                    </button>
                </form>

                {message && (
                    <p style={{ textAlign: 'center', color: '#4A90D9', marginTop: '15px' }}>
                        {message}
                    </p>
                )}

                {slots.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                        <h3 style={{ color: '#2C3E50' }}>Available Times</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {slots.map((slot) => (
                                <button
                                    key={slot}
                                    onClick={() => bookSlot(slot)}
                                    style={slotButtonStyle}
                                >
                                    {formatTime(slot)}
                                </button>
                            ))}
                        </div>
                    </div>
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

const slotButtonStyle = {
    padding: '10px 14px',
    backgroundColor: '#F9FCFF',
    color: '#4A90D9',
    border: '1px solid #6FA8DC',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer'
};

export default Dashboard;