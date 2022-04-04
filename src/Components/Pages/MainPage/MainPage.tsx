import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { RootState } from "../../../Store/reducer";

import c from "./mainpage.module.scss"

const MainPage = () => {

  const location = useLocation();
  const store = useSelector((state: RootState) => state.auth)

  
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleClick = () => {}
  
  const error = false;

  if (!store.auth_token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
  <div className={c.main_page}>
      <h4 className={c.descr}>Смена пароля</h4>
      <div className={c.form}>
        <form className={c.login_form}>
          <label className={c.label}>
            <span className={c.labeltext}>Старый пароль</span>
            <input type="password" name="password" placeholder="Old password"/>
          </label>
          <label className={c.label}>
            <span className={c.labeltext}>Новый пароль</span>
            <input type="password" name="password" placeholder="New password"/>
          </label>
          <label className={c.label}>
            <span className={c.labeltext}>Повторите пароль</span>
            <input type="password" name="password" placeholder="Repeat password"/>
          </label>
          {error && <p className={c.error_caption}>Проверьте введёные данные</p>}
          <button type="submit">Сменить пароль</button>
        </form>
      </div>
    </div> );
}

export default MainPage;