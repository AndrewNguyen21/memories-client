import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts, searchPosts } from '../../actions/posts';
import {
  Button,
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
} from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles';
import Paginate from '../Pagination/Pagination';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [currentId, dispatch]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      //console.log(tags.join(','))
      //dispatch(searchPosts({search, tags: tags.join(',').replace(/#/g, '')}))
      dispatch(searchPosts({search, tags: tags.join(',')}))
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justifyContent='space-between'
          alignItems='stretch'
          spacing={3}
        >
          <Grid item xs={12} sm={12} md={9} className={classes.postsContainer}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position='static'
              color='inherit'
            >
              <TextField
                name='search'
                variant='outlined'
                label='Search Memories'
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label='Search Tags'
                variant='outlined'
                newChipKeys={[' ']}
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant='contained'
                color='primary'
                disabled={(tags.length < 1) && (!search || (search.replace(/\s/g, '').length==0))}
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
              <Paper elevation={6}  className={classes.pagination}>
              <Paginate page={page}/>
            </Paper>
            )}
          </Grid>
        </Grid>
        {/* <div className={classes.smallScreen}> */}
        <Paper elevation={6}  className={classes.paginationSmall}>
        <Paginate page={page}/>
        </Paper>
        {/* </div> */}
      </Container>
    </Grow>
  );
};

export default Home;
