import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { TextInput } from "../../TextInput";
import { Loader } from "../../Loader";

import Server from "../../../Methods/Server";

import { RootState } from "../../../Store/reducer";
import { SAVE_REGISTERPAGE_LOGIN, SAVE_REGISTERPAGE_PASSWORD, SAVE_REGISTERPAGE_PASSWORD_REPEAT } from "../../../Store/formActions";

import c from "./registerpage.module.scss"

const RegisterPage = () => {
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
      type: SAVE_REGISTERPAGE_LOGIN,
      payload: value,
    }) 
  }

  const onChangePassword = (value: string) => {
    dispatch({
      type: SAVE_REGISTERPAGE_PASSWORD,
      payload: value,
    }) 
  }

  const onChangePasswordRepeat = (value: string) => {
    dispatch({
      type: SAVE_REGISTERPAGE_PASSWORD_REPEAT,
      payload: value,
    }) 
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
      
      setError("")
      navigate('/login');
    })
  }
  
    return (
      <div className={c.register_page}>
        <h3 className={c.caption}>REGISTER PAGE</h3>
        {isPending && <Loader />}
        {!isPending && 
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
              <p className={c.message}>Не зарегистрированы? 
                <Link to="/login">
                  Войти
                </Link>
              </p>
            </form>
          </div>
        }
      </div>
    );
  }

  export default RegisterPage;