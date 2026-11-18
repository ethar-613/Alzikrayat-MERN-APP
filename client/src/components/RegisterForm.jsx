/**
 * register form component
 * creates a new account and logs the user in directly with the JWT returned by the server
 */

import { useState } from "react";
import {useAuth} from "../context/AuthContext";
import api, {getErrorMessage} from "../api/axios";

// the register form, creates a new account and logs the user in with the returned JWT
// parameters; onRegisterSuccess, optional function that runs after a successful register
// Returns the form JSX
function RegisterForm({onRegisterSuccess}){
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        location: '',
        description: '',
        occupation: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
    // updates the form state when the user types in any input (uses the input name as the key)
    // parameters; e, the change event of the input
    // Returns nothing
    const handleChanges= (e)=>{
        setForm({...form, [e.target.name]: e.target.value})
    };


    // runs when the form is submitted, calls POST /api/auth/register
    // parameters; e, the submit event (used to stop the page reload)
    // Returns nothing, on success it calls login() and onRegisterSuccess(), on failure it shows the error message
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError('');
        setLoading(true);
        try{
            const res = await api.post('/auth/register', form);
            login(res.data.user, res.data.token);
            if(onRegisterSuccess) onRegisterSuccess();

        } 
        catch(err){
            setError(getErrorMessage(err, 'Register Failed'));
        }
        finally{
            setLoading(false);
        }
    };

    return(
        <form onSubmit={handleSubmit} className="auth-login-Form">
            <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChanges} required />
            <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChanges} required />  
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChanges} required />
            <input name="password" type="password" placeholder="Password(min 6 characters)" value={form.password} onChange={handleChanges} minLength={6} required />
            <input name="location" placeholder="Location (optional)" value={form.location} onChange={handleChanges} />
            <input name="occupation" placeholder="Occupation (optional)" value={form.occupation} onChange={handleChanges} />
            <input name="description" placeholder="Short pio (optional)" value={form.description} onChange={handleChanges} rows={3}/>


            {error && <p className="error">{error}</p>}

            <button type="submit" disabled={loading} className="btn-primary">
                {loading? 'Registering...' : 'Register'}
            </button>
        </form>
    );
}

export default RegisterForm;