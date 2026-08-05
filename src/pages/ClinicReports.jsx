import { useState } from 'react';
import { Link } from 'react-router-dom';

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hourNum = parseInt(hours, 10);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum % 12 === 0 ? 12 : hourNum % 12;
    return `${displayHour}:${minutes} ${period}`;
}

function ClinicReports() {
    const storedUser = localStorage.getItem('loggedInUser');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalAppointments, setTotalAppointments] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [message, setMessage] = useState('');

    if (!user || user.role !== 'ADMIN') {
        return (
            <div style={{ minHeight: '90vh', backgroundColor: '#F4F9FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial' }}>
                <p style={{ color: '#2C3E50' }}>You do not have permission to view this page.</p>
            </div>
        );
    }

    async function fetchReport(event) {
        event.preventDefault();
        setMessage('');
        setAppointments([]);
        setTotalAppointments(null);

        try {
            const response = await fetch(
                `http://localhost:8080/api/reports/appointments-by-date-range?startDate=${startDate}&endDate=${endDate}`
            );

            if (response.ok) {
                const data = await response.json();
                setTotalAppointments(data.totalAppointments);
                setAppointments(data.appointments);
                if (data.totalAppointments === 0) {
                    setMessage('No appointments found in this date range.');
                }
            } else {
                setMessage('Could not load report.');
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
                width: '550px',
                height: 'fit-content'
            }}>
                <Link to="/admin-portal" style={backLinkStyle}>← Back to Admin Portal</Link>
                <h1 style={{ color: '#2C3E50', textAlign: 'center', marginBottom: '25px' }}>
                    Clinic Appointment Report
                </h1>
                <form onSubmit={fetchReport}>
                    <label style={labelStyle}>Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <label style={labelStyle}>End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <button type="submit" style={buttonStyle}>
                        Generate Report
                    </button>
                </form>

                {message && (
                    <p style={{ textAlign: 'center', color: '#4A90D9', marginTop: '15px' }}>
                        {message}
                    </p>
                )}

                {totalAppointments !== null && totalAppointments > 0 && (
                    <div style={{ marginTop: '20px' }}>
                        <h3 style={{ color: '#2C3E50' }}>
                            Total Appointments: {totalAppointments}
                        </h3>
                        {appointments.map((appt) => (
                            <div key={appt.id} style={cardStyle}>
                                <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#2C3E50' }}>
                                    {appt.patient.user.firstName} {appt.patient.user.lastName}
                                </p>
                                <p style={{ margin: '0 0 5px 0', color: '#2C3E50' }}>
                                    with Dr. {appt.doctor.user.firstName} {appt.doctor.user.lastName}
                                </p>
                                <p style={{ margin: '0 0 5px 0', color: '#2C3E50' }}>
                                    {appt.appointmentDate} at {formatTime(appt.appointmentTime)}
                                </p>
                                <p style={{ margin: 0, color: '#4A90D9', fontSize: '13px' }}>
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

export default ClinicReports;