import React from 'react';
import './input.css';

const Input = (props) => {
    const { type, name, placeholder, value, disabled, onChange, id, label, inValid } = props;
    return (
        <div className={`input`}>
            { label && <label id={id}>{label}</label>}
            <input
                className={inValid ? 'invalid' : ''}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                onChange={(event) => onChange(event, id)}
            />
        </div>
    )
}

export default Input;
