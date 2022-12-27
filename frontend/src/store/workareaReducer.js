import csrfFetch from "./csrf";

export const RETRIEVE_WORKAREAS = 'workareas/getWorkareas';
export const SET_CURRENT_WORKAREA = 'workareas/setWorkarea';

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
    }
}

let workareaStructure = {
    currentWorkarea: {},
    workareas: []
}

const workareaReducer = (state=null, action ) => {
    state ||= workareaStructure
    Object.freeze(state);
    const nextState = {...state}
    switch(action.type) {
        case RETRIEVE_WORKAREAS:
            nextState.workareas = Object.values(action.workareas);
            return nextState
        case SET_CURRENT_WORKAREA:
            nextState.currentWorkarea = action.currentWorkarea
            return nextState;
        default: 
            return state;
    }
}

export default workareaReducer