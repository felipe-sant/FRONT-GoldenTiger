import React from "react"
import css from "../styles/pages/login.module.css"
import changeViewPassword from "../functions/utils/viewPassword"
import view from "../assets/images/view.svg"
import unView from "../assets/images/unView.svg"
import usernameMask from "../functions/utils/usernameMask"
import ThemeContext from "../context/Theme.context"
import UserConnection from "../backend/routes/UserConnection"
import LoggedUserContext from "../context/LoggedUser.context"
import loading from "../assets/images/loading.svg"
import inputFocus from "../functions/utils/inputFocus"

export default function LoginPage() {
    const { theme } = React.useContext(ThemeContext);
    const { updateToken } = React.useContext(LoggedUserContext)
    const usernameRef = React.useRef<HTMLInputElement>(null)
    const [username, setUsername] = React.useState<string>("")
    const [errorUsername, setErrorUsername] = React.useState<boolean>(false)
    const passwordRef = React.useRef<HTMLInputElement>(null)
    const [password, setPassword] = React.useState<string>("")
    const [errorPassword, setErrorPassword] = React.useState<boolean>(false)
    const [viewPassword, setViewPassword] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<string>()
    const [isLogin, setIsLogin] = React.useState<boolean>(false)

    function clearErrors() {
        setErrorUsername(false)
        setErrorPassword(false)
        setErrorMessage("")
    }

    function enableErrorUsername() {
        setErrorUsername(true)
        inputFocus(usernameRef)
    }

    function enableErrorPassword() {
        setErrorPassword(true)
        inputFocus(passwordRef)
    }

    async function login() {
        if (isLogin) return
        setIsLogin(true)
        clearErrors()

        if (username === "") {
            setErrorMessage("Username is required")
            enableErrorUsername()
            setIsLogin(false)
            return
        }

        if (password === "") {
            setErrorMessage("Password is required")
            enableErrorPassword()
            setIsLogin(false)
            return
        }

        const response = await UserConnection.loginUser(username, password) as any
        if (response.token) {
            updateToken(response.token)
            window.location.href = "/"
        } else {
            setErrorMessage(response.message)
            if (response.message === "User not found") enableErrorUsername()
            if (response.message === "Password is incorrect") enableErrorPassword()
            setIsLogin(false)
        }
    }

    return (
        <main className={css.main}>
            <div className={css.wallpaper} />
            <div className={css.tab + " " + (theme === "dark" ? css.dark : css.light)}>
                <div className={css.logo}>
                    <div className={css.img} />
                    <div className={css.text}>
                        <h1>Golden Tiger</h1>
                        <div className={css.line + " " + css.one} />
                        <div className={css.line + " " + css.two} />
                    </div>
                </div>
                <div className={css.form}>
                    <div className={css.field}>
                        <label>Nome de Usuário</label>
                        <input
                            type="text"
                            value={username}
                            className={errorUsername ? css.error : ""}
                            onChange={(e) => usernameMask(e.target.value, setUsername)}
                            ref={usernameRef}
                            onClick={clearErrors}
                        />
                    </div>
                    <div className={css.field}>
                        <label>Senha</label>
                        <input
                            id="password"
                            type={viewPassword ? "text" : "password"}
                            className={errorPassword ? css.password + " " + css.error : css.password}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            ref={passwordRef}
                            onClick={clearErrors}
                        />
                        <button className={css.viewPassword} onClick={() => changeViewPassword(viewPassword, setViewPassword)}>
                            {viewPassword ? <img src={unView} alt="" /> : <img src={view} alt="" />}
                        </button>
                        <a href="/">Esqueceu a senha?</a>
                    </div>
                    <div className={css.error}>
                        {errorMessage}
                    </div>
                    <div className={css.buttons}>
                        <a className={css.register} href="/register">CADASTRAR</a>
                        <button className={css.login} type="submit" onClick={login}>
                            {isLogin ? <img src={loading} alt="" className={css.rotate} /> : <>ENTRAR</>}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}