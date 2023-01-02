import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useModal } from 'react-hooks-use-modal';
import { useState, useRef, useEffect } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "./CreatePod.css"
import { useSelector } from 'react-redux';
import { getWorkareaMemebers } from '../../../../../store/workareaReducer';


const CreatePod = () => {
    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true,
        focusTrapOptions: {
            clickOutsideDeactivates: true
        }
    })


    const waMembers = useSelector(getWorkareaMemebers)
    const [isPrivate, setIsPrivate] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    const wasOpenModal = useRef(false)

    const selectedPrivate = (e) => {
        e.preventDefault();
        e.stopPropagation()
        // wasOpenModal.current = false 

        setIsPrivate(false)
    }

    const selectedPublic = (e) => {
        e.preventDefault();
        e.stopPropagation()
        // wasOpenModal.current = true 

        setIsPrivate(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // e.stopPropagation();
    }

    const handleOpenModal = (e) => {
        e.preventDefault();
        setOpenModal(oldVal => !oldVal)
        
    }

 

    return (
        <>
            <div className="pod-element"  onClick={open}>
                <AddCircleOutlineIcon id="lock-hash-icon" />
                <span id="pod-span-ele">Create Pod</span>
            </div>
            { 
                <Modal >
                    <form className="create-pod-form-container" onSubmit={handleSubmit}>
                        <div className="form-item-padding">
                            <span id="create-pod-name">Create A Pod</span>
                        </div>
                        <div className="form-item-padding">
                            <input placeholder="Name" className="create-input-style"></input>
                        </div>
                        <div className="description-container">
                            <div className="form-item-padding description-child-container" >
                                <textarea placeholder="Description" className="create-input-style" id="description-style" />
                            </div>
                        </div>
                        <div className="form-item-padding private-and-public-container">
                         
                            
                            <div className="private-name-container">
                                
                                <input type="radio" id="private" name="public-or-private" value="private" />
                                <label htmlFor="private">Private</label>
                            </div>
                            <div>
                                    <ArrowForwardIosIcon id="rotate-arrow-to-private"/>
                                    <ArrowForwardIosIcon />
                            </div>
                                 
                            <div className="public-name-container " id="selected-pod-type" >
                                <input type="radio" id="public" name="public-or-private" value="private" />
                                <label htmlFor="public">Public</label>
                            </div>
                            
                        </div>
                        <div className="form-item-padding user-selection-container">
                            { waMembers?.map(member => (
                                <div className="user-name" key={member.id}>
                                    <input type="checkbox" id="member-name" value={member.id}/>
                                    <label htmlFor="member-name">{member.name.slice(0, 8)}</label>
                                </div>
                            ))
                            }
                        </div>
                        <button className="form-item-padding">Create Pod: </button>
                    </form>
                </Modal>
            
            }
        </>
    )
}

export default CreatePod