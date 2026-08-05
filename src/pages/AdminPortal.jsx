import { Link } from 'react-router-dom';

function AdminPortal() {
    const storedUser = localStorage.getItem('loggedInUser');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user || user.role !== 'ADMIN') {
        return (
            <div style={{ minHeight: '90vh', backgroundColor: '#F4F9FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial' }}>
                <p style={{ color: '#2C3E50' }}>You do not have permission to view this page.</p>
            </div>
        );
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
                <h1 style={{ color: '#2C3E50', textAlign: 'center', marginBottom: '5px' }}>
                    Admin Portal
                </h1>
                <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '13px', marginBottom: '25px' }}>
                    {user.email}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Link to="/clinic-reports" style={linkButtonStyle}>Clinic Reports (by date range)</Link>
                    <Link to="/admin-panel" style={linkButtonStyle}>Manage Doctors & Patients</Link>
                    <Link to="/find-doctor" style={linkButtonStyle}>View All Doctors</Link>
                </div>
            </div>
        </div>
    );
}

const linkButtonStyle = {
    display: 'block',
    textAlign: 'center',
    padding: '12px',
    backgroundColor: '#6FA8DC',
    color: 'white',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '15px'
};

export default AdminPortal;
