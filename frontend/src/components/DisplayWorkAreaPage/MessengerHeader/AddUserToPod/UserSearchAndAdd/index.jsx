import "./SearchAndAdd.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import { useEffect, useRef, useState} from 'react';
import TagIcon from '@mui/icons-material/Tag';
import LockIcon from '@mui/icons-material/Lock';
import Diversity3Icon from '@mui/icons-material/Diversity3';

import { getCurrentWorkArea } from "../../../../../store/workareaReducer";
import { newPodMembers } from "../../../../../store/podReducer";
import { getCurrentUser } from "../../../../../store/session";
import { newGcMember } from "../../../../../store/directMessageReducer";

const UserSearchAndAdd = () => {

    const { workareaId, typeId, type } = useParams();
    const pods = useSelector(state => state.pods);
    const dms = useSelector(state => state.directMessages)

    const currentUser = useSelector(getCurrentUser)
    const currentWa = useSelector(getCurrentWorkArea);
    const currentPod = pods[parseInt(typeId)];
    const currentDm = Object.keys(dms).length ? dms[parseInt(typeId)] : null;
    const currentDmName = currentDm ? Object.values(currentDm.members).filter((member) => member.id !== currentUser.id)
        .map(mem => mem.name)
        .toString() : []

    const [query, setQuery] = useState("")
  
    const waMembers = currentWa ? Object.values(currentWa.users) : null; 
    const members = (currentPod && type === 'pods') ? Object.values(currentPod.members) : (currentDm && type === 'dms') ? Object.values(currentDm.members) : null;
    const memberNames = members ? members.map(user => user.name) : null;
    const dispatch = useDispatch();
    const history = useHistory();
    const inputFoucs = useRef(null)


    

    let nonMembers;
    if (waMembers && members) {
        nonMembers = waMembers.filter((member) => !memberNames.includes(member?.name));
    } else {
        nonMembers = null 
    }

    
    const [toBeAdded, setToBeAdded] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const [withinSelected, setWithinSelected] = useState([])
    const handleSearch = (e) => {
        e.preventDefault()
        setQuery(oldVal => e.target.value)
        let filteredNames = nonMembers.filter(member => member.name.toLowerCase().includes(e.target.value) || member.name.includes(e.target.value) )
                    .filter(user => !withinSelected.includes(user.id))
        setToBeAdded(filteredNames)
        if (e.target.value === "") {
            setToBeAdded([])
        }
       
    }

    const handleSelected = (e) => {
        e.preventDefault();
        if (!withinSelected.includes(e.target.value)) {
            const newUser = currentWa.users[parseInt(e.target.value)]
            setWithinSelected(oldVal => [...oldVal, parseInt(e.target.value)])
            setSelectedUsers( oldArr => [...oldArr, newUser])
            setToBeAdded([])
            setQuery("")
        }
    }

    const removeSelected = (e) => {
        e.preventDefault();
        const newIds = withinSelected.filter(num => (num != e.target.value))
        const newSelected = selectedUsers.filter(user => user.id !== parseInt(e.target.value))
        setWithinSelected(newIds)
        setSelectedUsers(newSelected)
       
    }

    const handleAddUsers = (e) => {
        e.preventDefault();
        if (selectedUsers.length) {
            const payload = {
                workareaId,
                id: typeId,
                members: selectedUsers
                
            }
            if (type === 'pods') {
                dispatch(newPodMembers(payload)).then((pod) => (
                    history.push(`/client/workareas/${pod.workareaId}/pods/${pod.id}`)
                ))
            } else if (type === 'dms') {
                dispatch(newGcMember(payload)).then((dm) => (
                    history.push(`/client/workareas/${dm.workareaId}/dms/${dm.id}`)
                ))
            }
        }
    }

    useEffect(()=> {
        inputFoucs.current.focus();
    }, [selectedUsers.length])

    return (
        <div className="search-and-add-container">
            <div className="search-add-header padding-top-bottom">
                <div className="add-user-title-and-pod-name">
                    <span id="add-people-title">Add People</span>
                    <div className="pod-name-for-add-user">
                        {type === 'pods' && 
                            <>
                                {currentPod?.private &&
                                    <LockIcon id="lock-tag-header-icon-add-form" />
                                }
                                {!currentPod?.private &&
                                <TagIcon id="lock-tag-header-icon-add-form" sx={{ mr: "5px", transform: "skew(-10deg)", opacity: "0.6" }} />
                                }
                                <span>{currentPod.name}</span>
                            
                            </>
            
                        }
                        { type === 'dms' && 
                            <>
                                <Diversity3Icon id="lock-tag-header-icon-add-form" />
                            <span id="current-messenger-name">{currentDmName}</span>
                            </>
                        }

                    </div>
                </div>
            </div>
            <div className="search-user-input padding-top-bottom">
                <div className="input-div" >
                    <>
                        {selectedUsers.map((user) => (
                            <>

                                <div className="user-profile-dm-search-container marign-top-adjustment cancel-user-query">
                                    <div>
                                        <button className="profile-icon color-div-icon" id='size-override'>{user?.name[0]?.toUpperCase()}</button>
                                    </div>
                                    <span className='font-align ellipsis-ft'>{user?.name}</span>
                                    <div className="cancel-x-container" >
                                        <button className='font-align cancel-small-x' value={user.id} onClick={removeSelected}>X</button>
                                    </div>
                                </div>
                                <span className='user-search-spacer-span'></span>
                            </>
                        ))}

                    </>

                    <input className='add-user-input user-query-input' 
                            onChange={handleSearch} 
                            ref={inputFoucs}
                            value={query}
                            placeholder='Search. . .'>
                        
                    </input >
                </div>
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
                        {/* {selectedUsers?.map(user => (
                            <div className="user-cell-container " id="hover-cancel">
                                <span className="select-user-span ">{user.name}</span>
                                <button className="cancel-user-selected" value={user.id} onClick={removeSelected}>X</button>
                            </div>
                        ))} */}
                    </div>
                    <button id="Add-user-btn" onClick={handleAddUsers}>Add</button>
                </div>
            </div>
            <div></div>
        </div>
    )

}

export default UserSearchAndAdd