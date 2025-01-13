import React, { createContext, ReactNode, useEffect } from "react";
import { getCookie } from "../functions/utils/getCookie";
import { setCookie } from "../functions/utils/setCookie";
import ThemeContextProps from "../types/interfaces/Theme.interface";
import Theme from "../types/Theme.type";

const ThemeContext = createContext<ThemeContextProps>({
    theme: 'light',
    toggleTheme: () => {},
});

function ThemeProvider(props: { children: ReactNode }) {
    const [ theme, setTheme ] = React.useState<Theme>('light');

    useEffect(() => {
        const theme = getCookie('theme');
        if (theme === "light"|| theme === "dark") setTheme(theme);
    }, [])

    function toggleTheme() {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        setCookie('theme', newTheme, 30);
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export { ThemeProvider };
export default ThemeContext;