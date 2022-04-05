import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { TextInput } from "../../TextInput";
import { Loader } from "../../Loader";

import Server from "../../../Methods/Server";

import { RootState } from "../../../Store/reducer";
import { ERASE_TOKEN } from "../../../Store/authActions";
import { CLEAR_MAINPAGE_FORM, SAVE_MAINPAGE_PASSWORD_NEW, SAVE_MAINPAGE_PASSWORD_OLD, SAVE_MAINPAGE_PASSWORD_REPEAT } from "../../../Store/formActions";

import c from "./mainpage.module.scss"

const MainPage = () => {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const store = useSelector((state: RootState) => {return {auth: state.auth, form: state.form}})
  const dispatch = useDispatch();

  useEffect(()=>{
    Server.authorizeUser(store.auth.auth_token).then((resolve) => {
      if (resolve) {
        dispatch({
          type: CLEAR_MAINPAGE_FORM
        })
        setTimeout(()=> {
          setIsPending(false);
        }, 100)
      }
      else navigate('/login');
    })
  }, [store.auth.auth_token])

  const onChangePasswordOld = (value: string) => {
    dispatch({
      type: SAVE_MAINPAGE_PASSWORD_OLD,
      payload: value,
    }) 
  }

  const onChangePasswordNew = (value: string) => {
    dispatch({
      type: SAVE_MAINPAGE_PASSWORD_NEW,
      payload: value,
    }) 
  }

  const onChangePasswordRepeat = (value: string) => {
    dispatch({
      type: SAVE_MAINPAGE_PASSWORD_REPEAT,
      payload: value,
    }) 
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    Server.checkCorrectPassword(store.auth.auth_token, store.form.mainPage_password_old).then((resolve) => {
      if (!resolve) {
        setError("Старый пароль введен неверно")
        return;
      }

      if (store.form.mainPage_password_new !== store.form.mainPage_password_repeat) {
        setError("Пароли не совпадают")
        return;
      }

      Server.changePassword(store.auth.auth_token, store.form.mainPage_password_new);
      dispatch({
        type: ERASE_TOKEN,
      })
      setError("")
      navigate('/login');
    })
  }

  return (
  <div className={c.main_page}>
      <h3 className={c.caption}>MAIN PAGE</h3>
      {isPending && <Loader />}
      { !isPending &&
      <div className={c.form}>
        <h4 className={c.descr}>Смена пароля</h4>
        <form className={c.login_form} onSubmit={handleSubmit}>
          <TextInput
            label="Старый пароль"
            type="password"
            placeholder="Old password"
            value={store.form.mainPage_password_old}
            onChange={onChangePasswordOld}
            validateRules={['password']}
          />

          <TextInput
            label="Новый пароль"
            type="password"
            placeholder="New password"
            value={store.form.mainPage_password_new}
            onChange={onChangePasswordNew}
            validateRules={['password']}
          />

          <TextInput
            label="Повторите пароль"
            type="password"
            placeholder="Repeat password"
            value={store.form.mainPage_password_repeat}
            onChange={onChangePasswordRepeat}
            validateRules={['password']}
          />

          {error && <p className={c.error_caption}>{error}</p>}
          <button className={c.button} type="submit">Сменить пароль</button>
        </form>
      </div>
      }
      
  </div> 
  );
}

export default MainPage;