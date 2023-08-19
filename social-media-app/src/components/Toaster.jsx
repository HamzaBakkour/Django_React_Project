//src/components/Toaster.jsx
import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

function Toaster(props) {
    const {showToast, title, message, onClose, type} = props;

    return(
        <ToastContainer position = "top-center">
            <Toast
            //The function that handles the closing of the toast.
            //Without it, the toast will never disappear.
            onClose = { onClose }
            //Boolean used to show the toast or not.
            //Ideally, depending on the output we recive
            ///from the server.
            show = { showToast }
            delay = {3000}
            autohide
            bg = { type }>

                <Toast.Header>
                    <strong className = "me-auto">
                        {title}
                    </strong>
                </Toast.Header>
                <Toast.Body>
                    <p className = "text-white">
                        {message}
                    </p>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default Toaster;

