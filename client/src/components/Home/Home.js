import React, { useState} from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
//import ChipInput from 'material-ui-chip-input';

import { getPostsBySearch } from '../../actions/posts';
import ThemeProvider from '@mui/system/ThemeProvider'
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import theme from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {

  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      navigate('/');
    }
  };
/* 
  useEffect(() => {
      dispatch(getPostsBySearch(search));
  },[search]);  */

 const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  }; 

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <ThemeProvider theme={theme}>
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar position="static" color="inherit">
             
              <TextField 
              onKeyDown={handleKeyPress} 
              name="search" 
              variant="outlined" 
              label="Search title or name" 
              fullWidth 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} />
              
             {/*  
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
 */}


              <Button onClick={searchPost}  variant="contained" color="primary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(
              !searchQuery && !tags.length) && (
              <Paper elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
    </ThemeProvider>
  );
};

export default Home;