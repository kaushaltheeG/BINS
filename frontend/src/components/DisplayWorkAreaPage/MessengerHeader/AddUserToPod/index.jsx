import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useEffect, useState } from 'react';
import { useModal } from 'react-hooks-use-modal';
import { useParams } from 'react-router-dom';
import UserSearchAndAdd from './UserSearchAndAdd';
import { fetchAllUserDirectMessages } from "../../../../store/directMessageReducer";
import { fetchUserPods } from "../../../../store/podReducer";
import { useDispatch, useSelector } from 'react-redux';


const AddUserToPod = ({ currentMessenger }) => {
    console.log(currentMessenger, 'current messenger')
    const pods = useSelector(state => state.pods);
    const dms = useSelector(state => state.directMessages)
    
    const {workareaId, type, typeId} = useParams();
    const [canAdd, setCanAdd] = useState();
    const [members, setMembers] = useState(null);
    const dispatch = useDispatch();

    const currentPod = Object.keys(pods).length ? pods[parseInt(typeId)] : null;
    const currentDm = Object.keys(dms).length ? dms[parseInt(typeId)] : null;



    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true,
        focusTrapOptions: {
            clickOutsideDeactivates: true
        }
    })

    useEffect(() => {
        dispatch(fetchUserPods(workareaId))
        dispatch(fetchAllUserDirectMessages(workareaId))
    }, [dispatch, workareaId, typeId, type])

    useEffect(()=> {
        let shouldAdd;
        if (type === 'pods') {
            if (currentMessenger?.private) {
                shouldAdd = (
                    <div className="add-new-member" onClick={open}>
                        <PersonAddAltIcon id="add-person-icon" />
                    </div>
                )
            } else {
                shouldAdd = (
                    <div className="add-new-member" >
                        <PersonAddAltIcon id="no-pointer-add-user" />
                    </div>
                )
            }
            setMembers(currentMessenger?.members)
        } else if (type === 'dms') {
            shouldAdd = (
                <div className="add-new-member" onClick={open}>
                    <PersonAddAltIcon id="add-person-icon" />
                </div>
            )
            let memberArr = Object.keys(currentMessenger).length ? Object.values(currentMessenger.members) : null 
            setMembers(memberArr)
        }
        setCanAdd(shouldAdd)
    }, [type, typeId, dispatch])
    
   

    return (
        <div className='users-within-messenger'>
            <div className="autoclog-messenger-header">
                <div className="profile-messenger-header-stack-container">
                    <div className="profile-messenger-header-inner-stack">
                        <div className="member-count">
                            {/* {(type === 'pods' && currentMessenger) && 
                                <>
                                    {currentPod?.members.length}
                                </>
                            } */}
                            {/* {(type === 'dms' && currentMessenger) && 
                                <>
                                    {members?.length}
                                </>

                            } */}
                            {members?.length}
                        </div>
                    </div>
                    {canAdd}
                </div>
            </div>
            <Modal>
                <UserSearchAndAdd />
            </Modal>
        </div>
    )
}

export default AddUserToPod