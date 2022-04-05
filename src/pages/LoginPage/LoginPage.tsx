import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Cookies from "js-cookie"

import { TextInput } from "../../Components/TextInput";

import Server from "../../api/Server";

import { RootState } from "../../redux/reducer";
import { getToken } from "../../redux/actions/authActions";
import {
  onChangeLoginPageLogin,
  onChangeLoginPagePassword,
} from "../../redux/actions/formActions";

import c from "./loginpage.module.scss"
import { onChangeMsg } from "../../redux/actions/toastActions";

const LoginPage = () => {
  const [error, setError] = useState<string>("")
  const navigate = useNavigate();
  const store = useSelector((state: RootState) => {return {auth: state.auth, form: state.form}})
  const dispatch = useDispatch();

  useEffect(()=>{
    if (Cookies.get('auth_token') !== undefined) navigate("/main")
  })

  const onChangeLogin = (value: string) => {
    dispatch(onChangeLoginPageLogin(value))
  }

  const onChangePassword = (value: string) => {
    dispatch(onChangeLoginPagePassword(value))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    Server.authenticateUser(store.form.loginPage_login, store.form.loginPage_password).then((resolve) => {
      if (!resolve) setError("Проверьте введённые данные")

      dispatch(getToken(resolve));
      Cookies.set("auth_token", resolve)
      dispatch(onChangeMsg("Авторизация успешна"))
    })
  }
  
  return (
    <div className={c.login_page}>
      <h3 className={c.caption}>LOGIN PAGE</h3>
      <div className={c.form}>
        <h4 className={c.descr}>Авторизуйтесь, чтобы продолжить</h4>

        <form className={c.login_form} onSubmit={handleSubmit}>
            <TextInput
              label="Логин (E-mail)"
              type="text"
              placeholder="E-mail"
              value={store.form.loginPage_login}
              onChange={onChangeLogin}
              validateRules={['required','eMail']}
            />

            <TextInput
              label="Пароль"
              type="password"
              placeholder="Password"
              value={store.form.loginPage_password}
              onChange={onChangePassword}
              validateRules={['password']}
            />

          {error && <p className={c.error_caption}>{error}</p>}
          <button className={c.button} type="submit">Войти</button>
          <p className={c.message}>Не зарегистрированы? 
            <Link to="/register">
              Создайте аккаунт
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;