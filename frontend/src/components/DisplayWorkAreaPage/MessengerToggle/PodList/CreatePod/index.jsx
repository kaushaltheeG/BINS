import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useModal } from 'react-hooks-use-modal';
import { useState, useRef, useEffect, useMemo } from 'react';
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
    const [openModal, setOpenModal] = useState(false);
    const wasOpenModal = useRef(false)
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isPrivate, setIsPrivate] = useState(false)
    const [members, setMembers] = useState([]);
    const [submit, setSubmit] = useState(false);


    const selectedPrivate = (e) => {
        e.preventDefault();
        // e.stopPropagation()
        console.log(isPrivate, 'private')
        setIsPrivate(true)

        // setIsPrivate(false)
    }

    const selectedPublic = (e) => {
        e.preventDefault();
        // console.log(e)
        console.log(isPrivate, 'public')
        setIsPrivate(false)
    }

    
    const handleOpenModal = (e) => {
        e.preventDefault();
        setOpenModal(oldVal => !oldVal)
        
    }
    
    const handlePodName = (e) => {
        e.preventDefault()
        e.stopPropagation();
        setName(e.target.value)
    }
    
    const handlePodDescription = (e) => {
        e.stopPropagation();
        setDescription(e.target.value)
    }
    
    const handlePodMembers = (e) => {
        e.stopPropagation();
        setMembers(oldArr => [...oldArr, e.target.value])
    }
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmit(true);
        console.log(name)
        

        
        // e.stopPropagation();
    }

    const modalCreatePod = useMemo(()=>(

                <Modal >
                    <form className="create-pod-form-container" onSubmit={handleSubmit}>
                        <div className="form-item-padding">
                            <span id="create-pod-name">Create A Pod</span>
                        </div>
                        <div className="form-item-padding">
                            <input placeholder="Name" className="create-input-style" onChange={handlePodName}></input>
                        </div>
                        <div className="description-container">
                            <div className="form-item-padding description-child-container" >
                                <textarea onChange={handlePodDescription} placeholder="Description" className="create-input-style" id="description-style" />
                            </div>
                        </div>
                        <div className="form-item-padding private-and-public-container">
                         
                            
                    <div className="private-name-container" onClick={selectedPrivate}>
                                
                                {/* <input type="radio" id="private" name="public-or-private" value="true" />
                                <label htmlFor="private">Private</label> */}
                                <span>Private</span>
                            </div>
                            { isPrivate && 

                                    <ArrowForwardIosIcon id="rotate-arrow-to-private"/>
                            }
                            { !isPrivate && 

                                    <ArrowForwardIosIcon />
                            }
                            <div className="public-name-container " id="selected-pod-type" onClick={selectedPublic} >
                                {/* <input type="radio" id="public" name="public-or-private" value="false"  />
                                <label htmlFor="public">Public</label> */}
                                <span>Public</span>
                            </div>

                            
                        </div>
                        <div className="form-item-padding user-selection-container">
                            { waMembers?.map(member => (
                                <div className="user-name" key={member.id}>
                                    <input type="checkbox" id="member-name" value={member.id} onClick={handlePodMembers}/>
                                    <label htmlFor="member-name">{member.name.slice(0, 8)}</label>
                                </div>
                            ))
                            }
                        </div>
                        <button className="form-item-padding" onClick={handleSubmit}>Create Pod: </button>
                    </form>
                </Modal>
    ), [isOpen, isPrivate] )

    return (
        <>
            <div className="pod-element"  onClick={open}>
                <AddCircleOutlineIcon id="lock-hash-icon" />
                <span id="pod-span-ele">Create Pod</span>
            </div>
            { modalCreatePod}
        </>
    )
}

export default CreatePod