import React, { useEffect, useState } from 'react';
import Nav from './Nav';

const UserProfile = () => {
  const [userAccessToken, setUserAccessToken] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!userAccessToken) {
          // If the access token is not available, handle it accordingly (redirect to login, etc.)
          console.error('Access token not available.');
          return;
        }

        const response = await fetch('http://localhost:5000/userProfile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userAccessToken}`, // Use the actual access token here
          },
        });

        if (response.ok) {
          // If the response status is okay (2xx), parse the JSON response
          const data = await response.json();
          console.log('User Profile:', data);
        } else {
          // Handle non-successful response (e.g., 401 Unauthorized)
          console.error('Failed to fetch user profile:', response.statusText);
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error during user profile fetch:', error);
      }
    };

    // Call the fetchUserProfile function when the component mounts
    fetchUserProfile();
  }, [userAccessToken]); // Include userAccessToken in the dependency array

  // Assume you have a mechanism to set the access token after a successful login
  const handleLogin = (accessToken) => {
    setUserAccessToken(accessToken);
    // You can also store the access token securely, e.g., in a cookie or local storage
  };

  return (
    <>
    <Nav/>
    <div>
      <h2>User Profile</h2>
      {/* Your UI rendering code here */}
    </div>
    </>
  );
};

export default UserProfile;
