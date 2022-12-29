import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchMessages, receiveMessage } from "../../../store/messageReducer"
import { fetchWorkarea, getCurrentWorkArea } from "../../../store/workareaReducer"
import MessageElement from "./MessageElement"
import consumer from '../../../consumer';


const MessageList = () => {
    const messages = useSelector(state => state.messages.currentLocation)
    console.log(messages)
    const { workareaId } = useParams();
    const dispatch = useDispatch();
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        dispatch(fetchMessages(workareaId))
    }, [dispatch, workareaId])

    useEffect(()=> {

        const subscription = consumer.subscriptions.create(
            {channel: 'WorkareaChannel', id: workareaId},
            {
                connected: () => {
                    console.log('connected to work area')
                },
                received: message => {
                    console.log('Received message: ', message)
                    dispatch(receiveMessage(message))
                    setCounter(prev => prev + 1)
                }
            }
        )

        return () => subscription?.unsubscribe();
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