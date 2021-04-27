import React, {FC} from 'react'
import {observer} from 'mobx-react'
import {MessageList} from './MessageList';
import {InputBar} from './InputBar';
import {getStore} from '../models/$Store';


export const ChatWidget: FC = observer(() => {
    const {username, setUsername} = getStore()

    if (!username) {
        const username = prompt('Your username')
        if (username) setUsername(username)
    }
    return (
        <div className={'chat-widget'}>
            <MessageList/>
            <InputBar/>
        </div>
    )
})