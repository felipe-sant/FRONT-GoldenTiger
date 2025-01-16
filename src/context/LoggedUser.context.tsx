import React, { createContext, ReactNode, useEffect } from "react";
import LoggedUserContextProps from "../types/interfaces/LoggedUser.interface";
import UserType from "../types/User.type";
import { getCookie } from "../functions/utils/getCookie";
import { setCookie } from "../functions/utils/setCookie";

const LoggedUserContext = createContext<LoggedUserContextProps>({
    token: undefined,
    updateToken: (token: string) => {},
    removeToken: () => {},
    isLog: () => {return false}
})

function LoggedUserProvider(props: { children: ReactNode }) {
    const [token, setToken] = React.useState<string | undefined>(undefined);

    function isLog(): boolean {
        const localToken = getCookie('token')
        if (!localToken) {
            window.location.href = "/login"
            return false
        } else {
            return true
        }
    }

    function updateToken(token: string) {
        setToken(token)
        setCookie('token', token, 30)
    }

    function removeToken() {
        setToken("")
        setCookie('token', "", 30)
    } 

    useEffect(() => {
        const localToken = getCookie('token')
        if (localToken) updateToken(localToken)
    }, [])

    return (
        <LoggedUserContext.Provider value={{ token, updateToken, removeToken, isLog }}>
            {props.children}
        </LoggedUserContext.Provider>
    )
}

export { LoggedUserProvider };
export default LoggedUserContext;