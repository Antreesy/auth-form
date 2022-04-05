import Utils from "../Methods/Utils";
import {
    SAVE_LOGINPAGE_LOGIN,
    SAVE_LOGINPAGE_PASSWORD,
    SAVE_REGISTERPAGE_LOGIN,
    SAVE_REGISTERPAGE_PASSWORD,
    SAVE_REGISTERPAGE_PASSWORD_REPEAT,
    SAVE_MAINPAGE_PASSWORD_OLD,
    SAVE_MAINPAGE_PASSWORD_NEW,
    SAVE_MAINPAGE_PASSWORD_REPEAT,
    CLEAR_MAINPAGE_FORM,
} from "./formActions";

const initialState = {
    "loginPage_login": "",
    "loginPage_password": "",

    "registerPage_login": "",
    "registerPage_password": "",
    "registerPage_password_repeat": "",

    "mainPage_password_old": "",
    "mainPage_password_new": "",
    "mainPage_password_repeat": "",
}

interface IActionType {
    type: string,
    payload: string,
}

export const formReducer = (state = initialState, action: IActionType ) => {
    switch (action.type) {

        case SAVE_LOGINPAGE_LOGIN: {
            const loginPage_login = action.payload
            return {...state, loginPage_login};
        }

        case SAVE_LOGINPAGE_PASSWORD: {
            const loginPage_password = action.payload
            return {...state, loginPage_password};
        }

        case SAVE_REGISTERPAGE_LOGIN: {
            const registerPage_login = action.payload
            return {...state, registerPage_login};
        }

        case SAVE_REGISTERPAGE_PASSWORD: {
            const registerPage_password = action.payload
            return {...state, registerPage_password};
        }

        case SAVE_REGISTERPAGE_PASSWORD_REPEAT: {
            const registerPage_password_repeat = action.payload
            return {...state, registerPage_password_repeat};
        }

        case SAVE_MAINPAGE_PASSWORD_OLD: {
            const mainPage_password_old = action.payload
            return {...state, mainPage_password_old};
        }

        case SAVE_MAINPAGE_PASSWORD_NEW: {
            const mainPage_password_new = action.payload
            return {...state, mainPage_password_new};
        }

        case SAVE_MAINPAGE_PASSWORD_REPEAT: {
            const mainPage_password_repeat = action.payload
            return {...state, mainPage_password_repeat};
        }
        
        case CLEAR_MAINPAGE_FORM: {
            const mainPage_password_old = "";
            const mainPage_password_new = "";
            const mainPage_password_repeat = "";
            return {...state, mainPage_password_old, mainPage_password_new, mainPage_password_repeat};
        }

        default: return state;
    }
}