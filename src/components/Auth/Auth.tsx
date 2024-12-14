import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, TextField, Button } from '@mui/material';
import { AuthContainer } from './Auth.styled';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.classList.add('auth-page');
    return () => {
      document.body.classList.remove('auth-page');
    };
  }, []);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleLogin = async () => {
    console.log('Login data:', loginData);

    if (!loginData.email || !loginData.password) {
      setError('Please fill in both fields');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/login/',
        loginData
      );

      localStorage.setItem('token', response.data.token);

      toast.success('Login successful');
      navigate('/');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError(err.response.data || 'Failed to login');
        } else {
          setError('Network error or no response');
          toast.error(error);
        }
      } else {
        setError('An unexpected error occurred');
      }
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/register/',
        registerData
      );
      toast.success('Registration successful');
      navigate('/');
      localStorage.setItem('token', response.data.token);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError(err.response.data || 'Failed to register user');
        } else {
          setError('Network error or no response');
        }
      } else {
        setError('An unexpected error occurred');
      }
      toast.error('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: 400,
          padding: 6,
          boxShadow: 4,
          borderRadius: 2,
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        style={{
          margin: 'auto',
          backdropFilter: 'blur(5px)',
          boxShadow: '0px 0px 30px rgba(255, 255, 255, 0.37)',
          border: '2px solid rgba(255, 255, 255, 0.18)',
        }}
      >
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab
            label="Login"
            style={{
              color: 'white',
            }}
          />
          <Tab
            label="Register"
            style={{
              color: 'white',
            }}
          />
        </Tabs>

        <Box sx={{ mt: 3 }}>
          {activeTab === 0 && (
            <Box>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={loginData.email}
                onChange={e =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                InputLabelProps={{
                  style: { color: 'white' },
                }}
                InputProps={{
                  style: { color: 'white', backgroundColor: '#333' },
                  sx: {
                    '&:-webkit-autofill': {
                      WebkitBoxShadow: '0 0 0px 1000px #000000 inset',
                      WebkitTextFillColor: 'white',
                      transition: 'background-color 5000s ease-in-out 0s',
                    },
                  },
                }}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={loginData.password}
                onChange={e =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                InputLabelProps={{
                  style: { color: 'white' },
                }}
                InputProps={{
                  style: { color: 'white', backgroundColor: '#333' },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleLogin}
                style={{ color: 'white' }}
                disabled={loading}
              >
                Login
              </Button>
            </Box>
          )}
          {activeTab === 1 && (
            <Box>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={registerData.username}
                onChange={e =>
                  setRegisterData({ ...registerData, username: e.target.value })
                }
                InputLabelProps={{
                  style: { color: 'white' },
                }}
                InputProps={{
                  style: { color: 'white', backgroundColor: '#333' },
                }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={registerData.email}
                onChange={e =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
                InputLabelProps={{
                  style: { color: 'white' },
                }}
                InputProps={{
                  style: { color: 'white', backgroundColor: '#333' },
                }}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={registerData.password}
                onChange={e =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
                InputLabelProps={{
                  style: { color: 'white' },
                }}
                InputProps={{
                  style: { color: 'white', backgroundColor: '#333' },
                }}
              />
              <TextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={registerData.confirmPassword}
                onChange={e =>
                  setRegisterData({
                    ...registerData,
                    confirmPassword: e.target.value,
                  })
                }
                InputLabelProps={{
                  style: { color: 'white' },
                }}
                InputProps={{
                  style: { color: 'white', backgroundColor: '#333' },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleRegister}
                style={{ color: 'white' }}
                disabled={loading}
              >
                Register
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </AuthContainer>
  );
};
