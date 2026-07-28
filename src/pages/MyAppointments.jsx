import { useState } from 'react';

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hourNum = parseInt(hours, 10);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum % 12 === 0 ? 12 : hourNum % 12;
    return `${displayHour}:${minutes} ${period}`;
}

function MyAppointments() {
    const [patientId, setPatientId] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [message, setMessage] = useState('');

    async function fetchAppointments(event) {
        event.preventDefault();
        setMessage('');
        setAppointments([]);

        try {
            const response = await fetch(
                `http://localhost:8080/api/appointments/patient/${patientId}`
            );

            if (response.ok) {
                const data = await response.json();
                setAppointments(data);
                if (data.length === 0) {
                    setMessage('No appointments found.');
                }
            } else {
                setMessage('Could not fetch appointments.');
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
                    My Appointments
                </h1>
                <form onSubmit={fetchAppointments}>
                    <input
                        type="number"
                        placeholder="Your Patient ID"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <button type="submit" style={buttonStyle}>
                        View My Appointments
                    </button>
                </form>

                {message && (
                    <p style={{ textAlign: 'center', color: '#4A90D9', marginTop: '15px' }}>
                        {message}
                    </p>
                )}

                {appointments.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                        {appointments.map((appt) => (
                            <div key={appt.id} style={cardStyle}>
                                <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#2C3E50' }}>
                                    Dr. {appt.doctor.user.firstName} {appt.doctor.user.lastName}
                                </p>
                                <p style={{ margin: '0 0 5px 0', color: '#2C3E50' }}>
                                    {appt.appointmentDate} at {formatTime(appt.appointmentTime)}
                                </p>
                                <p style={{ margin: '0', color: '#4A90D9', fontSize: '13px' }}>
                                    Status: {appt.status}
                                </p>
                            </div>
                        ))}
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

const cardStyle = {
    backgroundColor: '#F9FCFF',
    border: '1px solid #DCEEFA',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '10px'
};

export default MyAppointments;