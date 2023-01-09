import { useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { createDmMessage, createPodMessage } from "../../../store/messageReducer";
import "./MessageInput.css"
import { createDirectMessage } from "../../../store/directMessageReducer";
const MessageInput = ({ body, setBody, withinSelected, setWithinSelected, dms, pods }) => {
    // const [body, setBody] = useState('');
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const { workareaId, typeId, type, newMsg } = useParams();
    let currentName;
    if (type === 'pods' && !newMsg) {
        currentName = `Pod ${pods[typeId]?.name} `

    } else if ( type === 'dms' && !newMsg) {
        if (dms[typeId]?.isGroup) {
            currentName = 'Group Chat'
        } else {
            currentName = dms[typeId] ? Object.values(dms[typeId]?.members).filter(mem => mem.id !== currentUser?.id)?.at(0)?.name : "" 
            console.log(currentName)

        }
    } else if (newMsg) {
        currentName = 'New Person'
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (body.length) {
            const message = {
                body,
                author_id: currentUser.id,
            }
            if (type === 'pods' && !newMsg) {
                createPodMessage(message, workareaId, typeId)
            } else if (newMsg === 'newmessage') {
                let payload = {
                    body,
                    userIds: withinSelected
                }
                dispatch(createDirectMessage(workareaId, payload)).then((dm) => {
                    history.push(`/client/workareas/${dm.workareaId}/dms/${dm.id}`)
                })
            } else if (type === 'dms' && !newMsg) {
                createDmMessage(message, workareaId, typeId)
            }
            setBody('')
            setWithinSelected([])
        }
    }


    return (
        <div className="message-input">
        
            <div className="flex-msg-input">
                <textarea 
                    type="text" id="msg-input-tag" 
                    placeholder={`Message ${currentName}`}
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    onKeyDown={e => {
                        if (e.code === 'Enter' && !e.shiftKey) {
                            handleSubmit(e);
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default MessageInput