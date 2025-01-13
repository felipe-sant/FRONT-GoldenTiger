import React from "react"
import css from "../styles/pages/login.module.css"

export default function LoginPage() {
    const [username, setUsername] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const [viewPassword, setViewPassowrd] = React.useState<boolean>(false)

    return (
        <main className={css.main}>
            <div className={css.wallpaper}>
                <img src="" alt="wallpaper" />
            </div>
            <div className={css.tab}>
                <div className={css.logo}>
                    <div className={css.img}>
                        <img src="" alt="logotype" />
                    </div>
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
                        />
                    </div>
                    <div className={css.field}>
                        <label htmlFor="username">Senha</label>
                        <input
                            id="password" 
                            type={viewPassword ? "text" : "password"}
                            className={css.password}
                        />
                        <button className={css.viewPassword} onClick={() => setViewPassowrd(!viewPassword)}>
                            <img src="" alt=" "/>
                        </button>
                        <a href="">Esqueceu a senha?</a>
                    </div>
                    <div className={css.buttons}>
                        <a className={css.register} href="">CADASTRAR</a>
                        <button className={css.login} type="submit">ENTRAR</button>
                    </div>
                </div>
            </div>
        </main>
    )
}