import csrfFetch from "./csrf";

const GET_MEMBERSHIP_PODS = 'get/UserPods';

export const getUserPods = (pods) => {
    return {
        type: GET_MEMBERSHIP_PODS,
        pods 
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



const podReducer = (state={}, action) => {

    Object.freeze(state);
    switch(action.type) {
        case GET_MEMBERSHIP_PODS:
            return {...state, ...action.pods}
        default:
            return state;
    }
}

export default podReducer;