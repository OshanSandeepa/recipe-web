import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-4xl font-bold text-pink-500 font-serif">
          coek
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-lg font-medium text-gray-700 hover:text-pink-500 transition duration-300">
            HOME
          </Link>
          <Link to="/favorites" className="text-lg font-medium text-gray-700 hover:text-pink-500 transition duration-300">
            FAVOURITE
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="text-lg font-medium text-gray-700 hover:text-pink-500 transition duration-300 focus:outline-none"
            >
              Logout
            </button>
          ) : (
            <>
              {/* Login and Register links are not explicitly in the main navbar design, 
                  they are handled by the forms. Leaving them out as per design. */}
            </>
          )}
          <Link to="/dashboard" className="p-2 rounded-full hover:bg-gray-100 transition duration-300">
            <DocumentTextIcon className="h-8 w-8 text-gray-600" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 