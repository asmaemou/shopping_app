import {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null};
    onRegister: (email: string, password: string) => Promise<any>;
    onLogin: (email: string, password: string) => Promise<any>;
    onLogout: () => Promise<any>;
}

const TOKEN_KEY = 'token';
export const API_URL = "https://api.developbetterapps.com"
const AuthContext = createContext<AuthProps>({} as AuthProps);

export const useAuth = ()=> {
    return useContext(AuthContext)
};

export const AuthProvider = ({children}: any) => {
    const [authState, setAuthState] = useState<{        
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: false
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setAuthState({
                    token,
                    authenticated: true
                });
                console.log("Token is now loaded");
                
            }
        }
        loadToken();
    },[]);

    const register = async (email: string, password: string) => {
        try {
            return await axios.post(`${API_URL}/users`, {email, password});
        }
        catch (error) {
            console.log(error);
            return {error: true, msg: (error as any).response.data.msg};
        }
    }

    const login  = async (email: string, password: string) => {
        try {
            const result = await axios.post(`${API_URL}/auth`, {email, password});
            console.log(result)
            setAuthState({token: result.data.token, authenticated: true});
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
            return result.data.token
        }
        catch (error) {
            console.log(error);
            return {error: true, msg: (error as any).response.data.msg};
        }
    }

    const logout  = async () => {
        try {
           await SecureStore.deleteItemAsync(TOKEN_KEY);
           axios.defaults.headers.common['Authorization'] ="";

           setAuthState({token: null, authenticated: false});
        }
        catch (error) {
            console.log(error);
            return {error: true, msg: (error as any).response.data.msg};
        }
    }

    const value = {
      onRegister: register,
      onLogin: login,
      onLogout: logout,
      authState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}