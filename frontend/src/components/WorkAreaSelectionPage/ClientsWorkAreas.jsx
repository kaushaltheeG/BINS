import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useEffect } from "react";
import WorkAreasListEle from './WorkAreasListEle';
import { retriveNewMembership } from '../../store/session';



const ClientWorkAreas = () => {
    console.log('rendered')
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user );
    const workareaKey = useSelector(state => state.session.user.memberships.workareas );
    let workareas;
    if (workareaKey) {
         workareas = Object.values(workareaKey);
    }

    useEffect(() => {
        dispatch(retriveNewMembership())
    },[dispatch])

    console.log('Users workareas', workareas)

    return (
        <>
            <h1>Select a Work Area</h1>
            {workareas?.map(workarea => (
                <WorkAreasListEle workarea={workarea} />
            ))}
        </>
    )
}

export default ClientWorkAreas