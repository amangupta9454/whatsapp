import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://whatsapp-6uml.onrender.com/api/users/verify', { email, otp });
      setMessage(res.data.message);
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after success
    } catch (err) {
      setMessage(err.response?.data?.message || 'Verification failed');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
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
        label="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value.toUpperCase())}
        required
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" disabled={loading} fullWidth>
        {loading ? <CircularProgress size={24} /> : 'Verify OTP'}
      </Button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default VerifyOtp;