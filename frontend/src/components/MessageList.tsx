import React from 'react'
import {observer} from 'mobx-react'
import {Message} from './Message';
import {getStore} from '../models/$Store';


export const MessageList = observer(() => {

    const {messagesArray} = getStore()

    return (
        <ul className={'message-list'}>
            {messagesArray.map(message => <Message key={message.id} message={message}/>)}
        </ul>
    )
})
