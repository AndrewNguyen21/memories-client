import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    overflowX: 'auto',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
    },
  },
  recommendCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
    marginTop: '15px',
    marginBottom: '25px',
    marginLeft: '15px',
    marginRight: '15px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '200px',
      height: '250px',
    },
  },
  recommendCardContent: {
    textAlign: 'center',
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  commentsInnerContainer: {
    marginRight: '30px',
    width: '45%',
  },
  commentsScroll: {
    height: '200px',
    overflowY: 'scroll',
  },
}));
