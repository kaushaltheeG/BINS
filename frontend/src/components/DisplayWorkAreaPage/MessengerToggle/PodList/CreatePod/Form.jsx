import { useModal } from 'react-hooks-use-modal';
import { useState, useRef, useEffect, useMemo } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "./CreatePod.css"
import { useSelector } from 'react-redux';
import { getWorkareaMemebers } from '../../../../../store/workareaReducer';
import { useParams } from 'react-router-dom';
import { getCurrentUser } from '../../../../../store/session';


const Form = () => {


    const waMembers = useSelector(getWorkareaMemebers)
    const currentUser = useSelector(getCurrentUser);
    console.log('current', currentUser)
    const [openModal, setOpenModal] = useState(false);
    const wasOpenModal = useRef(false)
    const {workareaId, podId } = useParams()
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isPrivate, setIsPrivate] = useState(false)
    const [members, setMembers] = useState([]);
    const [submit, setSubmit] = useState(false);


    const selectedPrivate = (e) => {
        e.preventDefault();
        setIsPrivate(true)
    }

    const selectedPublic = (e) => {
        e.preventDefault();  
        setIsPrivate(false)
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
        const pod = {
            name, 
            description, 
            workareaId,
            admin_id: currentUser.id,
            private: isPrivate,
            members: members
        }        
        console.log(pod)



        // e.stopPropagation();
    }

    return (
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
                    <span>Private</span>
                </div>
                {isPrivate &&

                    <ArrowForwardIosIcon id="rotate-arrow-to-private" />
                }
                {!isPrivate &&

                    <ArrowForwardIosIcon />
                }
                <div className="public-name-container " id="selected-pod-type" onClick={selectedPublic} >
                    <span>Public</span>
                </div>


            </div>
            { isPrivate && 
                <div className="form-item-padding user-selection-container">
                    {waMembers?.map(member => (
                        <div className="user-name" key={member.id}>
                            <input type="checkbox" id="member-name" value={member.id} onClick={handlePodMembers} />
                            <label htmlFor="member-name">{member.name.slice(0, 8)}</label>
                        </div>
                    ))
                    }
                </div>
            }
            <button className="form-item-padding" onClick={handleSubmit}>Create Pod: </button>
        </form>
    )

}

export default Form; 