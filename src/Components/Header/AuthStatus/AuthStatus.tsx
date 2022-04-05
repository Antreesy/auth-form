import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Server from "../../../Methods/Server";

import { RootState } from "../../../Store/reducer";
import { ERASE_TOKEN, GET_LOGIN, ERASE_LOGIN } from "../../../Store/authActions";

import c from "./authstatus.module.scss"

const AuthStatus = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const store = useSelector((state: RootState) => state.auth)

    useEffect(()=>{
      Server.getUserData(store.auth_token).then((resolve) => {
        if (!resolve) {
          return;
        }
        dispatch({
          type: GET_LOGIN,
          payload: resolve.login
        })
      })
      return () => {
        dispatch({
          type: ERASE_LOGIN,
        });
      }
    }, [store.auth_token])

    return (
      <p className={c.user}>
        Пользователь: {store.login}{" "}
        <button
          className={c.signout}
          onClick={() => {
            dispatch({
              type: ERASE_TOKEN,
            });
            navigate("/login");
          }}
        >
          Выйти
        </button>
      </p>
    );
  }

  export default AuthStatus