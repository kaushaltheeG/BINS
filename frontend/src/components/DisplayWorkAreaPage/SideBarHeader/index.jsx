import "./SideBarHeader.css";
import { useModal } from 'react-hooks-use-modal';
import { useRef } from "react";
import WorkAreaProfile from "./WorkAreaProfile";
import CreateWorkArea from "./CreateWorkArea";
import ToggleWorkArea from "./ToogleWorkArea";
import LeaveWorkArea from "./LeaveWorkArea";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';


const SideBarHeader = ({ workarea }) => {
    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true, 
        focusTrapOptions: {
            clickOutsideDeactivates: true
        }
    })
    

    return (
        <div className='sideHeaderContainer'>
            
            <div className="side-bar-wa-name">
                <div className="horizontal-name-and-down-icon" onClick={open} >
                    <span id="side-bar-header-name" >{workarea.name} 
                        {/* <i className="fa fa-sort-desc" aria-hidden="true"></i> */}
                    </span>
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
                <button className="icon-container">
                    {/* <i className="fa fa-pencil-square-o" aria-hidden="true" id='create-icon'></i> */}
                    <BorderColorRoundedIcon id='create-dm-icon-btn'/>
                </button>
            </div>
            
        </div>
    )

}

export default SideBarHeader