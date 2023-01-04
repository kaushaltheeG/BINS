import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import TagIcon from '@mui/icons-material/Tag';
import LockIcon from '@mui/icons-material/Lock';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "./MessengerHeader.css"
import AddUserToPod from "./AddUserToPod";
import { useModal } from 'react-hooks-use-modal';
import AboutPodForm from "./AboutPodForm";


const MessengerHeader = () => {
    const { typeId } = useParams();
    const pods = useSelector(state => state.pods);
    const currentPod = pods[parseInt(typeId)]

    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true,
        focusTrapOptions: {
            clickOutsideDeactivates: true
        }
    })

    

    return (
        <div className="messenger-main-header-container">
            <div className="messenger-test-info-container" onClick={open}>
                <div className="icon-container-header">
                    
                    {currentPod?.private &&
                        <LockIcon id="lock-tag-header-icon" />
                    }
                    {!currentPod?.private &&
                        <TagIcon id="lock-tag-header-icon" />
                    }
                    
                </div>
                <span id="current-messenger-name">
                        {currentPod?.name}
                </span>
                <div className="icon-container-header">
                        <KeyboardArrowDownIcon id="arrow-header-icon" />
                </div>
            </div>
            <AddUserToPod pod={currentPod}/>
            <Modal>
                <AboutPodForm pod={currentPod}/>
            </Modal>
            
        </div>
    )
}

export default MessengerHeader