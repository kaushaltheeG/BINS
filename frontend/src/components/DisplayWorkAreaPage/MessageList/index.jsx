import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { fetchPodMessages, fetchDmMessages, receiveMessage, getMessages } from "../../../store/messageReducer"
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
                        // console.log('connected to work area')
                    },
                    received: message => {
                        
                        dispatch(receiveMessage(message))
                        
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
                        // console.log('connected to work area')
                    },
                    received: message => {
                        
                        dispatch(receiveMessage(message))
                        
                    }
                }
            )

        }

    }, [dispatch, workareaId, typeId, type])

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