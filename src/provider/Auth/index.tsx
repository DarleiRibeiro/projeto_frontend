import {createContext, useContext, useEffect, useState} from "react";
import {fakeAuthProvider} from "@pages/App/auth/auth.ts";
import {Navigate, useLocation} from "react-router-dom";
import {Login, LoginAPI, LoginResponse} from "@/infra/integrations/login.ts";

interface AuthContextType {
    user: any;
    signin: (user: Login) => void;
    signout: () => void;
}

// @ts-ignore
const setLocalStorage = (key, value) => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error(e)
    }
}

// @ts-ignore
const getLocalStorage = (key, initialValue) => {
    try {
        const value = window.localStorage.getItem(key);
        return value ? JSON.parse(value) : initialValue;
    } catch (e) {
        return initialValue;
    }
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
    return useContext(AuthContext);
}

const initialState: LoginResponse = {
    access: "",
    email: "",
    refresh: "",
    groups: [""],
    permissions: [""]
};
export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<LoginResponse | null>(() => getLocalStorage("user", initialState));

    const signin = async (user: Login) => {
        const userResponse = await LoginAPI.logar(user)
        if(!userResponse) {
         throw "Error ao logar"
        }
        const {data} = userResponse
        console.log(userResponse)
        console.log('teve erro e foi setado algo em user')
        // @ts-ignore
        setUser(data);
    };

    const signout = () => {
        return fakeAuthProvider.signout(() => {
            setUser(null);
        });
    }

    useEffect(() => {
        setLocalStorage("user", user);
    }, [user]);

    const value = {user, signin, signout};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const RequireAuth = ({children}: { children: JSX.Element }) => {
    const auth = useAuth();
    const location = useLocation();
    if (!auth.user?.access?.length) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }
    return children;
}

