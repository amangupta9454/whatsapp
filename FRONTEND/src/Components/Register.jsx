import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('password', password);
    if (file) formData.append('profileImage', file);

    try {
      const res = await axios.post('http://localhost:5000/api/users/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(`${res.data.message}. Redirecting to OTP verification...`);
      setTimeout(() => navigate('/verify'), 2000); // Redirect to OTP page
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 1024 * 1024) {
      setMessage('Image max 1MB');
      return;
    }
    setFile(selectedFile);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <input type="file" accept="image/*" onChange={handleFileChange} style={{ margin: '16px 0' }} />
      <Button type="submit" variant="contained" disabled={loading} fullWidth>
        {loading ? <CircularProgress size={24} /> : 'Register'}
      </Button>
      <Link to="/login">Login Now</Link>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Register;