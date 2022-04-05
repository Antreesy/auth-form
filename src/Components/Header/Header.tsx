import React from "react";
import { AuthStatus } from "../AuthStatus";

import c from "./header.module.scss"

const Header = () => {
    return (
        <header className={c.header}>
            <div className={c.container}>
                <h1 className={c.caption}>CiPlay test task</h1>
                <AuthStatus />
            </div>
        </header>
    );
}

export default Header;