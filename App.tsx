
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
};

const AppRoutes: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/chat" /> : <Navigate to="/signin" />} />
            <Route path="/signin" element={!isAuthenticated ? <AuthPage isSignIn={true} /> : <Navigate to="/chat" />} />
            <Route path="/signup" element={!isAuthenticated ? <AuthPage isSignIn={false} /> : <Navigate to="/chat" />} />
            <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to="/signin" />} />
        </Routes>
    );
}

export default App;
