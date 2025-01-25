import React, { createContext, ReactNode, useEffect } from "react";
import LoggedUserContextProps from "../types/interfaces/LoggedUser.interface";
import UserType from "../types/User.type";
import { getCookie } from "../functions/utils/getCookie";
import { setCookie } from "../functions/utils/setCookie";
import UserConnection from "../backend/routes/UserConnection";
import ErrorMessage from "../types/ErrorMessage.type";

const LoggedUserContext = createContext<LoggedUserContextProps>({
    token: undefined,
    user: undefined,
    updateToken: (token: string) => {},
    removeToken: () => {},
    isLog: () => {return false}
})

function LoggedUserProvider(props: { children: ReactNode }) {
    const [token, setToken] = React.useState<string | undefined>(undefined);
    const [user, setUser] = React.useState<UserType | undefined>(undefined);

    function isLog(): boolean {
        const localToken = getCookie('token')
        if (!localToken) {
            window.location.href = "/login"
            return false
        } else {
            return true
        }
    }

    async function getUser() {
        const dataUser: UserType | ErrorMessage = await UserConnection.getUser() 
        if ('message' in dataUser) {
            console.error(dataUser.message)
            return
        }
        setUser(dataUser)
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
        if (localToken) getUser()
    }, [])

    return (
        <LoggedUserContext.Provider value={{ token, user, updateToken, removeToken, isLog }}>
            {props.children}
        </LoggedUserContext.Provider>
    )
}

export { LoggedUserProvider };
export default LoggedUserContext;