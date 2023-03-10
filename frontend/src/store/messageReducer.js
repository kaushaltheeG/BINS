import csrfFetch from "./csrf";
import { SET_CURRENT_WORKAREA } from "./workareaReducer";
const GET_ALL_MESSAGE = 'messages/FETCH_ALL_MESSAGES';
const CREATE_MESSAGE = 'messages/CREATE_MESSAGE';
const RECEIVE_MESSAGE = 'message/RECEIVE'
const DELETE_MESSAGE = 'message/DELETE';
export const ERROR_IN_MESSAGE = 'failed/messageRequest';

export const getMessages = (state) => {
    if (!state.messages) return null 
    else return Object.values(state.messages.data)
}



export const retriveMessages = (payload) => {
    return {
        type: GET_ALL_MESSAGE,
        payload
    }
}

export const newMessage = (message) => {
    return {
        type: CREATE_MESSAGE,
        message
    }
} 

export const receiveMessage = (message) => {
    return {
        type: RECEIVE_MESSAGE,
        message
    }
}

export const deleteMessage = (messageId) => {
    return {
        type: DELETE_MESSAGE,
        messageId
    }
}

export const messageReqFailed = (payload) => {
    return {
        type: ERROR_IN_MESSAGE,
        payload
    }
}
export const fetchPodMessages = (workareaId, podId) => async dispatch => {
    const res = await csrfFetch(`/api/workareas/${workareaId}/pods/${podId}`);

    if (res.ok) {
        const payload = await res.json();
    
        dispatch(retriveMessages(payload));
        return payload
    } else {
        dispatch(messageReqFailed({ res }))
    }
}

export const fetchDmMessages = (workareaId, dmId) => async dispatch => {
    const res = await csrfFetch(`/api/workareas/${workareaId}/direct_messages/${dmId}`);

    if (res.ok) {
        const payload = await res.json();
        dispatch(retriveMessages(payload));
        return payload
    } else {
        dispatch(messageReqFailed({ res }))
    }
}



export const createMessage =  (payload, workareaId, podId) => {
    //old post req; route no longer exists  
    csrfFetch(`/api/workareas/${workareaId}/pods/${podId}/messages`, {
        method: 'POST',
        body: JSON.stringify(payload)
    });

}

export const createPodMessage = (payload, workareaId, podId) => {
    csrfFetch(`/api/workareas/${workareaId}/pods/${podId}/newmessage`, {
        method: 'POST',
        body: JSON.stringify({pod: payload})
    })
}

export const createDmMessage = (payload, workareaId, dmId) => {
    csrfFetch(`/api/workareas/${workareaId}/direct_messages/${dmId}/newmessage`, {
        method: 'POST',
        body: JSON.stringify({directMessage: payload})
    })
}

export const updateMessage = (payload, messageId) => {
    // debugger 
    csrfFetch(`/api/messages/${messageId}`, {
        method: 'PATCH', 
        body: JSON.stringify({message: payload})
    })
}

export const destroyMessage = (messageId, platformId) => {
    csrfFetch(`/api/messages/${messageId}`, {
        method: 'DELETE',
        body: JSON.stringify({message: {platformId}})
    })
}

let messageStructure = {
    location: 0,
    data: {}
}

const messageReducer = (state=null, action) => {
    state ||= messageStructure
    Object.freeze(state);
    let nextState = {...state}
    switch(action.type) {
        case GET_ALL_MESSAGE:
            
            if (action.payload.name) {
                //0 means pod 
                nextState.location = 0;
                nextState.data = {...action.payload.messages}
            } else {
                //1 means dm 
                nextState.location = 1;
                nextState.data = { ...action.payload.messages }
            }
            return nextState

        case CREATE_MESSAGE:
            nextState.currentLocation.push(action.message);
            return nextState
        case RECEIVE_MESSAGE:
            nextState.data = {...nextState.data, [action.message.id]: action.message}
            return nextState
        case DELETE_MESSAGE:
            delete nextState.data[action.messageId]
            return nextState
        case SET_CURRENT_WORKAREA:
            return null
        default: 
            return state
    }
}

export default messageReducer