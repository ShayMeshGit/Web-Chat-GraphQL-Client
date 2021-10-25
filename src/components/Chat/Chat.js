//style
import './Chat.css';

import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation, useLazyQuery } from '@apollo/client';

//components
import ChatSub from './Chat.subscription';
import SendMessage from '../SendMessage';


const GET_MESSAGES_SUBSCRIPTION = gql`
subscription getMessages{
    messages {
      from
      content
    }
  }
`;

const GET_MESSAGES_QUREY = gql`
  query getMessages {
      messages {
          from
          content
      }
  }
`;

const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($from: String!, $content: String!) {
      sendMessage(MessageInput: {from: $from, content: $content}) {
          from
          content
      }
  }
`;

const GET_USER_QUERY = gql`
    query getUser($id: ID!) {
        user(id: $id) {
        username
        }
    }
`;

const Chat = (props) => {

    const [loadMessages, { loading: messagesLoading, error: messagesError, data: messagesData, subscribeToMore }] = useLazyQuery(GET_MESSAGES_QUREY);
    const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER_QUERY, {
        variables: {
            id: props.userId
        }
    });
    const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION);
    const [content, setContent] = useState('');

    useEffect(() => {
        loadMessages();
    }, []) 

    if (userError) return <h1>Error...</h1>
    if (userLoading) return <h1>Loading...</h1>


    const handleContentChange = (event) => {
        setContent(event.target.value)
    }

    const handleSendingMessage = () => {
        sendMessage({
            variables: {
                from: userData.user.username,
                content: content
            }
        })
        setContent('');
    }

    const subscirbeToNewMessages = () => {
        subscribeToMore({
            document: GET_MESSAGES_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                return !subscriptionData.data ? prev : subscriptionData.data;
            }
        })
    }

    return (
        <div className={'chat-container'}>
            <div className={'chat'}>
                <ChatSub
                    from={userData.user.username}
                    messages={messagesData ? messagesData.messages: []}
                    subscirbeToNewMessages={subscirbeToNewMessages}
                />
                <SendMessage content={content} handleContentChange={handleContentChange} handleSendingMessage={handleSendingMessage} />
            </div>
        </div>
    )

}


export default Chat