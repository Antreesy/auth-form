import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { TextInput } from "../../Components/TextInput";
import { Loader } from "../../Components/Loader";

import Server from "../../api/Server";

import { RootState } from "../../redux/reducer";
import {
  onChangeMainPagePasswordNew,
  onChangeMainPagePasswordOld,
  onChangeMainPagePasswordRepeat,
  onClearMainPageForm,
} from "../../redux/actions/formActions";
import { eraseUser } from "../../redux/actions/authActions";
import { onChangeMsg } from "../../redux/actions/toastActions";

import c from "./mainpage.module.scss"

const MainPage = () => {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<string>('');
  const store = useSelector((state: RootState) => {return {auth: state.auth, form: state.form}})
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(()=>{
    if (Cookies.get('auth_token') === undefined) navigate("/login")
    else {
      dispatch(onClearMainPageForm())
      setIsPending(false)
    }
  }, [])

  const onChangePasswordOld = (value: string) => {
    dispatch(onChangeMainPagePasswordOld(value))
  }

  const onChangePasswordNew = (value: string) => {
    dispatch(onChangeMainPagePasswordNew(value))
  }

  const onChangePasswordRepeat = (value: string) => {
    dispatch(onChangeMainPagePasswordRepeat(value))
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
      dispatch(eraseUser())
      dispatch(onChangeMsg("Смена пароля успешна. Авторизуйтесь повторно"))
      Cookies.remove("auth_token")
      navigate("/login")
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