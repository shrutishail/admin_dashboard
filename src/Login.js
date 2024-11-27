import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use navigate for redirection
import Cookies from 'js-cookie'; // Import the js-cookie library

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Hook for redirection

  // Correct credentials
  const correctEmail = 'admin@gmail.com';
  const correctPassword = 'Admin@123';

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the entered credentials match
    if (email === correctEmail && password === correctPassword) {
      // Set session in sessionStorage (or localStorage if persistent login)
      sessionStorage.setItem('user', JSON.stringify({ email }));

      // Set a cookie to remember the user (optional)
      Cookies.set('authToken', '2056a79421856f0434104a5ff857fe39', { expires: 7 }); // expires in 7 days

      // Redirect to the dashboard after successful login
      navigate('/portal/dashboard', { replace: true });
    } else {
      // Set error message
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-10 col-lg-12 col-md-9">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            {/* Nested Row within Card Body */}
            <div className="row">
              <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
              <div className="col-lg-6">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                  </div>

                  {/* Show error message if credentials are incorrect */}
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  <form className="user" onSubmit={handleLogin}>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-user"
                        id="exampleInputEmail"
                        aria-describedby="emailHelp"
                        placeholder="Enter Email Address..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-user"
                        id="exampleInputPassword"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <div className="custom-control custom-checkbox small">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck"
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-user btn-block">
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
