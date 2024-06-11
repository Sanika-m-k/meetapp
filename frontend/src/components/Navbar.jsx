import React , {useEffect, useState}from 'react';
import { Link } from 'react-router-dom';
import supabase from '../supabaseClient';
const Navbar = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
          const { data, error } = await supabase.auth.getUser();
    
          if (error) {
            console.error('Error fetching user:', error);
          } else {
            setUser(data.user);
          }
        };
    
        fetchUser();
      }, []);

      const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
      };
    

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MyApp</Link>
      </div>
      {user?(<><span>{user.email}</span>
          <button onClick={handleLogout} className="navbar-button">Logout</button>
      </>):
        (<div className="navbar-links">
        <Link to="/login" className="navbar-button">Login</Link>
        <Link to="/signup" className="navbar-button">Signup</Link>
      </div>)
      }
      
    </nav>
  );
};

export default Navbar;
