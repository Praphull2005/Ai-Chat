
import React, { useState } from 'react';
import { SignInForm } from '../components/auth/SignInForm';
import { SignUpForm } from '../components/auth/SignUpForm';

interface AuthPageProps {
  isSignIn: boolean;
}

const AuthPage: React.FC<AuthPageProps> = ({ isSignIn }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        {isSignIn ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
};

export default AuthPage;
