import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchWorkareas } from "../../store/workareaReducer";


const JoinWorkAreas = () => {
    const allWorkareas = useSelector(state => state.workarea.allWorkareas)
    const dispatch = useDispatch();
    console.log(allWorkareas)

    useEffect(()=> {
        dispatch(fetchWorkareas())
    }, [dispatch])
    //     console.log('running')
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