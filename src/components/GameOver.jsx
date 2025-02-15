
import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const GameOver = ({ show, message,onClose }) => {
  return (
    <ToastContainer position="top-center" className="p-3">
      <Toast show={show} onClose={onClose} autohide delay={3000}>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default GameOver;
