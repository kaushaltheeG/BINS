
import csrfFetch from "./csrf";
import { getNewMembership } from "./session"

export const RETRIEVE_WORKAREAS = 'workareas/getWorkareas';
export const SET_CURRENT_WORKAREA = 'workareas/setWorkarea';
export const CREATE_WORKAREA = 'workareas/createWorkarea'
export const ERROR_IN_WA = 'failed/WorkareaApiEq';

export const getCurrentWorkAreaMessage = (state) => {
    if (!Object.keys(state.workarea.currentWorkarea).length) return [];
    return Object.values(state.workarea.currentWorkarea.messages)
}

export const getCurrentWorkArea= (state) => {
    if (!Object.keys(state.workarea.currentWorkarea).length) return null;
    return state.workarea.currentWorkarea
}

export const getWorkareaMemebers = (state) => {
    if (!Object.keys(state.workarea.currentWorkarea).length) return null;
    else return Object.values(state.workarea.currentWorkarea.users)
}

export const getWorkareas = (workareas) => {
    return {
        type: RETRIEVE_WORKAREAS,
        workareas
    }
}
export const setCurrentWorkarea = (currentWorkarea) => {
    return {
        type: SET_CURRENT_WORKAREA,
        currentWorkarea
    }
}

export const newWorkArea = (workarea) => {
    return {
        type: CREATE_WORKAREA,
        workarea
    }
}

export const workareaReqFailed = (payload) => {
    return {
        type: ERROR_IN_WA,
        payload
    }
}

export  const createWorkarea = ({name, user_id}) => async dispatch => {
    const res = await csrfFetch(`/api/users/${user_id}/workareas`, {
        method: 'POST',
        body: JSON.stringify({
            name
        })
    });

    const res2 = await csrfFetch(`/api/session`);
    
    if (res.ok) {
        const workarea = await res.json();
        const user = await res2.json();
        dispatch(newWorkArea(workarea));
        dispatch(getNewMembership(user))
        return workarea;

    } else if (!res.ok) {
        dispatch(workareaReqFailed({res}))
    } else if (!res2.ok) {
        dispatch(workareaReqFailed({res: res2}))
    }
    return 

}

export const fetchWorkareas = () => async dispatch => {
    const res = await csrfFetch('/api/workareas');
    if (res.ok) {
        const workareas = await res.json();
        dispatch(getWorkareas(workareas))
    } else {
        dispatch(workareaReqFailed({ res }))
    }
}

export const fetchWorkarea = (workareaId) => async dispatch => {
    const res = await csrfFetch(`/api/workareas/${workareaId}`);

    if (res.ok) {
        const currentWorkarea = await res.json();
        dispatch(setCurrentWorkarea(currentWorkarea)); 
        return currentWorkarea
    } else {
        dispatch(workareaReqFailed({ res }))
        return null; 
    }
}

export const joinWorkarea = (payload) => async dispatch => {
    const res = await csrfFetch(`/api/workareas/${payload.workareaId}/addmembers`, {
        method: 'POST', 
        body: JSON.stringify(payload)
    })

    if (res.ok) {
        const currentWorkarea = await res.json();
        dispatch(setCurrentWorkarea(currentWorkarea));
        return currentWorkarea
    } else {
        dispatch(workareaReqFailed({ res }))
        return null;
    }
}

let workareaStructure = {
    currentWorkarea: {},
    allWorkareas: []
}

const workareaReducer = (state=null, action ) => {
    state ||= workareaStructure
    Object.freeze(state);
    const nextState = {...state}
    switch(action.type) {
        case RETRIEVE_WORKAREAS:
            nextState.allWorkareas = action.workareas;
            return nextState
        case SET_CURRENT_WORKAREA:
            nextState.currentWorkarea = action.currentWorkarea
            return nextState;
        case CREATE_WORKAREA:
            nextState.allWorkareas = [...nextState.allWorkareas, action.workarea]
            return nextState
        default: 
            return state;
    }
}

export default workareaReducer