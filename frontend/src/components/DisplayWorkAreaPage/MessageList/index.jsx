import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { fetchMessages, receiveMessage } from "../../../store/messageReducer"
import { fetchWorkarea, getCurrentWorkArea } from "../../../store/workareaReducer"
import MessageElement from "./MessageElement"
import consumer from '../../../consumer';
import "./MessageList.css"


const MessageList = () => {
    const messages = useSelector(state => state.messages.currentLocation)
    console.log(messages)
    const { workareaId } = useParams();
    const dispatch = useDispatch();
    const [counter, setCounter] = useState(0);
    const history = useHistory()

    const msgRef = useRef(null);


    useEffect(()=> {
        msgRef?.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [workareaId, messages.length])


    useEffect(() => {
        dispatch(fetchMessages(workareaId))
        
    }, [dispatch, workareaId])

    //websocket connection 
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
            
            <div className="message-list">
                {messages?.map(message => (
                    <div >
                        <MessageElement message={message} key={message.id}  />
                    </div>
                ))}
                <div id="message-bottom" ref={msgRef} />
            </div>

        </>
    )

}

export default MessageList