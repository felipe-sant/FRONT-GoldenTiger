import { LoggedUserProvider } from "./context/LoggedUser.context";
import { ThemeProvider } from "./context/Theme.context";
import Routers from "./routers/Router";
import "./styles/global.css";

function App() {
  return (
    <ThemeProvider>
      <LoggedUserProvider>
        <Routers />
      </LoggedUserProvider>
    </ThemeProvider>
  );
}

export default App;
