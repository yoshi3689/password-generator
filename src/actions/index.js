import { MODIFIED_PASSWORD, NEW_PASSWORD, PASSWORD_STORED } from "../constants";

// ref
// export const fetchSavedBooks = () => async(dispatch) => {
//     const { data } = await savedBooks.get();
//     dispatch({type: FETCH_SAVED_BOOKS, payload: data});
// }
export const setModifiedPassword = newPassword => {
    return ({ type: MODIFIED_PASSWORD, payload: newPassword });
}

export const setPasswordStored = newPassword => {
    return ({ type: PASSWORD_STORED, payload: newPassword });
}

export const setPasswordList = newPWList => {
    return ({ type: '', payload: newPWList });
}