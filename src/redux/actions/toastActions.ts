import {CHANGE_MESSAGE} from "../consts/toast";

const onChangeMsg = (value: string) => {
   return {
        type: CHANGE_MESSAGE,
        payload: value,
    }
};

export {onChangeMsg}