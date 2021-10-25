import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

const Button = (props) => {
    const { disabled, children, className, link, onClick } = props;
    return !link ?
        (
            <button
                className={`button ${className}`}
                disabled={disabled}
                onClick={onClick}
            >
                {children}
            </button>
        )
        : (
            <Link
                className={`link`}
                to={link}
            >
                {children}
            </Link>
        )
}


export default Button;