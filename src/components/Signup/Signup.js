import React from 'react';
import { useState } from 'react';

//components
import Input from '../Input';
import Button from '../Button';


const Signup = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const { disabled, onSignupSubmit } = props;

    const onChangeHandler = (event, input) => {
        const { value } = event.target;
        if (input === 'password') {
            return setPassword(value);
        }
        if (input === 'username') {
            return setUsername(value);
        }
        setEmail(value);
    }

    return (
        <div className={`auth-form`}>
            <form onSubmit={(event) => onSignupSubmit(event, { email, password, username })}>
                <Input
                    label={'email'}
                    type={'text'}
                    id={'email'}
                    name={'email'}
                    placeholder={'Enter email'}
                    value={email}
                    disabled={disabled}
                    onChange={onChangeHandler}
                />
                <Input
                    label={'username'}
                    type={'text'}
                    id={'username'}
                    name={'username'}
                    placeholder={'Enter Username'}
                    value={username}
                    disabled={disabled}
                    onChange={onChangeHandler}
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
                />
                <Button
                    type="submit"
                >
                    signup
                </Button>

                <Button link={'/'}>login</Button>
            </form>
        </div>
    )
}


export default Signup;