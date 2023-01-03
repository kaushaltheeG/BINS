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

    return (
        <div className='users-within-messenger'>
            <div className="autoclog-messenger-header">
                <div className="profile-messenger-header-stack-container">
                    <div className="profile-messenger-header-inner-stack">
                        <div className="member-count">
                            {pod?.members.length}
                        </div>
                    </div>
                    <div className="add-new-member" onClick={open}>
                        <PersonAddAltIcon id="add-person-icon" />
                    </div>
                </div>
            </div>
            <Modal>
                <UserSearchAndAdd />
            </Modal>
        </div>
    )
}

export default AddUserToPod