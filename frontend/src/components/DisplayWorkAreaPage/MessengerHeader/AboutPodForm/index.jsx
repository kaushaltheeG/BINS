import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./AboutPodForm.css"
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../../../store/session';
const AboutPodForm = ({pod}) => {
    const currentUser = useSelector(getCurrentUser);
    const [edit, setEdit] = useState(false);
    const [destroy, setDestroy] = useState(false);
    const [name, setName] = useState(pod.name);
    const [description, setDescription] = useState(pod.description);
    const type = !edit && destroy ? 'Delete Pod' : edit && !destroy ? 'Edit Pod' : 'Leave Pod'


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







    return (
        <div className="about-pod-container">
            <div className="pod-name-maybe-edit-and-delete form-item-padding">
                { edit && 
                    <input placeholder={name} className="create-input-style" onChange={e => setName(e.tagert.value)}></input>
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
                        <textarea placeholder={description} className="create-input-style edit-form" id="description-style" onChange={e => setDescription(e.tagert.value)} />
                    }
                </div>
            </div>
            <div className="about-pod-form-btns form-item-padding">
                <button>{type}</button>
            </div>
        </div>
    )
}

export default AboutPodForm