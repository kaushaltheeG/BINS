import { useModal } from 'react-hooks-use-modal';
import { useState, useRef, useEffect, useMemo } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "./CreatePod.css"
import { useDispatch, useSelector } from 'react-redux';
import { getWorkareaMemebers } from '../../../../../store/workareaReducer';
import { useHistory, useParams } from 'react-router-dom';
import { getCurrentUser } from '../../../../../store/session';
import { createPod } from '../../../../../store/podReducer';


const Form = () => {


    const waMembers = useSelector(getWorkareaMemebers)
    const currentUser = useSelector(getCurrentUser);
    const [openModal, setOpenModal] = useState(false);
    const wasOpenModal = useRef(false)
    const {workareaId, typeId } = useParams()
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isPrivate, setIsPrivate] = useState(false)
    const [members, setMembers] = useState([]);
    const [errors, setErrors] = useState([]);
    const [submit, setSubmit] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();



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
        setName(e.target.value)
    }

    const handlePodDescription = (e) => {
        e.stopPropagation();
        setDescription(e.target.value)
    }

    const handlePodMembers = (e) => {
        e.stopPropagation()     
        // e.preventDefault()
        // console.log(e.target.value)
        if (!members.includes(e.target.value)) {
            setMembers(oldArr => [...oldArr, e.target.value])

        } else {
            let idx = members.indexOf(e.target.value)
            setMembers(oldArr => oldArr.slice(0, idx).concat(oldArr.slice(idx+1)));
        }
        // console.log(members)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([])
        if (name && description) {
            let allMembers; 
            
            allMembers = (!isPrivate) ?  waMembers.map(mem => mem.id) : members
            const pod = {
                name, 
                description, 
                workareaId,
                admin_id: currentUser.id,
                private: isPrivate,
                members: allMembers
            }        
            dispatch(createPod(pod))
            // .then((pod) => (
            //     // history.push(`/client/workareas/${pod.workareaId}/pods/${pod.id}`)
            // ))
            return 
        } 
        setErrors(["Name and Description are required"])
    }

    return (
        <form className="create-pod-form-container" onSubmit={handleSubmit}>
            <div className="form-item-padding ">
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
                    <span className="hover">Private</span>
                </div>
                {isPrivate &&

                    <ArrowForwardIosIcon id="rotate-arrow-to-private" />
                }
                {!isPrivate &&

                    <ArrowForwardIosIcon id="rotate-arrow-to-public" />
                }
                <div className="public-name-container " id="selected-pod-type" onClick={selectedPublic} >
                    <span className="hover">Public</span>
                </div>


            </div>
            { isPrivate && 
                <div className="form-item-padding user-selection-container">
                    {waMembers?.length > 1 ? waMembers?.map((member, i) => (
                        member.id !== currentUser.id && 
                            <div className="user-name" key={member.id} >
                                <input type="radio" id={`members${i}`} className="remove-border member-name " value={member.id} onClick={handlePodMembers} onChange={()=> {}} checked={members.includes(`${member.id}`)} />
                                <label htmlFor={`members${i}`} id="member-name-label" className="member-name-label " ><span id="add-user-to-new-pod">{member.name.slice(0, 8)}</span></label>
                            </div>
                    )) : 
                        <div className='no-other-members-msg'>
                            <span>Looks like there are not other Members in this Work Area.</span>
                            <span> Tell your friends about your Work Area, so they can join!</span>
                        </div>
                    }
                
                </div>
            }
            <button className="form-item-padding create-pod-btn" onClick={handleSubmit}>Create Pod</button>
            {errors?.map(error => (
                <span className="form-item-padding form-error">{error}</span>
            ))}
        </form>
    )

}

export default Form; 