import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate to redirect
import Cookies from 'js-cookie'; // For cookie handling
import { useState } from 'react';

function Topbar() {
  const navigate = useNavigate(); // Hook to programmatically redirect the user

  const handleLogout = () => {
    // Clear sessionStorage or localStorage if you are using it
    sessionStorage.removeItem('user'); // Clear session data
    Cookies.remove('authToken'); // Remove authentication token cookie

    // Redirect user to login page after logout
    navigate('/', { replace: true }); // Using replace to ensure the user cannot go back
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* Sidebar Toggle (Topbar) */}
      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
       </button>

      {/* Topbar Navbar */}
      <ul className="navbar-nav ml-auto">
        {/* Nav Item - User Information */}
        <div className="topbar-divider d-none d-sm-block"></div>

        <li className="nav-item dropdown no-arrow">
          <button
            className="nav-link dropdown-toggle"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={handleLogout} // Trigger the logout function
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">Logout</span>
            <FontAwesomeIcon icon={faCircleUser} size={"xl"} />
          </button>

          {/* Dropdown - User Information */}
           
        </li>
      </ul>
    </nav>
  );
}

export default Topbar;
