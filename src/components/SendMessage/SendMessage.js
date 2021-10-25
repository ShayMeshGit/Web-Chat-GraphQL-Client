import React from 'react';


const SendMessage = (props) => {
    
    const { content, handleSendingMessage, handleContentChange } = props;
    return (
        <div className={'send-message'}>
            <input type='text' name='content' value={content} onChange={handleContentChange}/>
            <button onClick={handleSendingMessage} >SEND</button>
        </div>
    )

}


export default SendMessage;