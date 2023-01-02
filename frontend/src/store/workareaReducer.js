import csrfFetch from "./csrf";
import { getNewMembership } from "./session"

export const RETRIEVE_WORKAREAS = 'workareas/getWorkareas';
export const SET_CURRENT_WORKAREA = 'workareas/setWorkarea';
export const CREATE_WORKAREA = 'workareas/createWorkarea'

export const getCurrentWorkAreaMessage = (state) => {
    if (!Object.keys(state.workarea.currentWorkarea).length) return [];
    return Object.values(state.workarea.currentWorkarea.messages)
}

export const getCurrentWorkArea= (state) => {
    if (!Object.keys(state.workarea.currentWorkarea).length) return {};
    return Object.values(state.workarea.currentWorkarea)
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

    }
    console.log('cannot create new workarea');
    return 

}

export const fetchWorkareas = () => async dispatch => {
    const res = await csrfFetch('/api/workareas');
    if (res.ok) {
        const workareas = await res.json();
        dispatch(getWorkareas(workareas))
    } else {
        console.log("failed getting all the workareas")
    }
}

export const fetchWorkarea = (workareaId) => async dispatch => {
    const res = await csrfFetch(`/api/workareas/${workareaId}`);

    if (res.ok) {
        const currentWorkarea = await res.json();
        dispatch(setCurrentWorkarea(currentWorkarea)); 
        return currentWorkarea
    } else {
        console.log("failed workarea fetch");
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