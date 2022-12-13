import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}/>;
};


const ModalOverlay = (props) => {
  if (props.cssClassName ==='sideNav-container') {
    return (
      <div className={classes['sideNav-container']}>
        <div >{props.children}</div>
      </div>
    );
  }else{
    return (
      <div className={classes.modal}>
        <div className={props.cssClassName}>{props.children}</div>
      </div>
    );
  }
};

const portalElement = document.getElementById('overlays');
// sending a classname as props to the modal component
// the modal component then sends the classname to the modaloverlay component
//  the modaloverlay component then sends the classname to the div with the classname of content


const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay cssClassName = {props.cssClassName}> {props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
