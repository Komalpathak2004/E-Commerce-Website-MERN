import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
    const user = useSelector((state) => state?.user?.user);

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-3xl font-semibold mb-6">Profile</h1>
            <div className="bg-white p-6 shadow rounded-lg">
                <div className="flex items-center gap-4 mb-6">
                    {user?.profilePic ? (
                        <img src={user?.profilePic} className="w-20 h-20 rounded-full" alt="Profile" />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-2xl font-semibold text-gray-500">{user?.name?.charAt(0)}</span>
                        </div>
                    )}
                    <div>
                        <h2 className="text-2xl font-semibold">{user?.name}</h2>
                        <p className="text-gray-600">{user?.email}</p>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-4">User Information</h3>
                    <p className="mb-2"><strong>Role:</strong> {user?.role}</p>
                    <p className="mb-2"><strong>Address:</strong> {user?.address || 'N/A'}</p>
                    {/* Add more user information as needed */}
                </div>
            </div>
        </div>
    );
};

export default Profile;
