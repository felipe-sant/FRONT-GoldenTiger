import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import LoginPage from "../pages/Login.page";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Switch>
    </BrowserRouter>
  );
}