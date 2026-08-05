import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('loggedInUser');

    function handleLogout() {
        localStorage.removeItem('loggedInUser');
        navigate('/login');
    }

    return (
        <nav style={{
            padding: '15px 30px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #DCEEFA',
            fontFamily: 'Arial',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 10px rgba(111, 168, 220, 0.1)'
        }}>
      <span style={{ color: '#2C3E50', fontWeight: 'bold' }}>
        AI Patient Care
      </span>
            <div>
                {!isLoggedIn && (
                    <>
                        <Link to="/register" style={linkStyle}>Register</Link>
                        <Link to="/login" style={linkStyle}>Login</Link>
                    </>
                )}
                {isLoggedIn && (
                    <button onClick={handleLogout} style={logoutStyle}>Logout</button>
                )}
            </div>
        </nav>
    );
}

const linkStyle = {
    color: '#4A90D9',
    textDecoration: 'none',
    marginRight: '20px',
    fontSize: '14px'
};

const logoutStyle = {
    backgroundColor: 'transparent',
    border: '1px solid #6FA8DC',
    color: '#4A90D9',
    padding: '6px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
};

export default Navbar;