import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    Form: {
      maxWidth: '500px',
      width: '100%',
      margin: '0 auto',
    },
    TextField: {
      borderRadius: "50%",
    }
  }));

  export default useStyles;