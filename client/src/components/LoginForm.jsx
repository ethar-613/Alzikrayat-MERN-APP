import { useState } from "react";
import {useAuth}  from "../context/AuthContext";
import api, {getErrorMessage} from "../api/axios";

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
            const res = await api.post('/auth/login', {email, password});
            login(res.data.user, res.data.token);
            if(onLoginSuccess) onLoginSuccess();

        } 
        catch(err){
            setError(getErrorMessage(err, 'Login Failed'));
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