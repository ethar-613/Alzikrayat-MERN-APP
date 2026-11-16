import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser]  = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const stored = localStorage.getItem('alzikrayat_user');
        if(stored){
            try{
                setUser(JSON.parse(stored));
            } catch{
                localStorage.removeItem('alzikrayat_user');
            }
        }
        setLoading(false);
    }, []);

    const login = (userData)=>{
        setUser(userData);
        localStorage.setItem('alzikrayat_user', JSON.stringify(userData));
    };
    
    const logout = ()=>{
        setUser(null);
        localStorage.removeItem('alzikrayat_user');
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