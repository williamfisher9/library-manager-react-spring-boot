import { useState } from 'react'
import './Login.css'
import { sendLoginRequest } from '../../services/AppServices';

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [formValidation, setFormValidation] = useState({username: false, password: false});

    const [responseError, setResponseError] = useState({error: false, message: ''});

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleLoginRequest = () => {
        let usernameInvalid = false;
        let passwordInvalid = false;

        if(username == '' || username == null || username.length < 8){
            usernameInvalid = true;
        }

        if(password == '' || password == null || password.length < 8){
            passwordInvalid = true;
        }

        setFormValidation({username: usernameInvalid, password: passwordInvalid});

        if(!usernameInvalid && !passwordInvalid) {
            sendLoginRequest(username, password).then((res) => console.log(res))
            .catch(err => setResponseError({error: true, message: err.response.data.error}));
        }
    }
 
    return <div className="login-container">
         <div className="form-fields">
            <div className="form-control-field">
                <input className='form-control-field-input' type='text' id='username' name='username' autoComplete='off' onChange={handleUsernameChange}/>
                <label className='form-control-field-label' id='usernameLabel'>username</label>
                {
                    formValidation.username ? <label className='form-control-field-error' id='usernameError'>Username field is required</label> : null
                }
            </div>

            <div className="form-control-field">
                <input className='form-control-field-input' type='password' id='password' name='password' autoComplete='off' onChange={handlePasswordChange}/>
                <label className='form-control-field-label' id='passwordLabel'>password</label>
                {
                    formValidation.password ? <label className='form-control-field-error' id='passwordError'>Password field is required</label> : null
                }
            </div>

            <div className="form-control-field btn">
                <input className='form-control-field-input btn' type='button' id='submitBtn' name='submitBtn' value='LOGIN' onClick={handleLoginRequest}/>
            </div>

            {
                    responseError.error ? <label className='request-error' id='requestError'>{responseError.message}</label> : null
                }
         </div>
    </div>
}