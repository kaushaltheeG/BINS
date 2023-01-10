import { useHistory } from 'react-router-dom';
import "./WorkAreaSelectionEle.css"
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import { useDispatch } from 'react-redux';
import { joinWorkarea } from '../../../store/workareaReducer';


const WorkAreasListEle = ({workarea, formState, currentUserId}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        if (formState === 'Open') {
            history.push(`/client/workareas/${workarea.id}/pods/${workarea.firstPod.id}`)
        } else if (formState === 'Join') {
            let paylod = {
                workareaId: workarea.id,
                user_id: currentUserId
            }
            dispatch(joinWorkarea(paylod)).then((wa) => {
                history.push(`/client/workareas/${wa.id}/pods/${wa.firstPod.id}`)
            })
        }
    }

    return (
        <>
            <div className='wa-choice-container' key={workarea.id }>
                <div className="wa-choice-icon-name-container">
                    <div className="wa-icon">
                        <MapsHomeWorkIcon id="wa-icon-svg"/>
                    </div>
                    <div className="wa-choice-name-admin">
                        <span id="wa-name-font-styles">{workarea.name}</span>
                        <span id="owner-name-wa">{workarea.ownerName}</span>
                    </div>
                </div>
                <div className="user-wa-selection-btn-container">
                    <button onClick={handleClick} id="wa-selection-btn">{formState}</button>
                </div>
            </div>
        </>
    )
}

export default WorkAreasListEle;