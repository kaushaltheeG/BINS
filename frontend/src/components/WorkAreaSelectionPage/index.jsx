import ClientWorkAreas from "./ClientWorkAreas";

import { useDispatch, useSelector } from "react-redux"
import { Redirect } from 'react-router-dom';
import "./WorkAreaSelection.css"
import CreateWorkAreaSelection from "./CreateWorkAreaSelection";
import { fetchWorkareas } from "../../store/workareaReducer";
import { retriveNewMembership, getCurrentUser } from "../../store/session"
import { useState, useEffect } from "react";




const WorkAreaSelectionPage = () => {
    const currentUser = useSelector(getCurrentUser);
    const [formState, setFormState] = useState('Open')
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(retriveNewMembership())
        dispatch(fetchWorkareas())
    }, [dispatch])

    if (!currentUser) return <Redirect to="/" />
    //here 
    return (
        <div className="screen-container">
            <div className="selection-title">
                    <h1>{formState?.toUpperCase()} a Work Area</h1>
            </div>
            <div className="wa-selection-container">
                {(formState === 'Open' || formState === 'Join' )?
                        <ClientWorkAreas 
                            formState={formState} 
                            setFormState={setFormState}
                            currentUser={currentUser}
                        />
                    : 
                        <CreateWorkAreaSelection
                            formState={formState}
                            setFormState={setFormState}
                            currentUser={currentUser}
                        />
                }
                
            </div>
        </div>
    )
}

export default WorkAreaSelectionPage;