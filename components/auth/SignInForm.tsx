import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { EyeIcon, EyeOffIcon } from '../shared/Icons';

export const SignInForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock user login
    login({ email: 'praphullrahangdale@gmail.com', name: 'Praphull', credits: 1250 });
    navigate('/chat');
  };

  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
        <p className="mt-2 text-sm text-gray-600">Enter your credentials to access your account</p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
        <div className="space-y-4 rounded-md shadow-sm">
          <div>
            <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
            <input id="username" name="username" type="text" required
              className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter your username" />
          </div>
          <div>
            <label htmlFor="password-signin" className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <input id="password-signin" name="password" type={showPassword ? 'text' : 'password'} required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3">
                {showPassword ? <EyeOffIcon className="w-5 h-5 text-gray-400" /> : <EyeIcon className="w-5 h-5 text-gray-400" />}
              </button>
            </div>
          </div>
        </div>
        <div>
          <button type="submit"
            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Sign In
          </button>
        </div>
      </form>
      <p className="mt-8 text-sm text-center text-gray-600">
        Don't have an account?{' '}
        <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
          Sign up
        </Link>
      </p>
    </div>
  );
};