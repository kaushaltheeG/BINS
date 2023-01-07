import { ERROR_IN_DM } from "./directMessageReducer";
import { ERROR_IN_MESSAGE } from "./messageReducer";
import { ERROR_IN_POD } from "./podReducer";
import { ERROR_IN_SESSION } from "./session";
import { ERROR_IN_WA } from "./workareaReducer";



let errorStructure = {
    dm: {},
    message: {},
    pod: {},
    session: {},
    workarea: {}
}


const errorReducer = (state = null, action) => {
    state ||= errorStructure
    Object.freeze(state);
    const date = new Date();
    const nextState = {...state}
    switch(action.type) {
        case ERROR_IN_DM:
            nextState.dm = { ...state.dm, [date[Symbol.toPrimitive]('string')]: action.payload.res}
            return nextState
        case ERROR_IN_MESSAGE: 
            nextState.message = { ...state.message, [date[Symbol.toPrimitive]('string')]: action.payload.res }
            return nextState
        case ERROR_IN_POD: 
            nextState.pod = { ...state.message, [date[Symbol.toPrimitive]('string')]: action.payload.res }
            return nextState
        case ERROR_IN_SESSION:
            nextState.session = { ...state.message, [date[Symbol.toPrimitive]('string')]: action.payload.res }
            return nextState
        case ERROR_IN_WA:
            nextState.workarea = { ...state.message, [date[Symbol.toPrimitive]('string')]: action.payload.res }
            return nextState
        default: 
            return state;
    }
}

export default errorReducer;