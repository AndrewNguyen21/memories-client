import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 15,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: '15px',
    marginTop: '1rem',
    padding: '16px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  paginationSmall: {
    borderRadius: '15px',
    marginTop: '1rem',
    padding: '16px',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  gridContainer: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
}));
