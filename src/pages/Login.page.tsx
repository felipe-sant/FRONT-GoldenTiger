import React from "react"
import css from "../styles/pages/login.module.css"
import changeViewPassword from "../functions/utils/viewPassword"
import view from "../assets/images/view.svg"
import unView from "../assets/images/unView.svg"
import usernameMask from "../functions/utils/usernameMask"
import ThemeContext from "../context/Theme.context"
import UserConnection from "../backend/routes/UserConnection"
import LoggedUserContext from "../context/LoggedUser.context"

export default function LoginPage() {
    const { theme } = React.useContext(ThemeContext);
    const { updateToken } = React.useContext(LoggedUserContext)
    const [username, setUsername] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const [viewPassword, setViewPassword] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<string>()

    async function login() {
        if (username === "") {
            setErrorMessage("Username is required")
            return
        }
        if (password === "") {
            setErrorMessage("Password is required")
            return
        }
        const response = await UserConnection.loginUser(username, password) as any
        if (response.token) {
            updateToken(response.token)
            window.location.href = "/"
        } else {
            setErrorMessage(response.message)
        }
    }

    return (
        <main className={css.main}>
            <div className={css.wallpaper} />
            <div className={css.tab  + " " + (theme === "dark" ? css.dark : css.light)}>
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
                        <label htmlFor="username">Nome de Usuário</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => usernameMask(e.target.value, setUsername)}
                        />
                    </div>
                    <div className={css.field}>
                        <label htmlFor="username">Senha</label>
                        <input
                            id="password"
                            type={viewPassword ? "text" : "password"}
                            className={css.password}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                        <button className={css.login} type="submit" onClick={login}>ENTRAR</button>
                    </div>
                </div>
            </div>
        </main>
    )
}