import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useModal } from 'react-hooks-use-modal';
import UserSearchAndAdd from './UserSearchAndAdd';


const AddUserToPod = ({pod}) => {

    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true,
        focusTrapOptions: {
            clickOutsideDeactivates: true
        }
    })
    


    let canAdd;
    if (pod?.private) {
        canAdd = (
            <div className="add-new-member" onClick={open}>
                <PersonAddAltIcon id="add-person-icon" />
            </div>
        )
    } else {
        canAdd = (
            <div className="add-new-member" >
                <PersonAddAltIcon id="no-pointer-add-user" />
            </div>
        )
    }
   

    return (
        <div className='users-within-messenger'>
            <div className="autoclog-messenger-header">
                <div className="profile-messenger-header-stack-container">
                    <div className="profile-messenger-header-inner-stack">
                        <div className="member-count">
                            {pod?.members.length}
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