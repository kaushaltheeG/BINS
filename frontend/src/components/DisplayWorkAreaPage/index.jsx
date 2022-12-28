import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchWorkarea } from "../../store/workareaReducer";
import "./DisplayWorkArea.css"
import MessageList from "./MessageList";


const DisplayWorkAreaPage = () => {
    const { workareaId } = useParams();
    /* if workareaId is NOT within the list of allWorkareas redirect to 404*/
    console.log(workareaId)
    const workarea = useSelector(state => state.workarea.currentWorkarea);
    const dispatch = useDispatch();
    console.log(workarea)
    useEffect(() => {
        dispatch(fetchWorkarea(workareaId))
    }, [dispatch, workareaId])

    return (
        <>
            {workarea.name}
            <MessageList />
        </>
    )

}

export default DisplayWorkAreaPage