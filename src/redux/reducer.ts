import { combineReducers } from "redux";
import { authReducer } from "./reducers/authReducer";
import { formReducer } from "./reducers/formReducer";
import { toastReducer } from "./reducers/toastReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    form: formReducer,
    toast: toastReducer
})

export type RootState = ReturnType<typeof rootReducer>