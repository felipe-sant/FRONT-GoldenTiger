import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import LoginPage from "../pages/Login.page";
import RegisterPage from "../pages/Register.page";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />
      </Switch>
    </BrowserRouter>
  );
}