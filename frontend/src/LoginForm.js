
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ setLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = axios.post('http://localhost:5000/login', formData);
      console.log(response.data);
      setLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };
 const redirectToProfile = () => {

    const { email, password } = formData;
    if (email && password) {
   
        setLoggedIn(true);

      setTimeout(()=>{window.location.href = '/profile'},3000);
    } else {
      alert('Please fill in all fields');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
      <button type="submit" onClick={redirectToProfile}>Login</button>
    </form>
  );
};

export default LoginForm;
