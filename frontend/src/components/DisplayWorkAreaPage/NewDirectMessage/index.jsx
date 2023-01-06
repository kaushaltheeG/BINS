import { useState } from 'react';
import { useSelector } from 'react-redux'
import { getCurrentUser } from '../../../store/session';
import { getCurrentWorkArea } from '../../../store/workareaReducer'
import './NewDm.css'

const NewDirectMessage = () => {
    const currentWa = useSelector(getCurrentWorkArea);
    const currentUser = useSelector(getCurrentUser);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [withinSelected, setWithinSelected] = useState([])
    const [toBeAdded, setToBeAdded] = useState([])

    const waMembers = currentWa ? Object.values(currentWa.users).filter(user => user.id !== currentUser.id): [];
    

    const handleSearch = (e) => {
        e.preventDefault()
        
        let filteredNames = waMembers.filter(member => member.name.toLowerCase().includes(e.target.value) || member.name.includes(e.target.value))
        setToBeAdded(filteredNames)
        if (e.target.value === "") {
            setToBeAdded([])
        }

    }

    const handleSelected = (e) => {
        e.preventDefault();
        if (!withinSelected.includes(e.target.value)) {
            const newUser = currentWa.users[parseInt(e.target.value)]
            setWithinSelected(oldVal => [...oldVal, e.target.value])
            setSelectedUsers(oldArr => [...oldArr, newUser])
        }
    }

    const removeSelected = (e) => {
        e.preventDefault();
        const newIds = withinSelected.filter(num => (num != e.target.value))
        const newSelected = selectedUsers.filter(user => user.id !== parseInt(e.target.value))
        setWithinSelected(newIds)
        setSelectedUsers(newSelected)

    }

    return (
        <>
            <div className="new-dm-form-container">
                <div className='to-container-search-new'>
                    <span className='to-new-dm'>To:</span>
                </div>
                <div className="new-dm-search-container">
                        <span className='user-search-spacer-span'></span>
                        <div className="user-profile-dm-search-container">User</div>
                        <div className="user-query-container">
                            <textarea className='user-query-input' onChange={handleSearch}></textarea>
                        </div>

                </div>
            </div>
            <div className="search-results-parent-container">
                <div className="result-container">
                    {toBeAdded?.map(mem => (
                        <div className="profile-container-user-search-dm" key={mem.id} value={mem.id}>
                            <div>
                                <button className="profile-icon marign-add-new-dm-search" id='size-override'>{mem?.name[0]?.toUpperCase()}</button>
                            </div>
                            <span id="user-newdm-searc-name-font">{mem?.name}</span>
                        </div>
                    ))}

                </div>
            </div>
        
        </>
    )
}

export default NewDirectMessage