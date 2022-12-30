import { useState } from 'react';
import { useModal } from 'react-hooks-use-modal';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { createWorkarea } from '../../../../store/workareaReducer';
import './CreateWorkAreaForm.css'

const CreateWorkArea = () => {
    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true,
        focusTrapOptions: {
            clickOutsideDeactivates: false
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

    const [name, setName] = useState('');
    const user = useSelector(state => state.session.user)
    const lastWa = Object.values(user.memberships.workareas).pop();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleCreate = (e) => {
        e.preventDefault();
        if (name) {
            const data = {
                name,
                user_id: user.id
            }
            dispatch(createWorkarea(data))
            return 
        }
        console.log('Unable to create work area viz form')
    }

    const handleCreateThenSwitch = (e) => {
        e.preventDefault();
        if (name) {
            const data = {
                name,
                user_id: user.id
            }
            dispatch(createWorkarea(data))
            console
            history.push(`/client/workareas/${lastWa.id}`)

            return
        }
        console.log('Unable to create or toggle work area viz form')
    }



  


    return (
        <div className="create-wa-modal " onClick={open}>
            <span className="wa-modal-menu-item" >
                Create New A New Work Area 
            </span>

                <Modal >
                    <div className="wa-form-container">
                        <form action="" onSubmit={e => e.preventDefault()} className="wa-form-inner-container">
                            <div className="create-input-container" >
                                <input type="text" placeholder='Enter Name' className="create-input" onChange={e => setName(e.target.value)}/>
                            </div>
                            <div className="create-wa-buttons">
                                <div className='create-wa-btn btn-spacing'>
                                    <p className='btn-style' onClick={handleCreate}>Create</p>
                                </div>
                                <div className="create-and-switch-btn btn-spacing">
                                    <p className='btn-style' onClick={handleCreateThenSwitch}>Create & Switch</p>
                                </div>

                            </div>
                        </form>
                    </div>
                </Modal>

           
        </div>
    )
}

export default CreateWorkArea