import React from "react";
import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";
export const ModalOverlay = ({ onClick }) => {
  return <div onClick={onClick} className={styles.overlay}></div>;
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
