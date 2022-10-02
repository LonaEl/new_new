import React from 'react';
import { Container } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom';
import ThemeProvider from '@mui/system/ThemeProvider';

import theme from './styles'
import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';

import Claim from './components/Claim/Claim';
import Terms from './components/Terms/Terms';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <ThemeProvider theme={theme} >
     <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route exact path="/" element={ <Navigate to="/posts" />} />
          <Route exact path="/posts" element={<Home />} />
          <Route exact path="/posts/search" element={<Home />} />
          <Route exact path="/posts/:id" element={<PostDetails />} />
          <Route exact path='/tags/:name' element={<CreatorOrTag />} />
          <Route exact path='/creators/:name' element={<CreatorOrTag />} />
          <Route exact path="/auth" element={(!user ? <Auth /> : <Navigate to="/posts" />)} />
          <Route exact path="/claim" element={<Claim />} />
          <Route exact path="/termsandconditions" element={<Terms />} />
    
        </Routes>
      </Container>
    </ThemeProvider>
  );
};

export default App;