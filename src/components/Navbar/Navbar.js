import React, { useEffect, useState, useCallback } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles';
import memoriesLogo from '../../images/memories-logo.png';
import memoriesText from '../../images/memories-text.png';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const userToken = user?.token;

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    setUser(null);
    history.push('/auth');
    window.location.reload();
  }, [dispatch, history]);

  useEffect(() => {
    const token = userToken;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.expm * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location, logout, userToken]);

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <Link to='/' className={classes.brandContainer}>
        <img
          component={Link}
          to='/'
          src={memoriesText}
          alt='icon'
          height='45px'
        />
        <img
          className={classes.image}
          src={memoriesLogo}
          alt='icon'
          height='40px'
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant='h6'>
              {user.result.name}
            </Typography>
            <Button
              variant='contained'
              className={classes.logout}
              color='secondary'
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link to='/auth'>
            <Button variant='contained' color='primary'>
              Sign In
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
