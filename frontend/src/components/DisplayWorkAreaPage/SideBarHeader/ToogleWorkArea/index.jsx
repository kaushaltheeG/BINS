import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchWorkareas } from "../../../../store/workareaReducer";

import "./ToggleWorkarea.css"


const ToggleWorkArea = () => {
    const [open, setOpen] = useState(false);
    const {workareaId} = useParams();
    const history = useHistory();
    const userWorkareas = useSelector(state => state.session.user.memberships.workareas)
    const dispatch = useDispatch();
    const workareas =   userWorkareas ? Object.values(userWorkareas) : null //useSelector(state => Object.values(state.session.user.memberships.workareas));

    // const firstPod = allWorkareas ? Object.values(allWorkareas).at(0) : null 
    // console.log(allWorkareas)
    const handleToggle = ({id}) => (e) => {
        e.stopPropagation();
        let firstPod = userWorkareas[id].firstPod
        history.push(`/client/workareas/${id}/pods/${firstPod.id}`)
    }   
    const openToggle = (e) => {
        e.stopPropagation();
        setOpen(!open)
    }

    useEffect(()=> {
        dispatch(fetchWorkareas())
    },[workareaId] )
    return (
        <div className="create-wa-modal " onClick={openToggle}>
            <span className="wa-modal-menu-item">
                Switch Work Area 
            </span>
            {open && 
                <div className="toggleContainer">
                    {workareas?.map(workarea => (
                        <span className="wa-toggle-name"
                            key={workarea.id} 
                            value={workarea.id} 
                            onClick={handleToggle(workarea)}
                        > 
                        {workarea.name} 
                        </span>
                    ))}
                </div>
            }
        </div>


    )
}

export default ToggleWorkArea