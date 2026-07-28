import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={{ padding: '15px', borderBottom: '1px solid #ccc', fontFamily: 'Arial' }}>
            <Link to="/register" style={{ marginRight: '15px' }}>Register</Link>
            <Link to="/login" style={{ marginRight: '15px' }}>Login</Link>
            <Link to="/dashboard">Dashboard</Link>
        </nav>
    );
}

export default Navbar;