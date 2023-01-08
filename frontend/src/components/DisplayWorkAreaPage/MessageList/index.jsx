import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { fetchPodMessages, fetchDmMessages, receiveMessage, getMessages, deleteMessage } from "../../../store/messageReducer"
// import { fetchWorkarea, getCurrentWorkArea } from "../../../store/workareaReducer"
import MessageElement from "./MessageElement"
import consumer from '../../../consumer';
import "./MessageList.css"


const MessageList = () => {
    const messages = useSelector(getMessages)
   
    const { workareaId, typeId, type} = useParams();
    const dispatch = useDispatch();
    const history = useHistory()
    const msgRef = useRef(null);
    // const [newDate]
    const dateSet = new Set();

    const fullDate = (date) => {
        let formated = new Date(date)
        formated = formated.toDateString()
        dateSet.add(formated)
        console.log(dateSet)
        return formated
    }

    const dateSetCheck = (date) => {
        let formated = new Date(date)
        return formated.toDateString()
        
    }




    useEffect(()=> {
        msgRef?.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [workareaId, messages?.length])


    useEffect(() => {
        if (type === "pods") {
            dispatch(fetchPodMessages(workareaId, typeId))
        } else if (type === "dms") {
            dispatch(fetchDmMessages(workareaId, typeId))
        }
        
    }, [dispatch, workareaId, typeId])

    //websocket connection 
    useEffect(()=> {
        let subscription;
        if (type === 'pods') {
            subscription = consumer.subscriptions.create(
                {channel: 'PodChannel', workareaId: workareaId, podId: typeId},
                {
                    connected: () => {
                        console.log('connected to pod')
                    },
                    received: (message) => {
                        console.log(message, 'msg')
                        
                        switch (message.type) {
                            case 'RECEIVE_MESSAGE':
                                dispatch(receiveMessage(message))
                                break;
                            case 'UPDATE_MESSAGE':
                                dispatch(receiveMessage(message))
                                break;
                            case 'DELETE_MESSAGE':
                                dispatch(deleteMessage(message.id))
                                break;
                            default:
                                console.log('failed to brodcast ', message.type)
                                break;
                        }
                        
                    }
                }
            )
        }

        return () => subscription?.unsubscribe();
    }, [dispatch, workareaId, typeId, type])

    useEffect(() => {
        let subscription; 
        if (type === 'dms') {
            subscription = consumer.subscriptions.create(
                { channel: 'DirectMessageChannel', workareaId: workareaId, dmId: typeId },
                {
                    connected: () => {
                        console.log('connected to dm')
                    },
                    received: (message) => {
                        console.log(message, 'msg')
                        switch (message.type) {
                            case 'RECEIVE_MESSAGE': 
                                dispatch(receiveMessage(message))
                                break; 
                            case 'UPDATE_MESSAGE':
                                dispatch(receiveMessage(message))
                                break; 
                            case 'DELETE_MESSAGE':
                                dispatch(deleteMessage(message.id))
                                break;
                            default:
                                console.log('failed to brodcast ', message.type)
                                break; 
                        }
                        
                    }
                }
            )

        }
        return () => subscription?.unsubscribe();
    }, [dispatch, workareaId, typeId, type])

    return (
        <>
            
            <div className="message-list">
                {messages?.map((message, i) => (
                    <div key={i}>
                        {!dateSet.has(dateSetCheck(message.createdAt)) && 
                            <div className="date-hr-container">
                                <hr className=" general-hr left-hr" />
                                <div className="date-container">
                                    <button className="date-msg">{fullDate(message.createdAt)}</button>
                                </div>
                                <hr className="general-hr right-hr" />
                            </div>
                        }
                        <MessageElement message={message} key={message.id}  />
                    </div>
                ))}
                <div id="message-bottom" ref={msgRef} />
            </div>

        </>
    )

}

export default MessageList