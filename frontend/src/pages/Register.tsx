import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMatchError(false);

    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    setIsLoading(true);

    try {
      const username = `${firstName} ${lastName}`.trim();
      await register(username, email, password);
      toast.success('Registration successful!');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Registration failed');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl transform transition-all duration-300 ease-in-out">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pink-500 font-serif mb-4">coek</h1>
          <h2 className="text-3xl font-semibold text-gray-800">Register</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-gray-700 text-sm font-medium mb-1">
                First name *
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition duration-200"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700 text-sm font-medium mb-1">
                Last name *
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition duration-200"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition duration-200"
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-medium mb-1">
                Phone number *
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition duration-200"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
                Password *
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition duration-200"
                required
                minLength={6}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-1">
                Confirm Password *
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setPasswordMatchError(false); }}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition duration-200 ${passwordMatchError ? 'border-red-500' : 'border-gray-300'}`}
                required
                minLength={6}
              />
              {passwordMatchError && (
                <p className="text-red-500 text-sm mt-1">The password does not match.</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 transition duration-300 disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-pink-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register; 