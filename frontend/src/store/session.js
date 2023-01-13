import csrfFetch, { storeCSRFToken } from './csrf';
import { CREATE_WORKAREA } from './workareaReducer';

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';
const GET_NEW_MEMBERSHIP = 'session/newSessionShow';
export const ERROR_IN_SESSION = 'failed/apiSessionReq';

export const getCurrentUser = (state) => {
    if (!Object.keys(state.session).length) return null 
    else return state.session.user
}

export const getUserWorkareas = (state) => {
    if (!Object.keys(state.session).length) return null
    else if(!state.session.user.memberships) return null 
    else return Object.values(state.session.user.memberships.workareas)
}


const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    };
};

const removeCurrentUser = () => {
    return {
        type: REMOVE_CURRENT_USER
    };
};

export const getNewMembership = (user) => {
    return {
        type: GET_NEW_MEMBERSHIP,
        user
    }
}

export const sessionReqFailed = (payload) => {
    return {
        type: ERROR_IN_SESSION,
        payload
    }
}


const storeCurrentUser = user => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser");
}


export const login = ({email, password}) => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        })
    });
    if (response.ok) {
        const data = await response.json();
        storeCurrentUser(data.user)
        dispatch(setCurrentUser(data.user));
        return response;
    } else {
        throw response;
    }
};



export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    storeCurrentUser(null);
    dispatch(removeCurrentUser());
    return response;
}

export const signup = ({name, email, password}) => async (dispatch) => {
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            name,
            email,
            password
        })
    });
    if (response.ok) {
        const data = await response.json();
        storeCurrentUser(data.user);
        dispatch(setCurrentUser(data.user));
        return response
    } else {
        dispatch(sessionReqFailed({res: response}))
        throw response
    }
}

export const restoreSession = () => async dispatch => {
    const response = await csrfFetch("/api/session");
    storeCSRFToken(response);
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
};

export const retriveNewMembership = () => async dispatch => {
    const res = await csrfFetch(`/api/session`);
    if (res.ok) {
        const user = await res.json();
        dispatch(getNewMembership(user))
        return user 
    } else {
        dispatch(sessionReqFailed({ res }))
    }
}

const initialState = {
    user: JSON.parse(sessionStorage.getItem("currentUser"))
};

const sessionReducer = (state = initialState, action) => {
    const nextState = {...state};
    switch (action.type) {
        case SET_CURRENT_USER:
            return { ...state, user: action.payload };
        case REMOVE_CURRENT_USER:
            return { ...state, user: null };
        case GET_NEW_MEMBERSHIP:
            // nextState
            return {...state, ...action.user}
        default:
            return state;
    }
};

export default sessionReducer;