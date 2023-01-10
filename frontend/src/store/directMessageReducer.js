import csrfFetch from "./csrf";
import { SET_CURRENT_WORKAREA } from "./workareaReducer";

export const GET_ALL_USER_DIRECT_MESSAGES = 'user_all_get/DIRECT_MESSAGES';
export const GET_SELECTED_DIRECT_MESSAGE = 'selected_fetch/DIRECT_MESSAGE';
export const REMOVE_CHAT = 'deleteGC/DIRECT_MESSAGE';
export const CREATE_DM = 'newOrNot/createDM';
export const ERROR_IN_DM = 'failed/DMApiReq';


export const getUserDirectMessages = (directMessages) => {
    return {
        type: GET_ALL_USER_DIRECT_MESSAGES,
        directMessages
    }
}

export const setDirectMessage = (directMessage) => {
    return {
        type: GET_SELECTED_DIRECT_MESSAGE,
        directMessage
    }
}

export const removeGroupChat = (dmId) => {
    return {
        type: REMOVE_CHAT,
        dmId
    }
}

export const dmRquestFailed = (payload) => {
    return {
        type: ERROR_IN_DM,
        payload
    }
}



export const fetchAllUserDirectMessages = (workareaId) => async dispatch => {
    const res = await csrfFetch(`/api/workareas/${workareaId}/direct_messages`);
    
  
    if (res.ok) {
        const directMessages = await res.json();
        dispatch(getUserDirectMessages(directMessages));
        return directMessages;
    } else {
        dispatch(dmRquestFailed({ res }))
    }
    
}

export const newGcMember = (payload) => async dispatch => {
    const res = await csrfFetch(`/api/workareas/${payload.workareaId}/direct_messages/${payload.id}/addmembers`, {
        method: 'POST', 
        body: JSON.stringify(payload)
    })

    // if (res.ok) {
    //     const directMessage = await res.json();
    //     dispatch(setDirectMessage(directMessage))
    //     return directMessage
    // } else {
    //     dispatch(dmRquestFailed({ res }))
    // }
}

export const demeberGroupChat = (workareaId, dmId) => async dispatch => {
    
    const res = await csrfFetch(`/api/workareas/${workareaId}/direct_messages/${dmId}/demember`, {
        method: 'POST',
    })

    // if (res.ok) {
    //     dispatch(removeGroupChat(dmId))
    //     return dmId 
    // } else {
    //     dispatch(dmRquestFailed({ res }))
    // }
}

export const createDirectMessage = (workareaId, payload) => async dispatch => {
    const res = await csrfFetch(`/api/workareas/${workareaId}/direct_messages`, {
        method: 'POST',
        body: JSON.stringify({directMessage: payload})
    })

    // if (res.ok) {
    //     const directMessage = await res.json();
    //     dispatch(setDirectMessage(directMessage));
    //     return directMessage
    // } else {
    //     dispatch(dmRquestFailed({ res }))
    // }
}


const directMessageReducer = (state={}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case GET_ALL_USER_DIRECT_MESSAGES: 
            return {...state, ...action.directMessages}
        case GET_SELECTED_DIRECT_MESSAGE:
            return {...state, [action.directMessage.id]: action.directMessage}
        case REMOVE_CHAT: 
            const nextState = {... state}
            delete nextState[action.dmId]
            return nextState
            return 
        case SET_CURRENT_WORKAREA:
            return {}
        default: 
            return state 
    }
}

export default directMessageReducer;