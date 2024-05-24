import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
export default function Alert({show, message, setShow}) {
    return(
        <ToastContainer className='p-3' position='bottom-end'>
            <Toast bg='danger' onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Header>
                    <strong className='me-auto'>Error</strong>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

