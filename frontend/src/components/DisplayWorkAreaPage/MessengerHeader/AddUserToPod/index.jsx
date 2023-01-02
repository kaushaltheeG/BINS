import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';


const AddUserToPod = ({pod}) => {

    return (
        <div className='users-within-messenger'>
            <div className="autoclog-messenger-header">
                <div className="profile-messenger-header-stack-container">
                    <div className="profile-messenger-header-inner-stack">
                        <div className="member-count">
                            {pod?.members.length}
                        </div>
                    </div>
                    <div className="add-new-member">
                        <PersonAddAltIcon id="add-person-icon" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUserToPod