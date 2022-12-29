import "./SideBarHeader.css";
import { useModal } from 'react-hooks-use-modal';
import { useRef } from "react";
import WorkAreaProfile from "./WorkAreaProfile";


const SideBarHeader = ({ workarea }) => {
    const anchor = useRef(null);
    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true, 
        focusTrapOptions: {
            clickOutsideDeactivates: true
        }
    })
    // ref = { anchor }

    return (
        <div className='sideHeaderContainer'>
            
            <div className="side-bar-wa-name">
                <div className="horizontal-name-and-down-icon" onClick={open} ref={anchor}>
                    <span id="side-bar-header-name" >{workarea.name} 
                        <i className="fa fa-sort-desc" aria-hidden="true"></i>
                    </span>
                    <i className="fa fa-sort-desc" aria-hidden="true"></i>
                </div>
                <Modal ref={anchor}>
                    <div className="header-name-modal-container">
                        <WorkAreaProfile  workarea={workarea}/>
                        <p>Create</p>
                    </div>
                </Modal>

            </div>
            
            <div className="icon-div-container">
                <button className="icon-container">
                    <i className="fa fa-pencil-square-o" aria-hidden="true" id='create-icon'></i>
                </button>
            </div>
            
        </div>
    )

}

export default SideBarHeader