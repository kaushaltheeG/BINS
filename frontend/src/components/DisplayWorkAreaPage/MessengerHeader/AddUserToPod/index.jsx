import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useEffect, useState } from 'react';
import { useModal } from 'react-hooks-use-modal';
import { useParams } from 'react-router-dom';
import UserSearchAndAdd from './UserSearchAndAdd';
import { fetchAllUserDirectMessages } from "../../../../store/directMessageReducer";
import { fetchUserPods } from "../../../../store/podReducer";
import { useDispatch, useSelector } from 'react-redux';
import { getWorkareaMemebers } from '../../../../store/workareaReducer';


const AddUserToPod = ({ currentMessenger }) => {

    const allUsers = useSelector(getWorkareaMemebers)
    
    const {workareaId, type, typeId} = useParams();

    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true,
        focusTrapOptions: {
            clickOutsideDeactivates: true
        }
    })


    let shouldAdd;

    if (type === 'pods') {
        if (currentMessenger < allUsers?.length) {
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
    } else if (type === 'dms') {
        shouldAdd = (
            <div className="add-new-member" onClick={open}>
                <PersonAddAltIcon id="add-person-icon" />
            </div>
        )
    }
 

    return (
        <div className='users-within-messenger'>
            <div className="autoclog-messenger-header">
                <div className="profile-messenger-header-stack-container">
                    <div className="profile-messenger-header-inner-stack">
                        <div className="member-count">
                            {/* {(type === 'pods' && currentMessenger) && 
                                <>
                                    {currentMessenger}
                                </>
                            } */}
                            {/* {(type === 'dms' && currentMessenger) && 
                                <>
                                    {memberArr?.length}
                                </>

                            } */}
                            {currentMessenger}
                        </div>
                    </div>
                    {shouldAdd}
                </div>
            </div>
            <Modal>
                <UserSearchAndAdd />
            </Modal>
        </div>
    )
}

export default AddUserToPod