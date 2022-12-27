import ClientWorkAreas from "./ClientsWorkAreas";
import JoinWorkAreas from "./JoinWorkAreas";
import { useSelector } from "react-redux"
import { Redirect } from 'react-router-dom';




const WorkAreaSelectionPage = () => {
    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) return <Redirect to="/" />
    return (
        <>
            
            <ClientWorkAreas />
            <JoinWorkAreas />
        </>
    )
}

export default WorkAreaSelectionPage;