import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false); // State for password error
  const [generalError, setGeneralError] = useState(''); // State for general login errors
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(false); // Reset errors on new submission
    setGeneralError('');

    if (!password) {
      setPasswordError(true);
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Login failed';
      setGeneralError(errorMessage);
      toast.error(errorMessage);
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl transform transition-all duration-300 ease-in-out">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pink-500 font-serif mb-4">coek</h1>
          <h2 className="text-3xl font-semibold text-gray-800">Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
              Email address
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
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPasswordError(false); }}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition duration-200 ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">Please enter a password.</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 transition duration-300 disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'SIGN IN'}
          </button>
          {generalError && (
            <p className="text-red-500 text-center text-sm mt-2">{generalError}</p>
          )}
        </form>

        <p className="mt-8 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-pink-500 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login; 