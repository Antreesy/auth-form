import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { TextInput } from "../../Components/TextInput";

import Server from "../../api/Server";

import { RootState } from "../../redux/reducer";
import {
  onChangeRegisterPageLogin,
  onChangeRegisterPagePassword,
  onChangeRegisterPagePasswordRepeat
} from "../../redux/actions/formActions";

import c from "./registerpage.module.scss"
import Cookies from "js-cookie";
import { onChangeMsg } from "../../redux/actions/toastActions";

const RegisterPage = () => {
  const [error, setError] = useState<string>("")
  const navigate = useNavigate();
  const store = useSelector((state: RootState) => {return {auth: state.auth, form: state.form}})
  const dispatch = useDispatch();

  useEffect(()=>{
    if (Cookies.get('auth_token') !== undefined) navigate("/main")
  })

  const onChangeLogin = (value: string) => {
    dispatch(onChangeRegisterPageLogin(value))
  }

  const onChangePassword = (value: string) => {
    dispatch(onChangeRegisterPagePassword(value))
  }

  const onChangePasswordRepeat = (value: string) => {
    dispatch(onChangeRegisterPagePasswordRepeat(value))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (store.form.registerPage_password !== store.form.registerPage_password_repeat) {
      setError("Пароли не совпадают")
      return;
    }

    Server.checkUniqueLogin(store.form.registerPage_login).then((resolve) => {

      if (!resolve) {
        setError("Логин уже существует")
        return;
      }

      Server.createNewUser(store.form.registerPage_login, store.form.registerPage_password);
      dispatch(onChangeMsg("Новый пользователь создан. Авторизуйтесь для входа"))
      navigate('/login');
    })
  }
  
    return (
      <div className={c.register_page}>
        <h3 className={c.caption}>REGISTER PAGE</h3>
        <div className={c.form}>
          <h4 className={c.descr}>Зарегистрируйтесь, чтобы продолжить</h4>

          <form className={c.login_form} onSubmit={handleSubmit}>
            <TextInput
              label="Логин (E-mail)"
              type="text"
              placeholder="E-mail"
              value={store.form.registerPage_login}
              onChange={onChangeLogin}
              validateRules={['required','eMail']}
            />

            <TextInput
              label="Пароль"
              type="password"
              placeholder="Password"
              value={store.form.registerPage_password}
              onChange={onChangePassword}
              validateRules={['password']}
            />

            <TextInput
              label="Повторите пароль"
              type="password"
              placeholder="Repeat password"
              value={store.form.registerPage_password_repeat}
              onChange={onChangePasswordRepeat}
              validateRules={['password']}
            />

            {error && <p className={c.error_caption}>{error}</p>}
            <button className={c.button} type="submit">Войти</button>
            <p className={c.message}>Уже зарегистрированы? 
              <Link to="/login">
                Войти
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }

  export default RegisterPage;