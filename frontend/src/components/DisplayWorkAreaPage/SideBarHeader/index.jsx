import "./SideBarHeader.css";
import { useModal } from 'react-hooks-use-modal';
import { useEffect, useRef, useState } from "react";
import WorkAreaProfile from "./WorkAreaProfile";
import CreateWorkArea from "./CreateWorkArea";
import ToggleWorkArea from "./ToogleWorkArea";
import LeaveWorkArea from "./LeaveWorkArea";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const SideBarHeader = ({ workarea }) => {
    const history = useHistory()
    const {workareaId, type, typeId} = useParams();



    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true, 
        focusTrapOptions: {
            clickOutsideDeactivates: true
        }
    })

   



    const handleNewMessage = (e) => {
        e.preventDefault();
        
        history.push(`/client/workareas/${workareaId}/${type}/${typeId}/newmessage`)
    }
    

    return (
        <div className='sideHeaderContainer'>
            
            <div className="side-bar-wa-name">
                <div className="horizontal-name-and-down-icon" onClick={open} >
                    <span className="workarea-name-span">{workarea?.name}</span>
                    <ArrowDropDownIcon />
                </div>
                <Modal >
                    <div className="header-name-modal-container">
                        <WorkAreaProfile  workarea={workarea}/>
                        <div className="line-separator-modal">
                            <hr id="modal-wa-hr" />
                        </div>
                        <CreateWorkArea />
                        <div className="line-separator-modal">
                            <hr id="modal-wa-hr" />
                        </div>
                        <ToggleWorkArea />
                        <div className="line-separator-modal">
                            <hr id="modal-wa-hr" />
                        </div>
                        <LeaveWorkArea name={workarea.name} />
                    </div>
                </Modal>

            </div>
            
            <div className="icon-div-container">
                <button className="icon-container" onClick={handleNewMessage}>
                    
                    <BorderColorRoundedIcon id='create-dm-icon-btn'/>
                </button>
            </div>
            
        </div>
    )

}

export default SideBarHeader