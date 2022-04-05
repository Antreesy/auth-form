import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { Dropdown } from "../Dropdown";

import Server from "../../api/Server";

import { RootState } from "../../redux/reducer";
import { getLogin, eraseUser } from "../../redux/actions/authActions";

import c from "./authstatus.module.scss"
import { onChangeMsg } from "../../redux/actions/toastActions";

const AuthStatus = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const store = useSelector((state: RootState) => state.auth)

    useEffect(()=>{
      Server.getUserData(store.auth_token).then((resolve) => {
        if (!resolve) {
          dispatch(eraseUser())
          return;
        }
        dispatch(getLogin(resolve.login))
      })
    }, [store.auth_token])

    const handleClick = () => {
      dispatch(eraseUser())
      Cookies.remove("auth_token")
      dispatch(onChangeMsg("Выход из системы"))
      navigate("/login")
    }

    return (
      <div className={c.flexWrapper}>
        <p className={c.user}>
           {store.login ? `Пользователь: ${store.login}` : "Вход не выполнен"}
        </p>
        <Dropdown>
          <li className={c.listItem}><Link to='/login'>Login page</Link></li>
          <li className={c.listItem}><Link to='/register'>Register page</Link></li>
          <li className={c.listItem}><Link to='/main'>Main page</Link></li>
          <li className={c.listItem}><Link onClick={handleClick} to='/login'>Log out</Link></li>
        </Dropdown>
      </div>
    );
  }

  export default AuthStatus