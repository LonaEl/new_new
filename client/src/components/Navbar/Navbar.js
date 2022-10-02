import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import ThemeProvider from '@mui/system/ThemeProvider'
import * as actionType from '../../constants/actionTypes';
import theme from './styles';

const Navbar = () => {

/*   if the user is empty initially, the user will be set to an empty array as per react18
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')) ?? []);
  */

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();


  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    navigate('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <ThemeProvider theme={theme}>
    <AppBar position="static" color="inherit">
      <Link to="/" >
      <Typography variant='h2' >Wits</Typography>
      </Link>
      <Toolbar >
        {user?.result ? (
          <div>
            <Avatar alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;