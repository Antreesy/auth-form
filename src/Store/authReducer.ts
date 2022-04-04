import { ERASE_TOKEN, GET_TOKEN } from "./authActions";

const initialState = {
    "auth_token": "",
}

interface IActionType {
    type: string,
    payload: string,
}

export const authReducer = (state = initialState, action: IActionType ) => {
    switch (action.type) {

        case GET_TOKEN: {
            const auth_token = action.payload
            return {...state, auth_token};
        }

        case ERASE_TOKEN: {
            const auth_token = ''
            return {...state, auth_token};
        }

        default: return state;
    }
}