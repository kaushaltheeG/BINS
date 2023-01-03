import csrfFetch from "./csrf";

const GET_MEMBERSHIP_PODS = 'get/UserPods';
const CREATE_POD = 'create/Pod';
const DELETE_POD = 'delete/POD';

export const getUserPods = (pods) => {
    return {
        type: GET_MEMBERSHIP_PODS,
        pods 
    }
}

export const setNewPod = (pod) => {
    return {
        type: CREATE_POD,
        pod 
    }
}

export const removePod = (podId) => {
    return {
        type: DELETE_POD,
        podId
    }
}

export const fetchUserPods = (workareaId) => async dispatch => {
    const res = await csrfFetch(`/api/workareas/${workareaId}/pods`);

    if (res.ok) {
        const pods = await res.json();
        dispatch(getUserPods(pods));
        return pods
    } 
    console.log('Could not retirve users pods');

} 

export const createPod = (payload) => async dispatch => {
    const res = await csrfFetch(`/api/workareas/${payload.workareaId}/pods`, {
        method: 'POST',
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const pod = await res.json();
        dispatch(setNewPod(pod))
        return pod 
    }
}

export const updatePod = (payload) => async dispatch => {
    const res = await csrfFetch(`/api/workareas/${payload.workareaId}/pods/${payload.id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const pod = await res.json();
        dispatch(setNewPod(pod));
        console.log(pod)

        return pod 
    }
    console.log('could not update pod ')
}

export const deletePod = (workareaId, podId) => async dispatch => {
    await csrfFetch(`/api/workareas/${workareaId}/pods/${podId}`, {
        method: 'DELETE'
    });
    dispatch(removePod(podId))
    return podId 
}

export const dememberFromPod = (workareaId, podId) => async dispatch => {
    await csrfFetch(`/api/workareas/${workareaId}/pods/${ podId }/demember`, {
        method: 'POST'
    });
    dispatch(removePod(podId));
    return podId
}



const podReducer = (state={}, action) => {

    Object.freeze(state);
    switch(action.type) {
        case GET_MEMBERSHIP_PODS:
            return {...state, ...action.pods.pods}

        case CREATE_POD:
            return {...state, [action.pod.id]: action.pod}
        case DELETE_POD:
            const nextState = {...state};
            delete nextState[action.podId];
            return {...nextState}
        default:
            return state;
    }
}

export default podReducer;