import { useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { createMessage } from "../../../store/messageReducer";
import "./MessageInput.css"
const MessageInput = () => {
    const [body, setBody] = useState('');
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const { workareaId } = useParams();


    const handleSubmit = e => {
        e.preventDefault();
        const message = {
            body,
            author_id: currentUser.id,
        }
        dispatch(createMessage(message, workareaId)) 
        setBody('')
    }


    return (
        <div className="message-input">
        
            <div className="flex-msg-input">
                <input 
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