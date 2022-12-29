import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom"
import { fetchWorkarea } from "../../store/workareaReducer";

import "./DisplayWorkArea.css"
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import SideBarHeader from "./SideBarHeader";


const DisplayWorkAreaPage = () => {
    const { workareaId } = useParams();
    /* if workareaId is NOT within the list of allWorkareas redirect to 404*/
    console.log(workareaId)
    const workarea = useSelector(state => state.workarea.currentWorkarea);
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    // console.log(workarea)

    useEffect(() => {

        dispatch(fetchWorkarea(workareaId))

    }, [dispatch, workareaId])

    return (
        <>
            <div className="primary-display-grid ">
                <div className="grid-area-workarea_name side-bar">
                    <SideBarHeader workarea={workarea} />
                </div>
                <div className="grid-select-message-toggle side-bar">
                    <h6>Message Toggle</h6>
                </div>
                <div className="grid-current-messenger-name">
                    <p>Pod/DM/GC name</p>
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