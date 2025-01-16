import css from "../styles/pages/notFound.module.css"

export default function NotLogged() {
    return (
        <main className={css.main}>
            <div>
                <h1 className={css.title}>401 - Unauthorized</h1>
                <p><a href="/login">Vá para a página de login.</a></p>
            </div>
        </main>
    )
}
