import React from 'react'
import {observer} from 'mobx-react'
import {getStore} from '../models/$Store';


export const InputBar = observer(() => {
    return (
        <form className={'input-bar'} onSubmit={(event) => {
            event.preventDefault()
            // @ts-ignore
            const text = event.target[0].value
            const {sendMessage} = getStore()

            sendMessage(text)

            // @ts-ignore
            event.target[0].value = ''
        }}>
            <input type={'text'} placeholder='Type message here...' autoFocus />
        </form>
    )
})