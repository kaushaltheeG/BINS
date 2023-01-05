import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./AboutPodForm.css"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../../../store/session';
import { deletePod, dememberFromPod, updatePod } from '../../../../store/podReducer';
import { useHistory, useParams } from 'react-router-dom';
import { demeberGroupChat } from '../../../../store/directMessageReducer';


const AboutPodForm = ({ currentMessenger }) => {
    console.log(currentMessenger)
    const currentUser = useSelector(getCurrentUser);
    const [edit, setEdit] = useState(false);
    const [destroy, setDestroy] = useState(false);
    const { typeId, type } = useParams();

    let pod, dm; 
    if (type === 'pods' ) {
        pod = Object.keys(currentMessenger).length ? currentMessenger : null;
        dm = null; 
    } else if (type === 'dms') {
        pod = null; 
        dm = Object.keys(currentMessenger).length ? currentMessenger : null;
    }
    console.log(dm, 'dm about form')
    const currentDmName = dm ? Object.values(dm.members).filter((member) => member.id !== currentUser.id).map(mem => mem.name) : null 
    const otherUserEmail = dm ? Object.values(dm.members).filter((mem) => mem.id !== currentUser.id).at(0).email: null 
    console.log(otherUserEmail)
    const [name, setName] = useState(pod ? pod.name : null);
    const [description, setDescription] = useState(pod ? pod.description : null );
    const [gcNames, setGcNames] = useState(dm ? currentDmName : null)
    const formType = !edit && destroy ? 'Delete Pod' : edit && !destroy ? 'Edit Pod' :  type === 'pods' ? 'Leave Pod' : 'Leave Chat'
    const dispatch = useDispatch();
    const history = useHistory();

    const firstPod = currentUser ? Object.values(currentUser.memberships.pods)[0] : null; 
    const firstDm = currentUser ? Object.values(currentUser.memberships.directMessages)[0] : null; 

    const toggleToEdit = (e) => {
        e.preventDefault();
        setEdit(true)
        setDestroy(false);
    }

    const toggleToDestroy = (e) => {
        e.preventDefault();
        setEdit(false);
        setDestroy(true);
    }

    const handleChangeName = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        setName(e.target.value)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (formType === 'Leave Pod') {
            
            dispatch(dememberFromPod(pod.workareaId, pod.id))
            history.push(`/client/workareas/${firstPod.workareaId}/pods/${firstPod.id}`)
        } else if (formType === 'Delete Pod') {
            dispatch(deletePod(pod.workareaId, pod.id))
            history.push(`/client/workareas/${firstPod.workareaId}/pods/${firstPod.id}`)
        } else if (formType === 'Edit Pod') {
            
            const patchedPod = {
                id: pod.id, 
                name,
                description, 
                adminId: pod.adminId,
                workareaId: pod.workareaId
            }
            dispatch(updatePod(patchedPod))
        } else if (formType == 'Leave Chat') {
            console.log('within Leave chat ')
            dispatch(demeberGroupChat(dm.workareaId, dm.id));
            history.push(`/client/workareas/${firstDm.workareaId}/dms/${firstDm.id}`)
        }
    }





    return (
        <div className="about-pod-container">
            { type === 'pods' && 
                <>
                    <div className="pod-name-maybe-edit-and-delete form-item-padding">
                        
                        { edit && 
                            <input value={name} className="create-input-style" onChange={handleChangeName}></input>
                        }
                        { !edit && 
                            <span>{name}</span>
                        }
                        {currentUser.id === pod?.adminId && 
                            <div className="edit-delete-about-icon-conatainer">
                                <ModeEditIcon id="edit-delete-about-icon" onClick={toggleToEdit}/>
                                <DeleteIcon id="edit-delete-about-icon" onClick={toggleToDestroy}/>
                            </div>
                        }
                    </div>
                </>
            
            }
            <div className="pod-about-description form-item-padding">
                { type === 'pods' && 
                    <>
                        
                        <span>Description</span>
                        <div className="description-container-about">
                            {!edit && 
                                <p>{description}</p>
                            }
                            {edit &&
                                <textarea value={description} className="create-input-style edit-form" id="description-style" onChange={(e) => setDescription(e.target.value)} />
                            }
                        </div>
                    
                    </>
                }
                { type === 'dms' && 
                    <>
                    {currentMessenger?.isGroup && 
                        <>
                            <span id="about-member-override-font">Members</span>
                            <div className="description-container-about-gc-name">
                                {gcNames?.map((name) => (
                                    <span className="name-ele-about-form">
                                        {name}
                                    </span>
                                ))}
                            </div>
                        
                        </>
                    }
                    {!currentMessenger.isGroup && 
                        <>
                            <span id="about-member-override-font">{gcNames?.at(0)}</span>
                            <div className="description-container-about-gc-name">
                                    <span className="name-ele-about-form">
                                        {otherUserEmail}
                                    </span>
                            </div>
                        </>
                    }
                    </>

                }
            </div>
            { ((type === 'dms' && currentMessenger?.isGroup) || type === 'pods') && 
                <div className="about-pod-form-btns form-item-padding">
                    <button onClick={handleSubmit}>{formType}</button>
                </div>
            }
        </div>
    )
}

export default AboutPodForm