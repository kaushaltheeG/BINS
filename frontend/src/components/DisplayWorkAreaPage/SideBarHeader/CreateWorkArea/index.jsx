import { useEffect, useState } from 'react';
import { useModal } from 'react-hooks-use-modal';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { createWorkarea } from '../../../../store/workareaReducer';
import './CreateWorkAreaForm.css'

const CreateWorkArea = () => {
    // const [Modal, open, close, isOpen] = useModal('root', {
    //     preventScroll: true,
    //     focusTrapOptions: {
    //         clickOutsideDeactivates: true
    //     },
    //     components: {
    //         Overlay: () => {
    //             return (
    //                 <div
    //                     style={{
    //                         position: 'fixed',
    //                         top: 0,
    //                         left: 0,
    //                         bottom: 0,
    //                         right: 0,
    //                         backgroundColor: 'rgba(0, 0, 0, 0)',
    //                     }}
    //                 />  
    //             );
    //         }
    //     }
        
    // })
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('');
    const [sent, setSent] = useState(false);
    const user = useSelector(state => state.session.user)
    const lastWa = Object.values(user.memberships.workareas).pop();
    // console.log(Object.values(user.memberships.workareas))
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
            setSent(!sent);
            console.log(sent)
            return
        }
        console.log('Unable to create or toggle work area viz form')
    }

    useEffect(() => {
        if (sent) {
            console.log('last workarea', lastWa)
            history.push(`/client/workareas/${lastWa.id}`)
        }
        setSent(false)
    },[sent])

    const openForm = (e) => {
       e.preventDefault()
       setOpen(!open)
    }

    const handleChange = (e) => {
        e.stopPropagation()
        console.log(e)
        setName(e.target.value)
    }


    return (
        <div className="create-wa-modal " onClick={openForm} >
            <span className="wa-modal-menu-item" >
                Create New A New Work Area 
            </span>
            {open && 
                <form action="" onSubmit={e => e.preventDefault()} onClick={e => e.stopPropagation()}className="wa-form-inner-container">
                    <div className="create-input-container" >
                        <input type="text" placeholder='Enter Name' value={name} className="create-input" onChange={handleChange } />
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
            }

                {/* <Modal >
                    <div className="wa-form-container">
                        <form action="" onSubmit={e => e.preventDefault()} className="wa-form-inner-container">
                            <div className="create-input-container" >
                                <input type="text" placeholder='Enter Name'  value={name}className="create-input" onChange={e => setName(e.target.value)}/>
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
                </Modal> */}

           
        </div>
    )
}

export default CreateWorkArea