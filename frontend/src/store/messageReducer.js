import { useSelector } from "react-redux";
import csrfFetch from "./csrf";
import { getCurrentWorkArea } from "./workareaReducer";

const GET_ALL_MESSAGE = 'messages/FETCH_ALL_MESSAGES';
const CREATE_MESSAGE = 'messages/CREATE_MESSAGE';

export const getMessages = (messages) => {
    return {
        type: GET_ALL_MESSAGE,
        messages
    }
}

export const newMessage = (message) => {
    return {
        type: CREATE_MESSAGE,
        message
    }
} 

export const fetchMessages = (workareaId) => async dispatch => {
    console.log(workareaId)
    const res = await csrfFetch(`/api/workareas/${workareaId}/messages`);

    if (res.ok) {
        const messages = await res.json();
        dispatch(getMessages(messages));
        return messages
    } else {
        console.log(`failed getting all messages for ${workareaId}` )
    }
}

export const createMessage = (payload, workareaId) => async dispatch => {
    const res = await csrfFetch(`/api/workareas/${workareaId}/messages`, {
        method: 'POST',
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const message = await res.json();
        dispatch(newMessage(message))
        return message
    } else {
        console.log(`Could not create new msg for ${workareaId}`)
    }
}

let messageStructure = {
    currentLocation: []
}

const messageReducer = (state=null, action) => {
    state ||= messageStructure
    Object.freeze(state);
    let nextState = {...state}
    switch(action.type) {
        case GET_ALL_MESSAGE:
            nextState.currentLocation = Object.values(action.messages).pop()
            return nextState
        case CREATE_MESSAGE:
            nextState.currentLocation.push(action.message);
            return nextState
        default: 
            return state
    }
}

export default messageReducer