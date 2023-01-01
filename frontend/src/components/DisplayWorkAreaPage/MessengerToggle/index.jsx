import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import PodList from "./PodList"
import { fetchUserPods } from "../../../store/podReducer";



const MessengerToggle = () => {
    const pods = useSelector(state => state.pods);
    const dispatch = useDispatch();
    const { workareaId } = useParams();
    console.log('toggle', pods)
    useEffect(()=> {
        dispatch(fetchUserPods(workareaId))
    }, [dispatch, workareaId])

    return (
        <div className="messenger-toggle">
            <PodList pods={pods} /> 
        </div>
    )
}

export default MessengerToggle