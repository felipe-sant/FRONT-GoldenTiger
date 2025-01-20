import React from "react";
import css from "../styles/pages/register.module.css";
import ThemeContext from "../context/Theme.context";
import inputFocus from "../functions/utils/inputFocus";
import loading from "../assets/images/loading.svg"
import view from "../assets/images/view.svg"
import unView from "../assets/images/unView.svg"
import changeViewPassword from "../functions/utils/viewPassword";
import redirect from "../functions/utils/redirect";
import usernameMask from "../functions/utils/usernameMask";

export default function RegisterPage() {
    const { theme } = React.useContext(ThemeContext)
    const [errorMessage, setErrorMessage] = React.useState<string>("")

    const usernameRef = React.useRef<HTMLInputElement>(null)
    const [username, setUsername] = React.useState<string>("")
    const [errorUsername, setErrorUsername] = React.useState<boolean>(false)

    const completeNameRef = React.useRef<HTMLInputElement>(null)
    const [completeName, setCompleteName] = React.useState<string>("")
    const [errorCompleteName, setErrorCompleteName] = React.useState<boolean>(false)

    const passwordRef = React.useRef<HTMLInputElement>(null)
    const [password, setPassword] = React.useState<string>("")
    const [errorPassword, setErrorPassword] = React.useState<boolean>(false)
    const [viewPassword, setViewPassword] = React.useState<boolean>(false)

    const confirmPasswordRef = React.useRef<HTMLInputElement>(null)
    const [confirmPassword, setConfirmPassword] = React.useState<string>("")
    const [errorConfirmPassword, setErrorConfirmPassword] = React.useState<boolean>(false)
    const [viewConfirmPassword, setViewConfirmPassword] = React.useState<boolean>(false)

    const [isRegister, setIsRegister] = React.useState<boolean>(false)

    function clearErrors() {
        setErrorUsername(false)
        setErrorCompleteName(false)
        setErrorPassword(false)
        setErrorConfirmPassword(false)
        setErrorMessage("")
    }

    function enableErrorUsername() {
        setErrorUsername(true)
        inputFocus(usernameRef)
    }

    function enableErrorCompleteName() {
        setErrorCompleteName(true)
        inputFocus(completeNameRef)
    }

    function enableErrorPassword() {
        setErrorPassword(true)
        inputFocus(passwordRef)
    }

    function enableErrorConfirmPassword() {
        setErrorConfirmPassword(true)
        inputFocus(confirmPasswordRef)
    }

    async function register() {
        if (isRegister) return
        setIsRegister(true)
        clearErrors()

        if (username === "") {
            setErrorMessage("Username is required")
            enableErrorUsername()
            setIsRegister(false)
            return
        }

        if (completeName === "") {
            setErrorMessage("Name is required")
            enableErrorCompleteName()
            setIsRegister(false)
            return
        }

        if (password === "") {
            setErrorMessage("Password is required")
            enableErrorPassword()
            setIsRegister(false)
            return
        }

        if (confirmPassword === "") {
            setErrorMessage("Confirm your password")
            enableErrorConfirmPassword()
            setIsRegister(false)
            return
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords are different")
            enableErrorPassword()
            enableErrorConfirmPassword()
            setIsRegister(false)
            return
        }

        console.log("register")
        setIsRegister(false)
    }

    return (
        <main className={css.main + " " + (theme === "dark" ? css.dark : css.light)}>
            <div className={css.wallpaper} />
            <div className={css.tab}>
                <div className={css.header}>
                    <button className={css.back} onClick={() => redirect("login")} />
                    <div className={css.img} />
                </div>
                <div className={css.form}>
                    <div className={css.input}>
                        <label className={css.required}>Nome de Usuário</label>
                        <input
                            type="text"
                            ref={usernameRef}
                            value={username}
                            onChange={(e) => usernameMask(e.target.value, setUsername)}
                            onClick={clearErrors}
                            className={errorUsername ? css.error : ""}
                        />
                    </div>
                    <div className={css.input}>
                        <label className={css.required}>Nome Completo</label>
                        <input
                            type="text"
                            ref={completeNameRef}
                            value={completeName}
                            onChange={(e) => setCompleteName(e.target.value)}
                            onClick={clearErrors}
                            className={errorCompleteName ? css.error : ""}
                        />
                    </div>
                    <div className={css.input}>
                        <label className={css.required}>Senha</label>
                        <input
                            type={viewPassword ? "text" : "password"}
                            ref={passwordRef}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onClick={clearErrors}
                            className={errorPassword ? css.password + " " + css.error : css.password}
                        />
                        <button className={css.viewPassword} onClick={() => changeViewPassword(viewPassword, setViewPassword)}>
                            {viewPassword ? <img src={unView} alt="" /> : <img src={view} alt="" />}
                        </button>
                    </div>
                    <div className={css.input}>
                        <label className={css.required}>Confirmar sua senha</label>
                        <input
                            type={viewConfirmPassword ? "text" : "password"}
                            ref={confirmPasswordRef}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onClick={clearErrors}
                            className={errorConfirmPassword ? css.password + " " + css.error : css.password}
                        />
                        <button className={css.viewPassword} onClick={() => changeViewPassword(viewConfirmPassword, setViewConfirmPassword)}>
                            {viewConfirmPassword ? <img src={unView} alt="" /> : <img src={view} alt="" />}
                        </button>
                    </div>
                </div>
                <div className={css.error}>
                    {errorMessage}
                </div>
                <div className={css.footer}>
                    <a className={css.login} href="/login">Já possui um conta?</a>
                    <button className={css.register} type="submit" onClick={register}>
                        {isRegister ? <img src={loading} alt="" className={css.rotate} /> : <>CADASTRAR</>}
                    </button>
                </div>
            </div>
        </main>
    )
}