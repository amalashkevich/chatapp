import React, {FC} from 'react'
import {observer} from 'mobx-react'
import {I$Message} from '../models/$Message'

interface IMessageProps {
    message: I$Message
}

export const Message: FC<IMessageProps> = observer(({message}) => {
    return (
        <li className={'message'} >
            {message.author}: {message.text}
        </li>
    )
})