import React, { useEffect } from "react"
import LoggedUserContext from "../context/LoggedUser.context"
import css from "../styles/pages/home.module.css"
import NotLogged from "./NotLogged"

function Home() {
    const { isLog, token, removeToken } = React.useContext(LoggedUserContext)

    if (!isLog()) return <NotLogged />

    function teste() {
        console.log(token)
    }

    return (
        <main className={css.main}>
            <h1>Hello world</h1>
            <button onClick={teste}>Teste</button>
            <button onClick={removeToken}>removeToken</button>
            <a href="/login">pagina de login</a>
        </main>
    )
}

export default Home