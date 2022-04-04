import * as React from "react";

import AuthStatus from "./AuthStatus/AuthStatus";

import { useAuth } from "../../Methods/UseAuth";

import c from "./header.module.scss"
import { Dropdown } from "../Dropdown";
import { Link } from "react-router-dom";

const Header = () => {
    const auth = useAuth();

    return (
    <header className={c.header}>
        <div className={c.container}>
            <div className={c.flexwrapper}>
                <h1 className={c.caption}>CiPlay test task</h1>
                <Dropdown button={<button>dropdown</button>}>
                    <ul>
                        <li><Link to='/login'>Login page</Link></li>
                        <li><Link to='/register'>Register page</Link></li>
                        <li><Link to='/'>Main page</Link></li>
                    </ul>
                </Dropdown>
            </div>

            {auth.user && 
                <>
                    <AuthStatus />
                </>
            }
        </div>
    </header>);
}

export default Header;