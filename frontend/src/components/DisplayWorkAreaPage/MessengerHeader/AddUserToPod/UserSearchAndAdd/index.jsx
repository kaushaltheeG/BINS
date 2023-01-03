import "./SearchAndAdd.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { useState} from 'react';
import TagIcon from '@mui/icons-material/Tag';
import LockIcon from '@mui/icons-material/Lock';
import { getCurrentWorkArea } from "../../../../../store/workareaReducer";

const UserSearchAndAdd = () => {

    const { podId } = useParams();
    const pods = useSelector(state => state.pods);
    const currentPod = pods[parseInt(podId)]
    const currentWa = useSelector(getCurrentWorkArea);
    const [open, setOpen] = useState(false)
    // console.log('currentWa',currentWa)
    const waMembers = currentWa ? Object.values(currentWa.users) : null; 
    const members = currentPod ? Object.values(currentPod.members) : null;
    const memberNames = members ? members.map(user => user.name) : null;


    let nonMembers;
    if (waMembers && members) {
        nonMembers = waMembers.filter((member) => !memberNames.includes(member.name));
    } else {
        nonMembers = null 
    }

    console.log('non members', nonMembers)
    const [toBeAdded, setToBeAdded] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const [withinSelected, setWithinSelected] = useState([])
    const handleSearch = (e) => {
        e.preventDefault()
        console.log(e)
        nonMembers = nonMembers.filter(member => member.name.includes(e.target.value))
        setToBeAdded(nonMembers)
        if (e.target.value === "") {
            setToBeAdded([])
        }
        console.log('to be added', toBeAdded)
    }

    const handleSelected = (e) => {
        e.preventDefault();
        if (!withinSelected.includes(e.target.value)) {
            const newUser = currentWa.users[parseInt(e.target.value)]
            setWithinSelected(oldVal => [...oldVal, e.target.value])
            setSelectedUsers( oldArr => [...oldArr, newUser])
        }
    }

    const removeSelected = (e) => {
        e.preventDefault();
        const newIds = withinSelected.filter(num => (num != e.target.value))
        const newSelected = selectedUsers.filter(user => user.id !== parseInt(e.target.value))
        setWithinSelected(newIds)
        setSelectedUsers(newSelected)
        console.log(newIds)
    }

    return (
        <div className="search-and-add-container">
            <div className="search-add-header padding-top-bottom">
                <div className="add-user-title-and-pod-name">
                    <span id="add-people-title">Add People</span>
                    <div className="pod-name-for-add-user">
                        {currentPod?.private &&
                            <LockIcon id="lock-tag-header-icon-add-form" />
                        }
                        {!currentPod?.private &&
                            <TagIcon id="lock-tag-header-icon-add-form" />
                        }
                        <span>{currentPod.name}</span>

                    </div>
                </div>
            </div>
            <div className="search-user-input padding-top-bottom">
                <input className="input-div" onChange={handleSearch} placeholder='Search. . .'>
                    
                </input >
            </div>
            <div className="client-search-result padding-top-bottom">
                {
                    toBeAdded?.map((nonMember) => (
                        <option key={nonMember.id} className="user-options" value={nonMember.id} onClick={handleSelected}>{nonMember.name}</option>
                    ))
                }
            </div>
                
            
            <div className="add-user-to-pod-btn padding-top-bottom">
                <div className="inner-btn-container">
                    <div className="user-select-list">
                        {selectedUsers?.map(user => (
                            <div className="user-cell-container " id="hover-cancel">
                                <span className="select-user-span ">{user.name}</span>
                                <button className="cancel-user-selected" value={user.id} onClick={removeSelected}>X</button>
                            </div>
                        ))}
                    </div>
                    <button id="Add-user-btn">Add</button>
                </div>
            </div>
            <div></div>
        </div>
    )

}

export default UserSearchAndAdd