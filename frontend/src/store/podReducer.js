import csrfFetch from "./csrf";

const GET_MEMBERSHIP_PODS = 'get/UserPods';
const CREATE_POD = 'create/Pod';

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



const podReducer = (state={}, action) => {

    Object.freeze(state);
    switch(action.type) {
        case GET_MEMBERSHIP_PODS:
            return {...state, ...action.pods.pods}
        default:
            return state;
    }
}

export default podReducer;