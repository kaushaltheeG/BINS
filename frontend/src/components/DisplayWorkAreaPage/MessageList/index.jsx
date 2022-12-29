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
    const activeMessageRef = useRef(null);
    const messageUlRef = useRef(null);
    const prevRoom = useRef(null);
    const numMessages = useRef(0);

    const activeMessageId = parseInt(history.location.hash.slice(1));

    // Scroll to message selected from mentions menu
    useEffect(() => {
        if (activeMessageRef.current) scrollToMessage();
    }, [activeMessageId]);

      // Effect to run when entering a room
    useEffect(() => {
        if (workareaId === prevRoom.current && numMessages.current < messages.length) {
            // Remove any hash values from the URL
            if (history.location.hash)
                history.push(history.location.pathname);
            scrollToBottom();
        }
        numMessages.current = messages.length;
    }, [messages, workareaId, history]);

    const scrollToMessage = () => {
        activeMessageRef.current.focus();
        activeMessageRef.current.scrollIntoView();
    };

    const scrollToBottom = () => {
        messageUlRef.current.scrollTop = messageUlRef.current.scrollHeight;
    };

    useEffect(()=> {
        msgRef?.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [workareaId, messages])


    useEffect(() => {
        dispatch(fetchMessages(workareaId))
        .then(()=> {
            if (activeMessageRef.current) {
                scrollToMessage();
            } else {
                scrollToBottom();
            }
            prevRoom.current = workareaId;
        })
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
            
            <div className="message-list" ref={messageUlRef}>
                {messages?.map(message => (
                    <div key={message.id}
                        ref={activeMessageId === message.id ? activeMessageRef : null}
                        tabIndex={-1}
                    >
                        <MessageElement message={message} key={message.id} />
                    </div>
                ))}
                <div id="message-bottom" ref={msgRef} />
            </div>

        </>
    )

}

export default MessageList