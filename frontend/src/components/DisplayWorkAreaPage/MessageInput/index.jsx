import { useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { createDmMessage, createPodMessage } from "../../../store/messageReducer";
import "./MessageInput.css"
import { createDirectMessage } from "../../../store/directMessageReducer";
const MessageInput = ({ body, setBody, withinSelected, setWithinSelected }) => {
    // const [body, setBody] = useState('');
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const { workareaId, typeId, type, newMsg } = useParams();


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
                    placeholder="Message Pod Name"
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