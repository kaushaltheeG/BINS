import { useState } from 'react';
import { useSelector } from 'react-redux'
import { getCurrentUser } from '../../../store/session';
import { getCurrentWorkArea } from '../../../store/workareaReducer'
import './NewDm.css'
import PersonIcon from '@mui/icons-material/Person';

const NewDirectMessage = () => {
    const currentWa = useSelector(getCurrentWorkArea);
    const currentUser = useSelector(getCurrentUser);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [withinSelected, setWithinSelected] = useState([])
    const [toBeAdded, setToBeAdded] = useState([])
    const [query, setQuery] = useState("")

    const waMembers = currentWa ? Object.values(currentWa.users).filter(user => user.id !== currentUser.id): [];
    // console.log(waMembers)

    const handleSearch = (e) => {
        e.preventDefault()
        setQuery(oldVal => e.target.value)
        let filteredNames = waMembers.filter(member => member.name.toLowerCase().includes(e.target.value) || member.name.includes(e.target.value))
                            .filter(user => !withinSelected.includes(user.id))
        setToBeAdded(filteredNames)
        if (e.target.value === "") {
            setToBeAdded([])
        }

    }

    const handleSelected = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        if (!withinSelected.includes(e.target.value)) {
            const newUser = currentWa.users[parseInt(e.target.value)]
            setWithinSelected(oldVal => [...oldVal, parseInt(e.target.value)])
            setSelectedUsers(oldArr => [...oldArr, newUser])
            setToBeAdded([])
            setQuery("")
        }
        console.log(selectedUsers)
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
                        {selectedUsers.map((user) => (
                            <>
                                <div className="user-profile-dm-search-container">{user?.name}</div>
                                <span className='user-search-spacer-span'></span>
                            </>
                        ))}
                        <div className="user-query-container">
                            <textarea className='user-query-input' onChange={handleSearch} value={query}></textarea>
                        </div>

                </div>
            </div>
            <div className="search-results-parent-container">
                <div className="result-container">
                    {toBeAdded?.map(mem => (
                       
                        <div className="profile-container-user-search-dm" key={mem.id} >
                                <option className="profile-icon marign-add-new-dm-search color-div-icon" value={mem.id} onClick={handleSelected} >
                                    {mem?.name[0]?.toUpperCase()}
                
                                </option>
                                <option id="user-newdm-searc-name-font" value={mem.id} onClick={handleSelected} >{mem?.name}</option>
                        </div>

                        
                    ))}

                </div>
            </div>
        
        </>
    )
}

export default NewDirectMessage