import React from 'react';

const EnterName = (props) => {
    const { handleNameChange, handleSubmit, nameVal } = props;


    return (
        <div> 
            <input type='text' name='name' value={nameVal} onChange={handleNameChange} placeholder={'Enter your name'}/>
            <button onClick={handleSubmit}>OK</button>
        </div>
    );
}


export default EnterName;