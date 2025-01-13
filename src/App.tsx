import { ThemeProvider } from "./context/Theme.context";
import Routers from "./routers/Router";
import "./styles/global.css";

function App() {
  return (
    <ThemeProvider>
      <Routers />
    </ThemeProvider>
  );
}

export default App;
