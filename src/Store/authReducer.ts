import Utils from "../Methods/Utils";
import { GET_TOKEN, ERASE_TOKEN, CREATE_TOKEN, GET_LOGIN, ERASE_LOGIN  } from "./authActions";

const initialState = {
    "login": "",
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

        case CREATE_TOKEN: {
            const auth_token = Utils.generateToken()
            return {...state, auth_token};
        }

        case GET_LOGIN: {
            const login = action.payload
            return {...state, login};
        }

        case ERASE_LOGIN: {
            const login = ""
            return {...state, login};
        }

        default: return state;
    }
}