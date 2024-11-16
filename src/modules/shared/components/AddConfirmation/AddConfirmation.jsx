import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';

export default function AddConfirmation({showAdd, handleCloseAdd, onSubmit}) {
  
  let {register, formState:{errors}, handleSubmit}=useForm();
  return (
  <>
    <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header className="border-0"  closeButton>
          <Modal.Title>Add category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
          <form onSubmit={handleSubmit(onSubmit)}>
                
              {errors.name && <span className="text-danger ">{errors.name.message}</span>}
              <div className="input-group mb-3 my-5">

                <input type="text" 
                className="form-control text-bg-secondary"
                placeholder="Category Name" aria-label="name" aria-describedby="basic-addon1"
                {...register('name',{required:'Name is required'}) }/>

              </div>
              <Modal.Footer>
                <button className="btn btn-success border-success px-5  text-white" >
                  Save
                </button>
              </Modal.Footer>

            </form>
          </div>
        </Modal.Body>
        
      </Modal>
  </>);
}