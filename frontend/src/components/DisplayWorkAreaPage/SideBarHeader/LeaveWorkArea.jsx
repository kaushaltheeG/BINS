// import e from "express";
import { useHistory } from "react-router-dom"
import { useState } from "react";

const LeaveWorkArea = ({name}) => {
    const [open, setOpen] = useState(false)
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        setOpen(!open)      
    }   

    const handleLeave = (e) => {
        e.preventDefault();
        history.push('/client/workareas')   
    }

    const handleNevermind = (e) => {
        e.preventDefault();
        setOpen(oldVal => !oldVal)
    }
    return (
        <div className="create-wa-modal last-child-of-wa-side ">
            <span className="wa-modal-menu-item" onClick={handleClick}>
                Exit {name}
            </span>
            {open && 
                <>
                <div className="wa-modal-menu-item ">
                    <div id='wa-question'>
                        <span className="leave-wa-question">Are you sure?</span>
                    </div>
                </div>
                <div id="wa-answers">
                    <span onClick={handleNevermind} className="wa-modal-menu-item hover-underline">Lets Stay!</span>
                    <span className="wa-modal-menu-item hover-underline" id="leave-btn"onClick={handleLeave}>Lets Exit!</span>
                </div>
                </>
                }
        </div>
    )
}

export default LeaveWorkArea