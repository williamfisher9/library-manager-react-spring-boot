import { useState } from 'react';
import './Register.css';
import { sendRegisterRequest } from '../../services/AppServices';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('HamzaMahm');
    const [lastName, setLastName] = useState('HamzaHamdan');
    const [emailAddress, setEmailAddress] = useState('hamza.hamdan2@hotmail.com');
    const [password, setPassword] = useState('123456789');

    const [formValidation, setFormValidation] = useState({firstName: false, lastName: false, emailAddress: false, password: false});

    const [responseError, setResponseError] = useState({error: false, message: ''});

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value)
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value)
    }

    const handleEmailAddressChange = (event) => {
        setEmailAddress(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleRegisterRequest = () => {
        let firstNameInvalid = false;
        let lastNameInvalid = false;
        let emailAddressInvalid = false;
        let passwordInvalid = false;

        if(firstName == '' || firstName == null || firstName.length < 8){
            firstNameInvalid = true;
        }

        if(lastName == '' || lastName == null || lastName.length < 8){
            lastNameInvalid = true;
        }

        if(emailAddress == '' || emailAddress == null || emailAddress.length < 8){
            emailAddressInvalid = true;
        }

        if(password == '' || password == null || password.length < 8){
            passwordInvalid = true;
        }

        setFormValidation({firstName: firstNameInvalid, lastName: lastNameInvalid, emailAddress: emailAddressInvalid, password: passwordInvalid});

        if(!firstNameInvalid && !lastNameInvalid && !emailAddressInvalid && !passwordInvalid) {
            sendRegisterRequest(firstName, lastName, emailAddress, password).then(() => {navigate('/login')})
            .catch(err => setResponseError({error: true, message: err.response.data.error}));
        }
    }

  return (
    <div className="register-container">
       <div className="form-fields">
       <div className="form-control-field">
                <input className='form-control-field-input' type='text' id='firstName' name='firstName' autoComplete='off' onChange={handleFirstNameChange}/>
                <label className='form-control-field-label' id='firstNameLabel'>first name</label>
                {
                    formValidation.firstName ? <label className='form-control-field-error' id='firstNameError'>First Name field is required</label> : null
                }
            </div>
            <div className="form-control-field">
                <input className='form-control-field-input' type='text' id='lastName' name='lastName' autoComplete='off' onChange={handleLastNameChange}/>
                <label className='form-control-field-label' id='lastNameLabel'>last name</label>
                {
                    formValidation.lastName ? <label className='form-control-field-error' id='lastNameError'>Last Name field is required</label> : null
                }
            </div>
            <div className="form-control-field">
                <input className='form-control-field-input' type='text' id='emailAddress' name='emailAddress' autoComplete='off' onChange={handleEmailAddressChange}/>
                <label className='form-control-field-label' id='emailAddressLabel'>email address</label>
                {
                    formValidation.emailAddress ? <label className='form-control-field-error' id='emailAddressError'>Email Address field is required</label> : null
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
                <input className='form-control-field-input btn' type='button' id='submitBtn' name='submitBtn' value='REGISTER' onClick={handleRegisterRequest}/>
                
            </div>

            {
                    responseError.error ? <label className='request-error' id='requestError'>{responseError.message}</label> : null
                }
         </div>
    </div>
  );
}
