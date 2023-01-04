import { useEffect } from "react";
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


const DisplayWorkAreaPage = () => {
    const { workareaId, typeId } = useParams();
    /* if workareaId is NOT within the list of allWorkareas redirect to 404*/
    const workarea = useSelector(state => state.workarea.currentWorkarea);
    const pods = useSelector(state => state.pods)
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    console.log('workarea id')
    console.log(workareaId, workarea)

    useEffect(() => {
        dispatch(retriveNewMembership())
        dispatch(fetchWorkarea(workareaId))
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
                    
                        <div className="MessageList">
                            <MessageList />
                        </div>
                            <MessageInput />
                    
                </div>
            </div>
        </>
    )

}

export default DisplayWorkAreaPage