import csrfFetch, { storeCSRFToken } from './csrf';

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

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

export const login = (user) => async (dispatch) => {
    const { email, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        })
    });
    const data = await response.json();
    dispatch(setCurrentUser(data.user));
    return response;
};

// export const logout = () => async (dispatch) => {
//     const response = await csrfFetch('/api/session', {
//         method: 'DELETE'
//     });
//     storeCurrentUser(null);
//     dispatch(removeCurrentUser());
//     return response;
// }

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return { ...state, user: action.payload };
        case REMOVE_CURRENT_USER:
            return { ...state, user: null };
        default:
            return state;
    }
};

export default sessionReducer;