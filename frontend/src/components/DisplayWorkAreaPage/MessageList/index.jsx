import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchWorkarea, getCurrentWorkAreaMessage } from "../../../store/workareaReducer"
import MessageElement from "./MessageElement"


const MessageList = () => {
    const messages = useSelector(getCurrentWorkAreaMessage)
    console.log(messages)
    const { workareaId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchWorkarea(workareaId))
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