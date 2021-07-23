import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

const Backdrop = ({onClick}) => {
  return <div className={styles.backdrop} onClick={onClick}></div>;
};

const Maincontainer = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};

const Modal = (props) => {
  let overlay = document.getElementById("overlays");
  return (
    <div>
      {ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, overlay)}
      {ReactDOM.createPortal(
        <Maincontainer children={props.children} />,
        overlay
      )}
    </div>
  );
};

export default Modal;
