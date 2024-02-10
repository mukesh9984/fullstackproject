import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = ({ setLoggedIn, handleSignupSubmit }) => { 

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    age: '',
    dob: '',
    contact: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', formData);
      console.log(response.data);
      handleSignupSubmit();
 window.location.href = '/login';
 
    } catch (error) {
      console.error(error);
    }
  };
 const redirectToLogin = () => {
   
    const { username, email, password, age, dob, contact } = formData;
    if (username && email && password && age && dob && contact) {
  
      window.location.href = '/login';
    } else {
      alert('Please fill in all fields');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
      <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} required />
      <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
      <button type="submit"onClick={redirectToLogin}>Sign Up</button>
    </form>
  );
};

export default SignupForm;

