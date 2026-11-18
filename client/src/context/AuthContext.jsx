/**
 * authentication context
 * keeps the logged in user and the JWT for the whole app, and gives login, logout and loading to any component through useAuth()
 */

import { createContext, useContext, useState, useEffect } from 'react'
import api, { TOKEN_KEY, USER_KEY } from '../api/axios'
import { saveLastLogin } from '../utils/lastLoginCookie'

const AuthContext = createContext();

// provider component that keeps the logged in user and shares login/logout with all the app
// parameters; children, the components that will be able to use the auth data
// Returns the context provider with the values: user, login, logout, loading
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
    // saves the user and the JWT after a successful login or register
    // parameters; userData, the public user data from the server
    //             token, the JWT that the server created
    // Returns nothing
    const login = (userData, token)=>{
        setUser(userData);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        localStorage.setItem(TOKEN_KEY, token);
        saveLastLogin(userData); // remember this login in a cookie for 7 days
    };
    
    // logout clears the token and the user
    // removes the user and the token from the state and from the browser
    // parameters; none
    // Returns nothing
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

// custom hook to read the auth data from any component
// parameters; none
// Returns object {user, login, logout, loading}, and throws an error if used outside the AuthProvider
export function useAuth(){
    const value = useContext(AuthContext);
    if (!value) throw new Error('useAuth must be used inside AuthProvider');
    return value;
}
