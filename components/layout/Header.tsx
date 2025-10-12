
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BellIcon, ChevronDownIcon, DiamondIcon, LogOutIcon, SettingsIcon, UsersIcon } from '../shared/Icons';
import { Notification } from '../../types';

const mockNotifications: Notification[] = [
    { id: '1', message: 'New feature alert: You can now export your chats!', timestamp: '2 hours ago', read: false },
    { id: '2', message: 'Your credits are running low. Top up now!', timestamp: '1 day ago', read: false },
    { id: '3', message: 'Welcome to Gemini AI Chat!', timestamp: '3 days ago', read: true },
];

export const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    
    const notificationRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    const unreadCount = mockNotifications.filter(n => !n.read).length;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setNotificationsOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-800">AI Chat</h1>
            <div className="flex items-center space-x-6">
                <div className="flex items-center px-3 py-1 space-x-2 bg-blue-100 rounded-full text-blue-800">
                    <DiamondIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{user?.credits}</span>
                </div>
                <div className="relative" ref={notificationRef}>
                    <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="relative text-gray-500 hover:text-gray-700">
                        <BellIcon className="w-6 h-6" />
                        {unreadCount > 0 && <span className="absolute top-0 right-0 block w-2 h-2 bg-blue-500 rounded-full"></span>}
                    </button>
                    {notificationsOpen && (
                        <div className="absolute right-0 w-80 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20">
                           <div className="p-4 border-b">
                                <h3 className="font-semibold text-gray-800">Notifications</h3>
                           </div>
                           <ul className="py-2 overflow-y-auto max-h-80">
                                {mockNotifications.map(notification => (
                                    <li key={notification.id} className={`px-4 py-3 hover:bg-gray-100 ${!notification.read ? 'bg-blue-50' : ''}`}>
                                        <p className="text-sm text-gray-700">{notification.message}</p>
                                        <p className="mt-1 text-xs text-gray-500">{notification.timestamp}</p>
                                    </li>
                                ))}
                           </ul>
                        </div>
                    )}
                </div>
                <div className="relative" ref={profileRef}>
                    <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-semibold">
                           {user?.name?.charAt(0)}
                        </div>
                        <span className="hidden text-sm font-medium text-gray-700 md:block">{user?.email}</span>
                        <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                    </button>
                    {profileOpen && (
                        <div className="absolute right-0 w-56 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-20 py-1">
                            <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                               <UsersIcon className="w-4 h-4 mr-3 text-gray-500"/> Organization
                            </a>
                             <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                               <SettingsIcon className="w-4 h-4 mr-3 text-gray-500"/> Settings
                            </a>
                            <div className="border-t border-gray-100 my-1"></div>
                            <button onClick={logout} className="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50">
                                <LogOutIcon className="w-4 h-4 mr-3"/> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
