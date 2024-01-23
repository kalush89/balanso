import React, { useState } from 'react';
import Link from 'next/link';
import { useAuthContext } from '../../../../firebase/auth';

const Navigation: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { authUser, logOut } = useAuthContext();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-black-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Profile pic on the far left */}
        <div className="flex items-center">
          <div className="relative">
            <img
              src={authUser?.photoURL}
              alt="Profile Pic"
              className="w-9 h-9 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 bg-white border rounded shadow-md">
                <ul className="py-2 px-4">
                  <li>
                    <span className="text-blue-500">
                      {authUser?.email}
                    </span>
                  </li>
                  <li>
                    <Link href="/settings" className="text-blue-500">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <span onClick={logOut} className="text-blue-500 cursor-pointer">
                      Sign Out
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Logo in the middle */}
        <div className="mx-auto">
          <Link href="/" className="text-white font-bold text-xl">
            Your Logo
          </Link>
        </div>

        {/* Notifications on the far right */}
        <div className="flex items-center">
          {/* Add your notifications component here */}
          <div className="ml-auto">
            <span className="text-white">
              <svg className="w-7 h-7 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.8 5.5 10.4 3m.4 2.4a5.3 5.3 0 0 1 6 4.3l.4 1.8c.4 2.3 2.4 2.6 2.6 3.7.1.6.2 1.2-.3 1.3L6.8 19c-.5 0-.7-.5-.8-1.1-.2-1.2 1.5-2.1 1.1-4.4l-.3-1.8a5.3 5.3 0 0 1 4-6.2Zm-7 4.4a8 8 0 0 1 2-4.9m2.7 13.7a3.5 3.5 0 0 0 6.7-.8l.1-.5-6.8 1.3Z" />
              </svg>

            </span>
            {/* Add notification icon or count */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
