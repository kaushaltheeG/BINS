import { useEffect, useState } from 'react';
import { useModal } from 'react-hooks-use-modal';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { createWorkarea } from '../../../../store/workareaReducer';
import './CreateWorkAreaForm.css'

const CreateWorkArea = () => {

    const [open, setOpen] = useState(false)
    const [name, setName] = useState('');
    const [sent, setSent] = useState(false);
    const user = useSelector(state => state.session.user)
    const lastWa = useSelector(state => Object.values(state.session.user.memberships.workareas).pop());
    // const lastWa = Object.values(user.memberships.workareas).pop();
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
            // .then(() => history.push(`/client/workareas/${lastWa.id}`))
            // console.log(sent)
            // setSent(!sent)
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
    },[sent, lastWa])

    const openForm = (e) => {
       e.preventDefault()
       setOpen(!open)
    }

    const handleChange = (e) => {
        e.stopPropagation()
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

           
        </div>
    )
}

export default CreateWorkArea