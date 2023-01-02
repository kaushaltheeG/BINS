import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import TagIcon from '@mui/icons-material/Tag';
import LockIcon from '@mui/icons-material/Lock';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import "./MessengerHeader.css"

const MessengerHeader = () => {
    const { podId } = useParams();
    const pods = useSelector(state => state.pods);
    const currentPod = pods[parseInt(podId)]

    return (
        <div className="messenger-main-header-container">
            <div className="messenger-test-info-container">
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
            <div className='users-within-messenger'>
                <div className="autoclog-messenger-header">
                    <div className="profile-messenger-header-stack-container">
                        <div className="profile-messenger-header-inner-stack">
                                <div className="member-count">
                                    {currentPod?.members.length}
                                </div>
                        </div>
                        <div className="add-new-member">
                            <PersonAddAltIcon id="add-person-icon"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessengerHeader