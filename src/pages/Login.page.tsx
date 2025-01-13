import React from "react"
import css from "../styles/pages/login.module.css"
import changeViewPassword from "../functions/utils/viewPassword"
import view from "../assets/images/view.svg"
import unView from "../assets/images/unView.svg"
import usernameMask from "../functions/utils/usernameMask"

export default function LoginPage() {
    const [username, setUsername] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const [viewPassword, setViewPassword] = React.useState<boolean>(false)

    return (
        <main className={css.main}>
            <div className={css.wallpaper} />
            <div className={css.tab}>
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
                    <div className={css.buttons}>
                        <a className={css.register} href="/">CADASTRAR</a>
                        <button className={css.login} type="submit">ENTRAR</button>
                    </div>
                </div>
            </div>
        </main>
    )
}