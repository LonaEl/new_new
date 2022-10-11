import React, { useState, useEffect } from 'react';
import { Box, Typography, Toolbar, Avatar, Button } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {styled} from '@mui/material/styles';
import decode from 'jwt-decode';
import { deepPurple } from '@mui/material/colors';

import * as actionType from '../../constants/actionTypes';

const AppBar = styled("div")(({ theme }) => ({
  borderRadius: 15,
  margin: '30px 0',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 50px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  color: theme.palette.getContrastText(deepPurple[500]),
  backgroundColor: deepPurple[500],
}));

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
    <AppBar position="static" color="inherit">
    {/* <Link to="/" sx={{ display: "flex", alignItems: "center"}}>
      <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" />
      <img marginLeft="10px" marginTop="5px" src={memoriesLogo} alt="icon" height="40px" />
    </Link> */}
    <Toolbar sx={{   display: 'flex',
    justifyContent: 'flex-end',
    width: 400}}>
      {user?.result ? (
        <Box sx={{
          display: 'flex',
        justifyContent: 'space-between',
        width: 400,
        alignItems: 'center',
        }}>
          <StyledAvatar alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</StyledAvatar>
          <Typography display="flex" alignItems="center" textAlign="center" variant="h6">{user?.result.name}</Typography>
          <Button variant="contained" marginLeft="20px" color="secondary" onClick={logout}>Logout</Button>
        </Box>
      ) : (
        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
      )}
    </Toolbar>
  </AppBar>
  );
};

export default Navbar;