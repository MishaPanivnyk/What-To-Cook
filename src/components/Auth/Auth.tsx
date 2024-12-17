import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, TextField, Button } from '@mui/material';
import { AuthContainer } from './Auth.styled';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const apiUrl = import.meta.env.VITE_API_URL;
export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [registerStep, setRegisterStep] = useState(1);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    age: '',
    social_links: { facebook: '', instagram: '' },
    allergic_products: '',
    restricted_products: '',
    description: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  console.log(error);
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
    if (!loginData.email || !loginData.password) {
      setError('Please fill in both fields');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/login/`, loginData);
      localStorage.setItem('token', response.data.token);
      toast.success('Login successful');
      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data || 'Login failed');
      } else {
        setError('An unexpected error occurred');
      }
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterNext = async () => {
    if (
      !registerData.email ||
      !registerData.password ||
      !registerData.confirmPassword
    ) {
      setError('Please fill in all fields');
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${apiUrl}/register/`, {
        email: registerData.email,
        password: registerData.password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);

      toast.success('Registration step 1 successful');
      setRegisterStep(2);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data || 'Registration failed');
      } else {
        setError('An unexpected error occurred');
      }
      toast.error('Error during registration');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Token not found. Please restart registration.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await axios.post(
        `${apiUrl}/secondregister/`,
        {
          username: registerData.username,
          age: registerData.age,
          social_links: registerData.social_links,
          allergic_products: registerData.allergic_products,
          restricted_products: registerData.restricted_products,
          description: registerData.description,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      toast.success('Registration step 2 successful');
      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data || 'Registration failed');
      } else {
        setError('An unexpected error occurred');
      }
      toast.error('Error during second registration step');
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
          <Tab label="Login" style={{ color: 'white' }} />
          <Tab label="Register" style={{ color: 'white' }} />
        </Tabs>

        <Box sx={{ mt: 3 }}>
          {/* Login Form */}
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
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{
                  style: {
                    borderRadius: '10px',
                    color: 'white',
                    backgroundColor: '#333',
                  },
                }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={loginData.password}
                onChange={e =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{
                  style: {
                    borderRadius: '10px',
                    color: 'white',
                    backgroundColor: '#333',
                  },
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

          {/* Registration Form - Step 1 */}
          {activeTab === 1 && registerStep === 1 && (
            <Box>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={registerData.email}
                onChange={e =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{
                  style: {
                    borderRadius: '10px',
                    color: 'white',
                    backgroundColor: '#333',
                  },
                }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={registerData.password}
                onChange={e =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{
                  style: {
                    borderRadius: '10px',
                    color: 'white',
                    backgroundColor: '#333',
                  },
                }}
              />
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={registerData.confirmPassword}
                onChange={e =>
                  setRegisterData({
                    ...registerData,
                    confirmPassword: e.target.value,
                  })
                }
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{
                  style: {
                    borderRadius: '10px',
                    color: 'white',
                    backgroundColor: '#333',
                  },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleRegisterNext}
                style={{ color: 'white' }}
              >
                Next
              </Button>
            </Box>
          )}

          {/* Registration Form - Step 2 */}
          {activeTab === 1 && registerStep === 2 && (
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
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{
                  style: {
                    borderRadius: '10px',
                    color: 'white',
                    backgroundColor: '#333',
                  },
                }}
              />
              <TextField
                label="Age"
                variant="outlined"
                fullWidth
                margin="normal"
                value={registerData.age}
                onChange={e =>
                  setRegisterData({ ...registerData, age: e.target.value })
                }
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{
                  style: {
                    borderRadius: '10px',
                    color: 'white',
                    backgroundColor: '#333',
                  },
                }}
              />
              <TextField
                label="Facebook Link"
                variant="outlined"
                fullWidth
                margin="normal"
                value={registerData.social_links.facebook}
                onChange={e =>
                  setRegisterData({
                    ...registerData,
                    social_links: {
                      ...registerData.social_links,
                      facebook: e.target.value,
                    },
                  })
                }
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{
                  style: {
                    borderRadius: '10px',
                    color: 'white',
                    backgroundColor: '#333',
                  },
                }}
              />
              <TextField
                label="Instagram Link"
                variant="outlined"
                fullWidth
                margin="normal"
                value={registerData.social_links.instagram}
                onChange={e =>
                  setRegisterData({
                    ...registerData,
                    social_links: {
                      ...registerData.social_links,
                      instagram: e.target.value,
                    },
                  })
                }
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{
                  style: {
                    borderRadius: '10px',
                    color: 'white',
                    backgroundColor: '#333',
                  },
                }}
              />
              <TextField
                label="Allergic Products"
                variant="outlined"
                fullWidth
                margin="normal"
                value={registerData.allergic_products}
                onChange={e =>
                  setRegisterData({
                    ...registerData,
                    allergic_products: e.target.value,
                  })
                }
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{
                  style: {
                    borderRadius: '10px',
                    color: 'white',
                    backgroundColor: '#333',
                  },
                }}
              />
              <TextField
                label="Restricted Products"
                variant="outlined"
                fullWidth
                margin="normal"
                value={registerData.restricted_products}
                onChange={e =>
                  setRegisterData({
                    ...registerData,
                    restricted_products: e.target.value,
                  })
                }
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{
                  style: {
                    borderRadius: '10px',
                    color: 'white',
                    backgroundColor: '#333',
                  },
                }}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={registerData.description}
                onChange={e =>
                  setRegisterData({
                    ...registerData,
                    description: e.target.value,
                  })
                }
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{
                  style: {
                    borderRadius: '10px',
                    color: 'white',
                    backgroundColor: '#333',
                  },
                }}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleRegisterSubmit}
                style={{ color: 'white' }}
              >
                Submit
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </AuthContainer>
  );
};
