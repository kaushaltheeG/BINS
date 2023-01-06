import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { createDirectMessage } from '../../../store/directMessageReducer';
import { getCurrentUser } from '../../../store/session';
import { getCurrentWorkArea } from '../../../store/workareaReducer'
import './NewDm.css'


const NewDirectMessage = () => {
    const currentWa = useSelector(getCurrentWorkArea);
    const currentUser = useSelector(getCurrentUser);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [withinSelected, setWithinSelected] = useState([]);
    const [toBeAdded, setToBeAdded] = useState([]);
    const [errors, setErrors] = useState([]);
    const [query, setQuery] = useState("");
    const {workareaId} = useParams();
    const history = useHistory();
    const inputFoucs = useRef(null);
    const dispatch = useDispatch();

    const waMembers = currentWa ? Object.values(currentWa.users).filter(user => user.id !== currentUser.id): [];
    

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
        
        if (withinSelected.length > 6) {
            setErrors(["Only 8 people can be in a group chat."])
        }
    }



    const removeSelected = (e) => {
        e.preventDefault();
        const newIds = withinSelected.filter(num => (num != e.target.value))
        const newSelected = selectedUsers.filter(user => user.id !== parseInt(e.target.value))
        setWithinSelected(newIds)
        setSelectedUsers(newSelected)

        if (withinSelected.length < 9) {
            setErrors([])
        }
    }

    const handleDmSearch = (e) => {
        e.preventDefault();
        if (!query.length && withinSelected.length) {
            let payload = {
                userIds: withinSelected
            }
            dispatch(createDirectMessage(workareaId, payload)).then((dm) => {
                history.push(`/client/workareas/${dm.workareaId}/dms/${dm.id}`)
            })
        }
    }

    useEffect(()=>{
        if (!errors.length) inputFoucs.current.focus();
    },[selectedUsers.length])

    return (
        <>
            <div className="new-dm-form-container">
                <div className='to-container-search-new'>
                    <span className='to-new-dm'>To:</span>
                </div>
                <div className="new-dm-search-container">

                        <>
                            {selectedUsers.map((user) => (
                                <>
                                
                                    <div className="user-profile-dm-search-container marign-top-adjustment cancel-user-query">
                                        <div>
                                            <button className="profile-icon color-div-icon" id='size-override'>{user?.name[0]?.toUpperCase()}</button>
                                        </div>
                                        <span className='font-align'>{user?.name}</span>
                                        <div className="cancel-x-container" >
                                            <button className='font-align cancel-small-x' value={user.id} onClick={removeSelected}>X</button>
                                        </div>
                                    </div>
                                    <span className='user-search-spacer-span'></span>
                                </>
                            ))}
                        
                        </>
                        <>
                        
                            { errors?.map((error) => (
                                <div className='error-query-container' key={1}>
                                    <span>
                                        {error}
                                    </span>
                                </div>

                                
                            ))}
                            {!errors.length && 
                                <div className="user-query-container marign-top-adjustment">
                                    <input 
                                        ref={inputFoucs}
                                        className='user-query-input' 
                                        onChange={handleSearch} 
                                        value={query}
                                        onKeyDown={e => {
                                            if (e.code === 'Enter' && !e.shiftKey) {
                                                handleDmSearch(e)
                                            }
                                        }}
                                        ></input>
                                </div>
                
                            }
                        </>
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