import { combineReducers } from "redux";
import _ from 'lodash';
import { 
    SET_MODIFIED_PASSWORD, SET_PW, FETCH_PL, STORE_PW, DELETE_PW, EDIT_PW, SET_PL
} from "../constants";
// import { setPasswordList } from "../actions";

const newPWReducer = (state=null, action) => {
    if(action.type === SET_PW) {
        return action.payload;
    }
    return state;
}

const modifiedPWReducer = (state=null, action) => {
    switch(action.type) {
        case SET_MODIFIED_PASSWORD:
            return {...state, ...action.payload};
        default: return state;
    }
}

const passwordListReducer = (state=null, action) => {
    console.log(action);
    switch(action.type) {
        case SET_PL: 
            // return { ...state, ...action.payload };
            return _.mapKeys(action.payload, 'id');
        case FETCH_PL: 
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case STORE_PW:
            return { ...state, [action.payload.id]:action.payload };
        case EDIT_PW:
            return { ...state, [action.payload.id]:action.payload };
        case DELETE_PW:
            return _.omit(state, action.patload);
        default:
            return state;
    }
}

export const reducers = combineReducers({
    newPassword: newPWReducer,
    modifiedPassword: modifiedPWReducer,
    passwordList: passwordListReducer
})

// const justUpdatedReducer = (state=null, action) => {
//     switch(action.type) {
//         case STORE_PW, EDIT_PW, DELETE_PW:
//             return action.payload;
//         default: return state;
//     }
// }