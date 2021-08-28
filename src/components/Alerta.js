import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Dialog, Button } from 'react-desktop/macOs';
import trashIcon from './icons/user-trash.svg'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

export default function Alerta({show, confirm, exit, titulo, msj}) {
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
        <Fade in={show}>
          <div className={classes.paper}>
          <Dialog
          title={titulo}
          message={msj}
          icon={renderIcon()}
          buttons={[
            <Button onClick={handleClose}>Cancelar</Button>,
            <Button color="blue" onClick={() => confirm(true)} >Eliminar</Button>,
          ]}
        />

            </div>
        </Fade>
      </Modal>
    </div>
  );
}