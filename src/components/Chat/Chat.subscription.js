import React, { useEffect } from 'react';

//components
import Message from './Message';


const ChatSub = (props) => {

    const { subscirbeToNewMessages, messages } = props;

    useEffect(() => {
        subscirbeToNewMessages()
    })


    return (
        <div className={'messages'}>
            {
                (messages.length > 0) && messages.map((msg, index) => {
                    return <Message key={index} message={msg} username={props.from} />
                })
            }
        </div>
    )
}


export default ChatSub;