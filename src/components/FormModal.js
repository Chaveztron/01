import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Dialog, Button, TextInput } from 'react-desktop/macOs';
import trashIcon from './icons/user-trash.svg'
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'none',
  },
  paper: {
    backdropFilter: 'blur(4px)',
    background: 'rgb(255, 255, 255, 0.6)',
    borderRadius: '10px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
    forcedColorAdjust: 'none'
  },
}));


const renderIcon = (props) => {
  return (
    <img src={trashIcon} width="80" height="80" aria-hidden alt="icono" />
  );
};

export default function FormModal({children, show, exit, titulo}) {
  const classes = useStyles();

const focusDiv = React.useRef();

React.useEffect(() => {
 if(focusDiv.current) focusDiv.current.focus(); 
}, [focusDiv]);

  const handleClose = () => {
    exit(false)
  };



  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={show}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={show} >
          <div className={classes.paper}>
        <div style={{'marginBottom': '10px'}}> 
            <Typography variant="h4" align="center">
                {titulo}
            </Typography>
        </div>

            {children}

            </div>
        </Fade>
      </Modal>
    </div>
  );
}

