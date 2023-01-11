import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useEffect } from "react";
import WorkAreasListEle from './WorkAreasListEle';
import { getCurrentUser, getUserWorkareas } from '../../../store/session';
import happyPeople from "../../../utils/images/happy-people-two-og-removebg.png"
import './ClientWorkAreas.css'


const ClientWorkAreas = ({formState, setFormState, currentUser}) => {
   
    const dispatch = useDispatch()
    
    let workareas = useSelector(getUserWorkareas);
    const allWorkareas = useSelector(state => state.workarea.allWorkareas)
    let emptyWorkArrPhrase = 'Not part of a Workarea? Click on Create or Join'
    if (formState === 'Join') {
        let workareasIds = workareas ? workareas.map(wa => wa.id) : []
        workareas = allWorkareas.filter(wa => !workareasIds.includes(wa.id))
        emptyWorkArrPhrase = "Looks like you are a part of all the Work Areas";
        workareas= []
    }

    const handleShowCreate = (e) => {
        e.preventDefault();
        setFormState(oldVal => 'Create')
    }

    const handleShowJoin = (e) => {
        e.preventDefault();
        setFormState(oldVal => 'Join')
    }

    const handleShowOpen = (e) => {
        e.preventDefault();
        setFormState(oldVal => 'Open')
    }




    return (
        <>
            <div className="open-join-container">
                <div className="workarea-choices-container">
                    { workareas?.length ? 
                        <>
                        {workareas?.map(workarea => (
                                <WorkAreasListEle 
                                    workarea={workarea} 
                                    formState={formState}
                                    currentUserId={currentUser.id}
                                />
                            ))}
                        
                        </> : 
                        <div className="no-more-to-join-container">
                            <div className="gif-happy">
                                <img src={happyPeople} alt="" />
                            </div>
                            
                            <span className='empty-phrase'>{emptyWorkArrPhrase}</span>
                        </div>
                    }
                </div>
                <div className="open-join-create-btns-container">
                    <button className='selection-wa-btn' onClick={handleShowCreate}>Create</button>
                    {formState === 'Open' ? 
                        <button className='selection-wa-btn' onClick={handleShowJoin}>Join</button>
                        : 
                        <button className='selection-wa-btn' onClick={handleShowOpen}>Open</button>
                    }
                </div>
            </div>
        </>
    )
}

export default ClientWorkAreas

