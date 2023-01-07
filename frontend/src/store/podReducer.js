import csrfFetch from "./csrf";
import { SET_CURRENT_WORKAREA } from "./workareaReducer";
const GET_MEMBERSHIP_PODS = 'get/UserPods';
const CREATE_POD = 'create/Pod';
const DELETE_POD = 'delete/POD';
export const ERROR_IN_POD = 'failed/apiPodReq';

export const getUserPods = (pods) => {
    return {
        type: GET_MEMBERSHIP_PODS,
        pods 
    }
}

export const setPod = (pod) => {
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

export const podReqFailed = (payload) => {
    return {
        type: ERROR_IN_POD,
        payload
    }
}

export const fetchUserPods = (workareaId) => async dispatch => {
    const res = await csrfFetch(`/api/workareas/${workareaId}/pods`);

    if (res.ok) {
        const pods = await res.json();
        dispatch(getUserPods(pods));
        return pods
    } else {
        dispatch(podReqFailed({res}))
    }

} 

export const createPod = (payload) => async dispatch => {
    const res = await csrfFetch(`/api/workareas/${payload.workareaId}/pods`, {
        method: 'POST',
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const pod = await res.json();
        dispatch(setPod(pod))
        return pod 
    } else {
        dispatch(podReqFailed({ res }))
    }
}

export const updatePod = (payload) => async dispatch => {
    const res = await csrfFetch(`/api/workareas/${payload.workareaId}/pods/${payload.id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const pod = await res.json();
        dispatch(setPod(pod));
        console.log(pod)
        return pod 
    } else {
        dispatch(podReqFailed({ res }))
    }
}

export const newPodMembers = (payload) => async dispatch => {
    const res = await csrfFetch(`/api/workareas/${payload.workareaId}/pods/${payload.podId}/addmembers`, {
        method: 'POST',
        body: JSON.stringify(payload)
    })

    if (res.ok) {
        const pod = await res.json();
        dispatch(setPod(pod));
        return pod 
    } else {
        dispatch(podReqFailed({ res }))
    }
}

export const deletePod = (workareaId, podId) => async dispatch => {
    const res = await csrfFetch(`/api/workareas/${workareaId}/pods/${podId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(removePod(podId))
        return podId 
    } else {
        dispatch(podReqFailed({ res }))
    }
}

export const dememberFromPod = (workareaId, podId) => async dispatch => {
    const res = await csrfFetch(`/api/workareas/${workareaId}/pods/${ podId }/demember`, {
        method: 'POST'
    });
    if (res.ok) {
        dispatch(removePod(podId));
        return podId
    } else {
        dispatch(podReqFailed({ res }))
    }
}



const podReducer = (state={}, action) => {

    Object.freeze(state);
    switch(action.type) {
        case GET_MEMBERSHIP_PODS:
            return {...state, ...action.pods}
        case CREATE_POD:
            return {...state, [action.pod.id]: action.pod}
        case DELETE_POD:
            const nextState = {...state};
            delete nextState[action.podId];
            return {...nextState}
        case SET_CURRENT_WORKAREA:
            return {}
        default:
            return state;
    }
}

export default podReducer;