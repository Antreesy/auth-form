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
} from "../consts/form"

const onChangeLoginPageLogin = (value: string) => {
    return {
         type: SAVE_LOGINPAGE_LOGIN,
         payload: value,
     }
};

const onChangeLoginPagePassword = (value: string) => {
    return {
         type: SAVE_LOGINPAGE_PASSWORD,
         payload: value,
     }
};

const onChangeRegisterPageLogin = (value: string) => {
    return {
         type: SAVE_REGISTERPAGE_LOGIN,
         payload: value,
     }
};

const onChangeRegisterPagePassword = (value: string) => {
    return {
         type: SAVE_REGISTERPAGE_PASSWORD,
         payload: value,
     }
};

const onChangeRegisterPagePasswordRepeat = (value: string) => {
    return {
         type: SAVE_REGISTERPAGE_PASSWORD_REPEAT,
         payload: value,
     }
};

const onChangeMainPagePasswordOld = (value: string) => {
    return {
         type: SAVE_MAINPAGE_PASSWORD_OLD,
         payload: value,
     }
};

const onChangeMainPagePasswordNew = (value: string) => {
    return {
         type: SAVE_MAINPAGE_PASSWORD_NEW,
         payload: value,
     }
};

const onChangeMainPagePasswordRepeat = (value: string) => {
    return {
         type: SAVE_MAINPAGE_PASSWORD_REPEAT,
         payload: value,
     }
};

const onClearMainPageForm = () => {
    return {
         type: CLEAR_MAINPAGE_FORM,
     }
};

export {
    onChangeLoginPageLogin,
    onChangeLoginPagePassword,
    onChangeRegisterPageLogin,
    onChangeRegisterPagePassword,
    onChangeRegisterPagePasswordRepeat,
    onChangeMainPagePasswordOld,
    onChangeMainPagePasswordNew,
    onChangeMainPagePasswordRepeat,
    onClearMainPageForm,
}