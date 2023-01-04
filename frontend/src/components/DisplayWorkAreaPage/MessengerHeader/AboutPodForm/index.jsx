import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./AboutPodForm.css"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../../../store/session';
import { deletePod, dememberFromPod, updatePod } from '../../../../store/podReducer';
import { useHistory, useParams } from 'react-router-dom';
const AboutPodForm = ({pod}) => {
    const currentUser = useSelector(getCurrentUser);
    const [edit, setEdit] = useState(false);
    const [destroy, setDestroy] = useState(false);
    const { typeId } = useParams();
    const [name, setName] = useState(pod ? pod.name : null);
    const [description, setDescription] = useState(pod ? pod.description : null );
    const type = !edit && destroy ? 'Delete Pod' : edit && !destroy ? 'Edit Pod' : 'Leave Pod'
    const dispatch = useDispatch();
    const history = useHistory();

    const firstPod = currentUser ? Object.values(currentUser.memberships.pods)[0] : null; 


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
        if (type === 'Leave Pod') {
            console.log('leaving')
            dispatch(dememberFromPod(pod.workareaId, pod.id))
            history.push(`/client/workareas/${firstPod.workareaId}/pods/${firstPod.id}`)
        } else if (type === 'Delete Pod') {
            dispatch(deletePod(pod.workareaId, pod.id))
            history.push(`/client/workareas/${firstPod.workareaId}/pods/${firstPod.id}`)
        } else if (type === 'Edit Pod') {
            console.log(name, description);
            const patchedPod = {
                id: pod.id, 
                name,
                description, 
                adminId: pod.adminId,
                workareaId: pod.workareaId
            }
            dispatch(updatePod(patchedPod))
        }
    }





    return (
        <div className="about-pod-container">
            <div className="pod-name-maybe-edit-and-delete form-item-padding">
                { edit && 
                    <input value={name} className="create-input-style" onChange={handleChangeName}></input>
                }
                { !edit && 
                    <span>{name}</span>
                }
                {currentUser.id === pod.adminId && 
                    <div className="edit-delete-about-icon-conatainer">
                        <ModeEditIcon id="edit-delete-about-icon" onClick={toggleToEdit}/>
                        <DeleteIcon id="edit-delete-about-icon" onClick={toggleToDestroy}/>
                    </div>
                }
            </div>
            <div className="pod-about-description form-item-padding">
                <span>Description</span>
                <div className="description-container-about">
                    {!edit && 
                        <p>{description}</p>
                    }
                    {edit &&
                        <textarea value={description} className="create-input-style edit-form" id="description-style" onChange={(e) => setDescription(e.target.value)} />
                    }
                </div>
            </div>
            <div className="about-pod-form-btns form-item-padding">
                <button onClick={handleSubmit}>{type}</button>
            </div>
        </div>
    )
}

export default AboutPodForm