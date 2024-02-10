
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile = ({ history }) => {
  const [userDetails, setUserDetails] = useState({
    username: '',
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

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/editUserDetails', userDetails);

      window.location.href = '/profile';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={userDetails.username} onChange={handleChange} />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={userDetails.age} onChange={handleChange} />
        </div>
        <div>
          <label>Contact:</label>
          <input type="text" name="contact" value={userDetails.contact} onChange={handleChange} />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
