import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./AboutPodForm.css"
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../../../store/session';
const AboutPodForm = ({pod}) => {
    const currentUser = useSelector(getCurrentUser);
    


    
    return (
        <div className="about-pod-container">
            <div className="pod-name-maybe-edit-and-delete form-item-padding">
                <span>{pod.name}</span>
                {currentUser.id === pod.adminId && 
                    <div className="edit-delete-about-icon-conatainer">
                        <ModeEditIcon id="edit-delete-about-icon"/>
                        <DeleteIcon id="edit-delete-about-icon" />
                    </div>
                }
            </div>
            <div className="pod-about-description form-item-padding">
                <span>Description</span>
                <div className="description-container-about">
                    <p>{pod.description}</p>
                </div>
            </div>
            <div className="about-pod-form-btns form-item-padding">
                <button>Leave Pod</button>
            </div>
        </div>
    )
}

export default AboutPodForm