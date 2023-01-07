import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchWorkareas } from "../../store/workareaReducer";


const JoinWorkAreas = () => {
    const allWorkareas = useSelector(state => state.workarea.allWorkareas)
    const dispatch = useDispatch();
    

    //be able to join and redirect to first workarea pod 

    useEffect(()=> {
        dispatch(fetchWorkareas())
    }, [dispatch])
   
    return (
        <>
            <h1>Join a Work area you aren't a memeber of</h1>
            {allWorkareas?.map(workarea => (
                workarea.name
            ))}
        </>
    )
}

export default JoinWorkAreas