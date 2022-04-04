import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Methods/UseAuth";
import { ERASE_TOKEN } from "../../../Store/authActions";

import c from "./authstatus.module.scss"

const AuthStatus = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
      <p className={c.user}>
        Пользователь: {auth.user}{" "}
        <button
          className={c.signout}
          onClick={() => {
            dispatch({
              type: ERASE_TOKEN,
            })
            auth.signout(() => navigate("/login"));
          }}
        >
          Выйти
        </button>
      </p>
    );
  }

  export default AuthStatus