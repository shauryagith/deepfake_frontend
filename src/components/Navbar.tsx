import { Link, useNavigate } from 'react-router-dom';
import { Brain, Shield, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const isLogin = localStorage.getItem('token') !== null;

  // if(!isLogin){
  //   return null; // Don't render Navbar if not logged in
  // }
  const handleLogout = () => {
    logout(); // Clears auth context
    localStorage.removeItem('token'); // Removes stored token
    navigate('/login'); // Optional: redirect to home page
  };

  return (
    <nav className="bg-gray-800/50 backdrop-blur-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-purple-500" />
            <span className="text-xl font-bold text-white">DeepGuard</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/detection"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <Shield className="h-4 w-4 mr-1" />
              Detect
            </Link>

            {!isLogin ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center hover:bg-purple-700"
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

