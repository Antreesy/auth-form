import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { TextInput } from "../../TextInput";
import { Loader } from "../../Loader";

import Server from "../../../Methods/Server";

import { RootState } from "../../../Store/reducer";
import { GET_TOKEN } from "../../../Store/authActions";
import { SAVE_LOGINPAGE_LOGIN, SAVE_LOGINPAGE_PASSWORD } from "../../../Store/formActions";

import c from "./loginpage.module.scss"

const LoginPage = () => {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<string>("")
  const navigate = useNavigate();
  const store = useSelector((state: RootState) => {return {auth: state.auth, form: state.form}})
  const dispatch = useDispatch();

  useEffect(()=>{
    Server.authorizeUser(store.auth.auth_token).then((resolve) => {
      if (!resolve) {
        setTimeout(()=> {
          setIsPending(false);
        }, 100)
      }
      else navigate('/');
    })
  }, [store.auth.auth_token])

  const onChangeLogin = (value: string) => {
    dispatch({
      type: SAVE_LOGINPAGE_LOGIN,
      payload: value,
    }) 
  }

  const onChangePassword = (value: string) => {
    dispatch({
      type: SAVE_LOGINPAGE_PASSWORD,
      payload: value,
    }) 
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    Server.authenticateUser(store.form.loginPage_login, store.form.loginPage_password).then((resolve) => {
      if (!resolve) setError("Проверьте введённые данные")

      dispatch({
        type: GET_TOKEN,
        payload: resolve,
      })
    })
  }
  
  return (
    <div className={c.login_page}>
      <h3 className={c.caption}>LOGIN PAGE</h3>
      {isPending && <Loader />}
      {!isPending && 
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
      }
    </div>
  );
}

export default LoginPage;