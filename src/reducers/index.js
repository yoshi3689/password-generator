import { combineReducers } from "redux";
import { MODIFIED_PASSWORD, NEW_PASSWORD, PASSWORD_STORED } from "../constants";

const newPWReducer = (state=null, action) => {
    switch(action.type) {
        case NEW_PASSWORD:
            return action.payload;
        default: return state;
    }
}

const modifiedPWReducer = (state=null, action) => {
    switch(action.type) {
        case PASSWORD_STORED:
            return action.payload;
        case MODIFIED_PASSWORD:
            return {...state, ...action.payload};
        default: return state;
    }
}

export const reducers = combineReducers({
    newPassword: newPWReducer,
    modifiedPassword: modifiedPWReducer,
})