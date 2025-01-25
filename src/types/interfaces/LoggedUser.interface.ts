import UserType from "../User.type";

interface LoggedUserContextProps {
    token?: string;
    user?: UserType;
    updateToken: (token: string) => void;
    removeToken: () => void;
    isLog: () => boolean;
}

export default LoggedUserContextProps