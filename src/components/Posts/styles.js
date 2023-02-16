import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: '',
    flexDirection: 'row',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  noPosts: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
}));
