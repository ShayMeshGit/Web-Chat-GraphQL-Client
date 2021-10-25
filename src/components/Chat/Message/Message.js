import React from 'react';


const Message = (props) => {

    const { message, username } = props;
    const { from, content } = message;

    console.log(props)

    return (
        <div className={'message'}>
            {
                from === username ?
                    <React.Fragment>
                        <div className={'sent-content'}>{content}</div>
                        <div className={'sent-name'}>{from}</div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <div className={'replay-name'}>{from}</div>
                        <div className={'replay-content'}>{content}</div>
                    </React.Fragment>
            }
        </div>
    )
}


export default Message