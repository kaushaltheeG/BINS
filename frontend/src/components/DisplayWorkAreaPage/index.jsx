import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom"
import { fetchWorkarea } from "../../store/workareaReducer";

import "./DisplayWorkArea.css"
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import SideBarHeader from "./SideBarHeader";
import { retriveNewMembership } from '../../store/session'
import MessengerToggle from "./MessengerToggle";
import MessengerHeader from "./MessengerHeader";
import NewDirectMessage from "./NewDirectMessage";
import { fetchAllUserDirectMessages } from "../../store/directMessageReducer";
import { fetchUserPods } from "../../store/podReducer";
import { fetchDmMessages, fetchPodMessages } from "../../store/messageReducer";


const DisplayWorkAreaPage = () => {
    const { workareaId, type,  typeId, newMsg } = useParams();
    /* if workareaId is NOT within the list of allWorkareas redirect to 404*/
    const workarea = useSelector(state => state.workarea.currentWorkarea);
    const pods = useSelector(state => state.pods);
    const dms = useSelector(state => state.directMessages);
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [body, setBody] = useState('');
    const [withinSelected, setWithinSelected] = useState([]);
    let currentName; 
    
   
    useEffect(() => {
        dispatch(retriveNewMembership())
        dispatch(fetchWorkarea(workareaId))
        dispatch(fetchAllUserDirectMessages(workareaId))
        dispatch(fetchUserPods(workareaId))
        if (type === 'pods') {
            dispatch(fetchPodMessages(workareaId, typeId))
        } else if (type === 'dms') {
            dispatch(fetchDmMessages(workareaId, typeId))
        }
        if (type == 'pods') {
            currentName = pods[typeId]?.name 
        } else {
            let names = dms ? dms[typeId]?.members : null 
            currentName  = names
            // if (names.length > 1) {
            //     currentName = 'Group Chat'
            // } else {
            // }
        }
    }, [dispatch, workareaId])

    return (
        <>
            <div className="primary-display-grid ">
                <div className="grid-area-workarea_name side-bar">
                    <SideBarHeader workarea={workarea} />
                </div>
                <div className="grid-select-message-toggle side-bar">
                    <MessengerToggle  />
                </div>
                <div className="grid-current-messenger-name">
                    <MessengerHeader />
                </div>
                <div className="grid-message-control">
                        {newMsg === 'newmessage' && 
                        <NewDirectMessage body={body} 
                                        setBody={setBody} 
                                        withinSelected={withinSelected} 
                                        setWithinSelected={setWithinSelected} 
                        />
                        }
                        { !newMsg && 
                            <div className="MessageList">
                                <MessageList />
                            </div>

                        }
                    <MessageInput body={body} 
                                setBody={setBody} 
                                withinSelected={withinSelected} 
                                setWithinSelected={setWithinSelected} 
                                pods={pods}
                                dms={dms}
                    />
                    
                </div>
            </div>
        </>
    )

}

export default DisplayWorkAreaPage