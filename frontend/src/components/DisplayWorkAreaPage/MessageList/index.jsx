import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchMessages } from "../../../store/messageReducer"
import { fetchWorkarea, getCurrentWorkArea } from "../../../store/workareaReducer"
import MessageElement from "./MessageElement"


const MessageList = () => {
    const messages = useSelector(state => state.messages.currentLocation)
    console.log(messages)
    const { workareaId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchMessages(workareaId))
    }, [dispatch, workareaId])
    return (
        <>
            
            {messages?.map(message => (
                <div>
                    <MessageElement message={message} key={message.id} />
                </div>
            ))}

        </>
    )

}

export default MessageList