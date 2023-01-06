import { useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { createDmMessage, createPodMessage } from "../../../store/messageReducer";
import "./MessageInput.css"
const MessageInput = ({body, setBody}) => {
    // const [body, setBody] = useState('');
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const { workareaId, typeId, type } = useParams();


    const handleSubmit = e => {
        e.preventDefault();
        const message = {
            body,
            author_id: currentUser.id,
        }
        if (type === 'pods') {
            createPodMessage(message, workareaId, typeId)
        } else {
            createDmMessage(message, workareaId, typeId)
        }
        setBody('')
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