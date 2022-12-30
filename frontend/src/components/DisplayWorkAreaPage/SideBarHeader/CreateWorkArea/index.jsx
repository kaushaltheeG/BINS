import { useState } from 'react';
import { useModal } from 'react-hooks-use-modal';
import './CreateWorkAreaForm.css'

const CreateWorkArea = () => {
    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true,
        focusTrapOptions: {
            clickOutsideDeactivates: true
        },
        components: {
            Overlay: () => {
                return (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                        }}
                    />  
                );
            }
        }
        
    })

  


    return (
        <div className="create-wa-modal " onClick={open}>
            <span className="wa-modal-menu-item" >
                Create New A New Work Area 
            </span>

                <Modal >
                    <div className="wa-form-container">
                        <form action="" onSubmit={e => e.preventDefault()} className="wa-form-inner-container">
                            <div className="create-input-container" >
                                <input type="text" placeholder='Enter Name' className="create-input" />
                            </div>
                            <div className="create-wa-buttons">
                                <div className='create-wa-btn btn-spacing'>
                                    <p className='btn-style'>Create</p>
                                </div>
                                <div className="create-and-switch-btn btn-spacing">
                                    <p className='btn-style'>Create & Switch</p>
                                </div>

                            </div>
                        </form>
                    </div>
                </Modal>

           
        </div>
    )
}

export default CreateWorkArea