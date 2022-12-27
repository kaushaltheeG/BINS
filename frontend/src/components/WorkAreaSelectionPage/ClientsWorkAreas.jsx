import { useSelector } from 'react-redux';

const ClientWorkAreas = () => {
    const sessionUser = useSelector(state => state.session.user);

    const workareas = Object.values(sessionUser.memberships.workareas);

    return (
        <>
            <h1>Select a Work Area</h1>
            {workareas?.map(workarea => (
                workarea.name 
            ))}
        </>
    )
}

export default ClientWorkAreas