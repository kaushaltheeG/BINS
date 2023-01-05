import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import "./ToggleWorkarea.css"


const ToggleWorkArea = () => {
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const workareas = useSelector(state => Object.values(state.session.user.memberships.workareas));
    const handleToggle = ({id}) => (e) => {
        e.stopPropagation();
        history.push(`/client/workareas/${id}/pods/1`)
    }   
    const openToggle = (e) => {
        e.stopPropagation();
        setOpen(!open)
    }
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