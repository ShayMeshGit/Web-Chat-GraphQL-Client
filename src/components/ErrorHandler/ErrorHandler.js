import React from 'react';

//components
import { Modal } from 'antd';



const ErrorHandler = (props) => {
    const { error, onHandle } = props;
    const { errors } = (error && error.networkError.result) ? error.networkError.result : []

    const title = (error && error.networkError.result) ? errors[0].message : null;
    return error ? 
        <Modal
            visible={true}
            title={title ? title : error.message}
            onOk={onHandle}
            onCancel={onHandle}
        >
            {
                (errors && errors[0].reasons) && errors[0].reasons.map((reason, index) => {
                    return <p key={index} style={{color: 'red'}}>{reason}</p>
                }) 
            }
        </Modal>
        : null
}


export default ErrorHandler;