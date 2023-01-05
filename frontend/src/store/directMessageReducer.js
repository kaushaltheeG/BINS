import csrfFetch from "./csrf";

export const GET_ALL_USER_DIRECT_MESSAGES = 'user_all_get/DIRECT_MESSAGES';
export const GET_SELECTED_DIRECT_MESSAGE = 'selected_fetch/DIRECT_MESSAGE';


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


export const fetchAllUserDirectMessages = (workareaId) => async dispatch => {
    const res = await csrfFetch(`/api/workareas/${workareaId}/direct_messages`);

    if (res.ok) {
        const directMessages = await res.json();
        dispatch(getUserDirectMessages(directMessages));
        return directMessages;
    }
    console.log('failed to get all user messages');
}

export const newGcMember = (payload) => async dispatch => {
    const res = await csrfFetch(`/api/workareas/${payload.workareaId}/direct_messages/${payload.id}/addmembers`, {
        method: 'POST', 
        body: JSON.stringify(payload)
    })

    if (res.ok) {
        const directMessage = await res.json();
        dispatch(setDirectMessage(directMessage))
        return directMessage
    }
}


const directMessageReducer = (state={}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case GET_ALL_USER_DIRECT_MESSAGES: 
            return {...state, ...action.directMessages}
        case GET_SELECTED_DIRECT_MESSAGE:
            return {...state, [action.directMessage.id]: action.directMessage}
        default: 
            return state 
    }
}

export default directMessageReducer;