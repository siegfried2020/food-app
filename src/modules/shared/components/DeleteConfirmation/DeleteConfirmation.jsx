import Modal from 'react-bootstrap/Modal';
import sora from "../../../../assets/images/sora.png";

export default function DeleteConfirmation({show, handleClose, onDelete, children}) {
  return (
  <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img src={sora} alt="" />
            <h5 className='my-3'>Delete This {children}?</h5>
            <p className="text-muted">are you sure you want to delete this item ? if you are sure just click on delete it</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          
          <button className="btn btn-light border-danger text-danger" onClick={onDelete}>
            Delete This {children}
          </button>
        </Modal.Footer>
      </Modal>
  </>);
}