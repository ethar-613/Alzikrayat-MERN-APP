/**
 * login form component
 * sends the email and password to the server, saves the returned JWT, and shows the last login of this browser
 */

import { useState } from "react";
import {useAuth}  from "../context/AuthContext";
import api, {getErrorMessage} from "../api/axios";
import {getLastLogin} from "../utils/lastLoginCookie";

// the login form, sends the email and password to the server and saves the returned JWT
// parameters; onLoginSuccess, optional function that runs after a successful login
// Returns the form JSX (with the last login note and error message if any)
function LoginForm({onLoginSuccess}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
    // read the last login of this browser from the cookie, only once when the page opens
    const [lastLogin] = useState(getLastLogin);

    // runs when the form is submitted, calls POST /api/auth/login
    // parameters; e, the submit event (used to stop the page reload)
    // Returns nothing, on success it calls login() and onLoginSuccess(), on failure it shows the error message
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

            {lastLogin && (
                <p className="last-login">
                    Last login from this browser: <strong>{lastLogin.firstName}</strong> ({lastLogin.email})
                    <br />
                    {new Date(lastLogin.time).toLocaleString()}
                </p>
            )}

            {error && <p className="error">{error}</p>}

            <button type="submit" disabled={loading} className="btn-primary">
                {loading? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
}

export default LoginForm;