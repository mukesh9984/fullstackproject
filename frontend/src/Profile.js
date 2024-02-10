
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ loggedIn }) => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    age: '',
    dob: '',
    contact: ''
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/userDetails');
        setUserDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleEdit = () => {
    window.location.href = '/EditProfile';
  };

 const handleLogout = () => {

    window.location.href = '/signup';
  };

  return (
 <div style={{ 
    backgroundColor: '#68696357',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    width: 'fit-content',
    margin: '0 auto',
    textAlign: 'center'
}}>
  <h2 style={{ color: '#333' }}>Profile Details</h2>
  <div style={{ 
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      width: 'fit-content',
      margin: '0 auto',
      textAlign: 'left'
  }}>
    <p><strong>Username:</strong> {userDetails.username}</p>
    <p><strong>Email:</strong> {userDetails.email}</p>
    <p><strong>Age:</strong> {userDetails.age}</p>
    <p><strong>Date of Birth:</strong> {userDetails.dob.substring(0, userDetails.dob.indexOf('T'))}</p>
    <p><strong>Contact:</strong> {userDetails.contact}</p>
  </div>
  <div>
    <button style={{ 
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      padding: '10px 20px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      margin: '10px'
    }} onClick={handleEdit}>Edit Profile</button>
    <button style={{ 
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      padding: '10px 20px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      margin: '10px'
    }} onClick={handleLogout}>Logout</button>
  </div>
</div>
  );
};

export default Profile;

