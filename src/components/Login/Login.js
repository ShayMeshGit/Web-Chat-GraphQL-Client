import React from 'react';
import { useState } from 'react';

//components
import Input from '../Input';
import Button from '../Button';


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [emailValid, setEmailValid] = useState(false);
    // const [passwordValid, setPasswordValid] = useState(false);
    const { disabled, onLoginSubmit } = props;

    const onChangeHandler = (event, input) => {
        const { value } = event.target;
        if (input === 'password') {
            return setPassword(value);
        }
        setEmail(value);
    }

    return (
        <div className={`auth-form`}>
            <form onSubmit={(event) => onLoginSubmit(event, { email, password })}>
                <Input
                    label={'email'}
                    type={'text'}
                    id={'email'}
                    name={'email'}
                    placeholder={'Enter email'}
                    value={email}
                    disabled={disabled}
                    onChange={onChangeHandler}
                    // isValid={emailValid}
                />
                <Input
                    label={'password'}
                    type={'password'}
                    id={'password'}
                    name={'password'}
                    placeholder={'Enter password'}
                    value={password}
                    disabled={disabled}
                    onChange={onChangeHandler}
                    // isValid={passwordValid}
                />
                <Button
                    type="submit"
                >
                    login
                </Button>
                {
                    props.error ? props.error.map((message, index) => <div key={index} className={`error-message`}>{message}</div>) : null
                }
                <Button link={'/signup'}>Signup</Button>
            </form>
        </div>
    )
}


export default Login;