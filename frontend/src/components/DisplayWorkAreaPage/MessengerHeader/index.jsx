import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import TagIcon from '@mui/icons-material/Tag';
import LockIcon from '@mui/icons-material/Lock';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import "./MessengerHeader.css"
import AddUserToPod from "./AddUserToPod";
import { useModal } from 'react-hooks-use-modal';
import AboutPodForm from "./AboutPodForm";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../store/session";
import { fetchAllUserDirectMessages } from "../../../store/directMessageReducer";
import { fetchUserPods } from "../../../store/podReducer";


const MessengerHeader = () => {
    const { workareaId, typeId, type } = useParams();
    const pods = useSelector(state => state.pods);
    const dms = useSelector(state => state.directMessages)
    const currentUser = useSelector(getCurrentUser)
    const [currentName, setCurrentName] = useState('')
    const [currentMessenger, setCurrentMessenger] = useState({});
    const dispatch = useDispatch();

    const currentPod = Object.keys(pods).length ? pods[parseInt(typeId)] : null;
    const currentDm = Object.keys(dms).length ? dms[parseInt(typeId)] : null;
    
    const currentDmName = currentDm ? Object.values(currentDm.members).filter((member) => member.id !== currentUser.id)
        .map(mem => mem.name)
        .toString() : []


    useEffect(()=> {
   
        dispatch(fetchUserPods(workareaId))
        dispatch(fetchAllUserDirectMessages(workareaId))

        if (type === 'pods') {
            setCurrentMessenger(oldVal => !currentPod ? oldVal : currentPod)
            setCurrentName(currentPod?.name)
        } else if (type === 'dms') {
            setCurrentMessenger(oldVal => !currentDm ? oldVal : currentDm)
            setCurrentName(currentDmName)
        }


    }, [dispatch, workareaId, type, typeId])

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

                    {type === 'pods' && 
                        <>
                            {currentPod?.private &&
                                <LockIcon id="lock-tag-header-icon" />
                            }
                            {!currentPod?.private &&
                                <TagIcon id="lock-tag-header-icon" />
                            }
                        
                        </>
                    }
                    { type === 'dms' && 
                        <>
                            {!currentDm?.isGroup && 
                                <div>
                                    <button className="profile-icon" id='size-override'>{currentDmName[0]?.toUpperCase()}</button>
                                </div>
                            }
                            {currentDm?.isGroup && 
                                <Diversity3Icon id="lock-tag-header-icon" />
                            }
                        
                        </>
                    }
                    
                </div>
                <span id="current-messenger-name">
                    {type === 'pods' && 
                        <>
                            {currentPod?.name}
                        </>
                    }
                    {  type === 'dms' && 
                        <>
                            {currentDmName}
                        </>

                    }
                </span>
               
                <div className="icon-container-header">
                        <KeyboardArrowDownIcon id="arrow-header-icon" />
                </div>
            </div>

            {type === 'pods' && 
                <AddUserToPod currentMessenger={currentPod?.members.length} />
            }
            { (type === 'dms' && currentDm?.isGroup) && 
                <AddUserToPod currentMessenger={currentDm ? Object.values(currentDm.members).length : null } />

            }
            <Modal>
                <AboutPodForm pod={currentMessenger}/>
            </Modal>
            
        </div>
    )
}

export default MessengerHeader