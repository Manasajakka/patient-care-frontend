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
        <div style={{ maxWidth: '500px', margin: '50px auto', fontFamily: 'Arial' }}>
            <h1>Book an Appointment</h1>
            <form onSubmit={fetchOpenSlots}>
                <input
                    type="number"
                    placeholder="Your Patient ID"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    required
                />
                <br /><br />
                <input
                    type="number"
                    placeholder="Doctor ID"
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    required
                />
                <br /><br />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <br /><br />
                <button type="submit">Find Open Slots</button>
            </form>

            {message && <p>{message}</p>}

            {slots.length > 0 && (
                <div>
                    <h3>Available Times</h3>
                    {slots.map((slot) => (
                        <button
                            key={slot}
                            onClick={() => bookSlot(slot)}
                            style={{ margin: '5px', padding: '8px 12px' }}
                        >
                            {formatTime(slot)}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dashboard;