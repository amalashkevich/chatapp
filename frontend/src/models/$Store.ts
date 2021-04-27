import {Instance, types} from 'mobx-state-tree'
import {$Message, I$MessageSnapshotIn} from './$Message'
import {$SIO} from './$SIO';


export const $Store = types
    .model('Store', {
        username: types.maybe(types.string),
        messages: types.map($Message),
        sio: types.maybe($SIO)
    })
    .views(self => ({
        get messagesArray() {
            return Array.from(self.messages.values())
        }
    }))
    .actions((self) => ({

        setUsername(username: string) {
            self.username = username
            self.sio = $SIO.create({auth_key: username})

            self.sio.sio.on('server_message', message => {
                console.log('message')
                this.onMessage(message)
            })
        },
        onMessage({id, author, dt, text}: I$MessageSnapshotIn) {
            self.messages.set(String(id), {id, author, dt, text})
        },
        sendMessage(text: string) {
            if (self.sio) {
                console.log(`sendingMessage ${text}`)
                self.sio.sio.emit('client_message', {
                    author: self.username,
                    text: text
                })
            }
        },
    }))


export interface I$Store extends Instance<typeof $Store> {
}

export const store = $Store.create()

export function getStore(): I$Store {
    return store
}

// @ts-ignore
window.store = store