import { createContext, useContext, useState, useEffect } from 'react'
import api, { TOKEN_KEY, USER_KEY } from '../api/axios'

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser]  = useState(null);
    const [loading, setLoading] = useState(true);

    // when the app starts: if there is a saved token, ask the server if it is still valid
    useEffect(()=>{
        const token = localStorage.getItem(TOKEN_KEY);
        if(!token){
            localStorage.removeItem(USER_KEY);
            setLoading(false);
            return;
        }

        api.get('/auth/me')
            .then((res)=>{
                setUser(res.data.user);
                localStorage.setItem(USER_KEY, JSON.stringify(res.data.user));
            })
            .catch((err)=>{
                // only clear the session if the token is rejected, not when the server is just offline
                if(err.response?.status === 401){
                    localStorage.removeItem(TOKEN_KEY);
                    localStorage.removeItem(USER_KEY);
                } else {
                    const stored = localStorage.getItem(USER_KEY);
                    if(stored){
                        try{ setUser(JSON.parse(stored)); } catch{ localStorage.removeItem(USER_KEY); }
                    }
                }
            })
            .finally(()=> setLoading(false));
    }, []);

    // called after a successful login or register, saves the user and the JWT token
    const login = (userData, token)=>{
        setUser(userData);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        localStorage.setItem(TOKEN_KEY, token);
    };
    
    // logout clears the token and the user
    const logout = ()=>{
        setUser(null);
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
    };
    
    return (
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    const value = useContext(AuthContext);
    if (!value) throw new Error('useAuth must be used inside AuthProvider');
    return value;
}
