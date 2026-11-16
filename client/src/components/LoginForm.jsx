import { useState } from "react";
import {useAuth}  from "../context/AuthContext";

function LoginForm({onLoginSuccess}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError('');
        setLoading(true);
        try{
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.errors?.[0] || 'Login Failed');

            login(data.user);
            if(onLoginSuccess) onLoginSuccess();

        } 
        catch(err){
            setError(err.message);
        }
        finally{
            setLoading(false);
        }
    };

    return(
        <form onSubmit={handleSubmit} className="auth-login-Form">
            <input name="email" type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} autoComplete="email"  required />
            <input name="password" type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} autoComplete="current-password"  required />

            {error && <p className="error">{error}</p>}

            <button type="submit" disabled={loading} className="btn-primary">
                {loading? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
}

export default LoginForm;