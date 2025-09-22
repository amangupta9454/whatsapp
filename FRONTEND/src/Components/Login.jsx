import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response.data.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
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
      <Button type="submit" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Login'}
      </Button>
      <Link to="/register">Register Now</Link>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Login;