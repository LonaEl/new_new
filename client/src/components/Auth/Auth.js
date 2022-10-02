import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ThemeProvider from '@mui/system/ThemeProvider';
import LockOutlinedIcon  from '@mui/icons-material/LockOutlined'
import { signin, signup } from '../../actions/auth';

import theme from './styles';

import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, navigate));
    } else {
      dispatch(signin(form, navigate));
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <ThemeProvider theme={theme} >
      <Paper elevation={6}>
        <Avatar >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5"> { isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
            {!isSignup && (
            <>
            <Link to="/forgot-password"> <p>Forgot Password?</p> </Link>
            </>
           )} 
        <Button type="submit" fullWidth variant="contained" color="primary" >
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
        <Grid container justifyContent="flex-end">
            <Grid item>
         <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
     </Grid>
          </Grid>
        </form>
      </Paper>
      </ThemeProvider>
    </Container>
  );
};

export default SignUp;