import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory, useParams } from "react-router-dom";
import PodList from "./PodList"
import { fetchUserPods, getGeneralStagePod, removePod, setPod } from "../../../store/podReducer";
import './MessengerToggle.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import TagIcon from '@mui/icons-material/Tag';
import LockIcon from '@mui/icons-material/Lock';
import CreatePod from "./PodList/CreatePod";
import DirectAndGroupList from "./DirectAndGroupList";
import { fetchAllUserDirectMessages, setDirectMessage, removeGroupChat } from "../../../store/directMessageReducer";
import { getCurrentUser } from "../../../store/session";
import consumer from "../../../consumer";
import {receiveMessage} from "../../../store/messageReducer";





const MessengerToggle = () => {
    const pods = useSelector(state => state.pods);
    const dms = useSelector(state => state.directMessages)
    const currentUser = useSelector(getCurrentUser);
    const generalStagePod = useSelector(getGeneralStagePod);
    const directMessages = useSelector(state => state.directMessages)
    const dispatch = useDispatch();
    const { workareaId, typeId, type} = useParams();
    const history = useHistory();
   
    // console.log(generalStagePod)
    const currentPod = Object.keys(pods).length ? pods[parseInt(typeId)] : null;
    const currentDm = Object.keys(dms).length ? dms[parseInt(typeId)] : null;

    const currentDmName = currentDm ? Object.values(currentDm.members).filter((member) => member?.id !== currentUser?.id)
        .map(mem => mem.name)
        .toString() : []
    
    const [showPods, setShowPods] = useState(true);
    const [showDms, setShowDms] = useState(true);

    useEffect(()=> {
        dispatch(fetchUserPods(workareaId))
        dispatch(fetchAllUserDirectMessages(workareaId))
        const subscription = consumer.subscriptions.create(
            {channel: 'WorkareaChannel', id: workareaId}, 
            {
                received: (workareaObj) => {
                    switch(workareaObj.type) {
                        case 'RECEIVE_POD':
                            if (workareaObj.payload.includes(currentUser.id)) {
                                dispatch(setPod(workareaObj))
                            }
                            if (currentUser.id === workareaObj.adminId) {
                                history.push(`/client/workareas/${workareaObj.workareaId}/pods/${workareaObj.id}`)
                            }
                            break;
                        case 'REMOVE_POD':
                           
                            dispatch(removePod(workareaObj.id))

                            if (workareaObj.payload.includes(currentUser.id)) {
                                // console.log('hittt remove pod dispatch');
                            }
                            if (type == 'pods' && typeId == workareaObj.id) {
                                history.push(`/client/workareas/${generalStagePod.workareaId}/pods/${generalStagePod.id}`)
                            }
                            break;
                        case 'LEAVE_POD':
                          
                            if (!workareaObj.payload.includes(currentUser.id)) {
                                dispatch(removePod(workareaObj.id))  
                            }
                            
                            break;
                        case 'RECEIVE_DM': 
                        
                            if (workareaObj.payload.includes(currentUser.id)) {
                                dispatch(setDirectMessage(workareaObj))
                            }
                            if (currentUser.id === workareaObj.requestUser) {
                                
                                history.push(`/client/workareas/${workareaObj.workareaId}/dms/${workareaObj.id}`)
                            }
                            
                            break; 
                        case 'ADD_USER_DM':
                            if (workareaObj.payload.includes(currentUser.id)) {
                                dispatch(setDirectMessage(workareaObj))
                            }
                            break;
                        case 'LEAVE_DM':
                            if (!workareaObj.payload.includes(currentUser.id)) {
                                dispatch(removeGroupChat(workareaObj.id))
                            }
                        default:
                            console.error('unable to broadcast to', workareaObj.type)
                            break;
                    }
                }
            }
        )
    }, [dispatch, workareaId, typeId, type])

    const togglePodsDisplay = (e) => {
        e.preventDefault()
        setShowPods(oldVal => !oldVal);
    }
    const toggleDmsDisplay = (e) => {
        e.preventDefault();
        setShowDms(oldVal => !oldVal)
    }

    // if (type === 'pods' && !Object.hasOwn(pods, typeId) ) {
       
    //     return <Redirect
    //         to={`/client/workareas/${generalStagePod?.workareaId}/pods/${generalStagePod?.id}`}
    //     />
    // } else if (type === 'dms' && !Object.hasOwn(dms, typeId)) {
    //    return <Redirect
    //         to={`/client/workareas/${generalStagePod?.workareaId}/pods/${generalStagePod?.id}`}
    //     />
    // }

    return (
        <div className="messenger-toggle">
            <div className="spacer"></div>
            <div className="pod-title-container" onClick={togglePodsDisplay}>
                {showPods && 
                    <ArrowDropDownIcon id="down-arrow-icon" className="icon-font-slack"/>
                }
                { !showPods && 
                    <ArrowDropDownIcon id="side-arrow-icon" className="icon-font-slack" />
                }
                <div id="pod-name-header">Pods</div>
            </div>
            {showPods && 
             <>
                <PodList pods={pods} /> 
                <CreatePod />
             </>
            } 
            {(!showPods && type === "pods") && 
                <div className="pod-element pod-span-ele-active"  >
                    {currentPod?.private &&
                        <LockIcon id="lock-hash-icon" className="icon-font-slack" />
                    }
                    {!currentPod?.private &&
                        <TagIcon id="lock-hash-icon" sx={{ mr: "5px", transform: "skew(-10deg)", opacity: "0.6" }} className="icon-font-slack" />
                    }
                    <span id="pod-span-ele">{currentPod?.name}</span>
                </div>
            }
            <div className="pod-dm-spacer" ></div>
            <div className="spacer"></div>
            <div className="pod-title-container" onClick={toggleDmsDisplay}>
                {showDms &&
                    <ArrowDropDownIcon id="down-arrow-icon" className="icon-font-slack" />
                }
                {!showDms &&
                    <ArrowDropDownIcon id="side-arrow-icon" className="icon-font-slack" />
                }
                <div id="pod-name-header">Direct Messages</div>
            </div>
            { showDms &&
                <DirectAndGroupList directMessages={directMessages} />
            }
            { (!showDms && type === "dms") && 
                <div className="pod-element pod-span-ele-active">
                    {currentDm?.isGroup &&
                        <>
                        <Diversity3Icon id="group-icon" className="icon-font-slack"  />
                            <span id="pod-span-ele">{currentDmName}</span>
                        </>
                    }
                    {!currentDm?.isGroup &&
                        <>
                            <div>
                                <button className="profile-icon" id='size-override'>{currentDmName[0]?.toUpperCase()}</button>
                            </div>
                            <span id="pod-span-ele" >{currentDmName}</span>
                        </>
                    }
                </div>
            }
            
            
        </div>
    )
}

export default MessengerToggle