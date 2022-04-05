import { CHANGE_MESSAGE } from "../consts/toast";

const initialState = {
    "message": "",
}

interface IActionType {
    type: string,
    payload: string,
}

export const toastReducer = (state = initialState, action: IActionType ) => {
    switch (action.type) {

        case CHANGE_MESSAGE: {
            const message = action.payload
            return {...state, message};
        }

        default: return state;
    }
}