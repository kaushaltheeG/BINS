import { useSelector } from 'react-redux';
import WorkAreasListEle from './WorkAreasListEle';


const ClientWorkAreas = () => {
    const sessionUser = useSelector(state => state.session.user);
    const workareas = Object.values(sessionUser.memberships.workareas);
    console.log(workareas)

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