import { passwords } from "../API/server";
import { SET_MODIFIED_PASSWORD, NEW_PASSWORD, PASSWORD_STORED, FETCH_PL, FETCH_PW, STORE_PW, DELETE_PW, EDIT_PW } from "../constants";

 
// ref
// export const fetchSavedBooks = () => async(dispatch) => {
//     const { data } = await savedBooks.get();
//     dispatch({type: FETCH_SAVED_BOOKS, payload: data});
// }
// export const setModifiedPassword = modifiedPassword => {
//     return ({ type: SET_MODIFIED_PASSWORD, payload: modifiedPassword });
// }

// export const setPasswordStored = newPassword => {
//     return ({ type: PASSWORD_STORED, payload: newPassword });
// }


export const fetchPasswordList = () => async () => {
    const { data } = await passwords.get('/passwords');
    console.log(data);
    return ({type:FETCH_PL, payload: data});
}
export const fetchPassword = id => async () => {
    const { data } = await passwords.get(`/passwords/${id}`);
    console.log(data);
    return ({type:FETCH_PW, payload: data});
}

// export const setPasswordList = newPWList => {
//     return ({ type: '', payload: newPWList });
// }