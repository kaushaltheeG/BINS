import "./MessageElement.css"
import useHover from "../../../hooksAndMore/useHover";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../../store/session";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState } from "react";
import classNames from "../../../hooksAndMore/classNames";
import { useParams } from "react-router-dom";
import { destroyMessage, updateMessage } from "../../../store/messageReducer";



const MessageElement = ({ message }) => {
    const { id, body, createdAt, updatedAt, authorName, authorId } = message; //might need createdAt & modifiedAt
    const {typeId} = useParams();
    // const [hoverRef, isHovered] = useHover();
    const [isHovering, setIsHovering] = useState(false);
    const currentUser = useSelector(getCurrentUser);
    const [currentBody, setCurentBody] = useState(body);
    const [edit, setEdit] = useState(false)
    const [remove, setRemove] = useState(false)
    const textareFoucs = useRef(null)

    const handleMouseOver = (e) => {
       
        e.preventDefault();
        if (currentUser.id === authorId) {
            setIsHovering(true);
        }
    };

    const handleMouseOut = (e) => {
        e.preventDefault();
        if (currentUser.id === authorId) {
            setIsHovering(false);
        }
    };
   


    const timestamp = () => {
        let date = new Date(updatedAt);
        let hours = date.getUTCHours();
        let mins = date.getUTCMinutes();
        const isPm = hours < 20 ? 'AM' : 'PM';
        const adjustedHours = !((hours+4) % 12) ? 12 : (hours+4) % 12 
        const adjustedMins = mins < 10 ? `0${mins}` : mins
        // if (!adjustedHours) adjustedHours = 12
        return `${adjustedHours}:${adjustedMins} ${isPm}`
    }


    const openEdit = (e) => {
        e.preventDefault();
        console.log(e)
        setEdit(oldVal => true);
        setRemove(oldVal => false);
        
    }

    const openRemove = (e) => {
        e.preventDefault();
        // e.stopPropogation()

        setRemove(oldVal => true);
        setEdit(oldVal => false);
    }

    const handleEditMessage = (e) => {
        e.preventDefault();
        setCurentBody(e.target.value)
    }

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        if (body.length) {
            let payload = {
                body: currentBody,
                platformId: typeId
            }
            updateMessage(payload, id)
            setEdit(false)
        }
    }
    

    const handleCancel = (e) => {
        e.preventDefault()
        setEdit(oldVal => false)
        setRemove(oldVal => false)
    }

    const handleDeleteMessage = (e) => {
        e.preventDefault()
        destroyMessage(id, typeId)
    }

    useEffect(() => {
   
        textareFoucs?.current?.focus();
    }, [edit])

  
    return (
        <>
            <div className={classNames("message-container", edit && 'edit-background-color')} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
                {message && 
                <>
                    <div className="profile-icon">
                        <button className="profile-icon" >{authorName?.at(0).toUpperCase()}</button>
                    </div>
                    { (edit && !remove) && 
                        <>
                            <form onSubmit={handleSubmitEdit} className="edit-msg-form">
                                <textarea ref={textareFoucs} className="edit-message-textarea" value={currentBody} onChange={handleEditMessage} />
                                <div className="edit-cancel-msg-btns">
                                        <div className="cancel-edit-btn container">
                                    <button id='cancel-msg-btn' onClick={handleCancel} onMouseOver={e => e.stopPropagation()}>Cancel</button>
                                        </div>
                                        <div className="save-edit-btn container">
                                    <button id='edit-msg-btn' onClick={handleSubmitEdit} onMouseOver={e => e.stopPropagation()}>Save</button>
                                        </div>
                                </div>
                            </form>
                        
                        </>
                    }
                    { (!edit && !remove) && 
                    <>
                        <div className="author-time-body">
                            <div className="author-time">
                                <span className="author-name">{authorName}</span>
                                <span className="timestamp">{timestamp()}</span>
                            </div>
                            <span className="message-body">{currentBody}</span>
                        </div>
                        {isHovering && 
                            <div className="edit-and-delete-container" onMouseOver={e => e.stopPropagation()}>
                                <div className="edit-icon-container" onClick={openEdit} onMouseOver={e => e.stopPropagation()}>
                                    <ModeEditOutlineIcon />
                                </div>
                                <div className="delete-icon-container" onClick={openRemove} onMouseOver={e => e.stopPropagation()}>
                                    <DeleteIcon /> 
                                </div>
                            </div>
                        }
                    </>
                        
                    }
                    {(!edit && remove) && 
                    <>
                        <div className="author-time-body">
                            <div className="author-time">
                                <span className="author-name">{authorName}</span>
                                <span className="timestamp">{timestamp()}</span>
                            </div>
                            <span className={classNames("message-body", remove && "remove-message-style")}>{currentBody}</span>
                        </div>
                        <div className="edit-and-delete-container">
                            <div className="delete-check">
                                <CheckIcon onClick={handleDeleteMessage} onMouseOver={e => e.stopPropagation()} />
                            </div>
                            <div className="cancel-cross">
                                <CloseIcon onClick={handleCancel} onMouseOver={e => e.stopPropagation()} />
                            </div>
                        </div>
                    </>
                        
                    }

                </>
                }
            </div>
        </>
    )

}

export default MessageElement