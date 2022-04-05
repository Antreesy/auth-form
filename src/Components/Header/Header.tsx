import React from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { AuthStatus } from "./AuthStatus";
import { Dropdown } from "../Dropdown";

import { RootState } from "../../Store/reducer";

import c from "./header.module.scss"

const Header = () => {

    const store = useSelector((state: RootState) => state.auth)

    return (
    <header className={c.header}>
        <div className={c.container}>
            <div className={c.flexwrapper}>
                <Dropdown>
                    <li  className={c.listItem}><Link to='/login'>Login page</Link></li>
                    <li  className={c.listItem}><Link to='/register'>Register page</Link></li>
                    <li  className={c.listItem}><Link to='/'>Main page</Link></li>
                </Dropdown>
                <h1 className={c.caption}>CiPlay test task</h1>
            </div>

            {store.auth_token && <AuthStatus /> }
        </div>
    </header>);
}

export default Header;