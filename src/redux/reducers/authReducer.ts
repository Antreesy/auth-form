import Cookies from "js-cookie";
import { GET_TOKEN, GET_LOGIN, ERASE_USER  } from "../consts/auth";

const initialState = {
    "login": "",
    "auth_token": Cookies.get("auth_token") || "",
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

        case GET_LOGIN: {
            const login = action.payload
            return {...state, login};
        }

        case ERASE_USER: {
            const login = ""
            const auth_token = ""
            return {...state, login, auth_token};
        }

        default: return state;
    }
}