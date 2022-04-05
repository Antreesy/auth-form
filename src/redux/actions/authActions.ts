import {GET_TOKEN, GET_LOGIN, ERASE_USER} from "../consts/auth";

const getToken = (value: string) => {
   return {
        type: GET_TOKEN,
        payload: value,
    }
};

const getLogin = (value: string) => {
    return {
        type: GET_LOGIN,
        payload: value,
    }
};

const eraseUser = () => {
    return {
        type: ERASE_USER,
    }
};


export {getToken, getLogin, eraseUser}