import {addDisposer, Instance, SnapshotIn, types} from 'mobx-state-tree'
import {io} from 'socket.io-client';

const url:string = (process.env.REACT_APP_WS_URL as string)

export const $SIO = types.model('$SIO', {
    auth_key: types.string
})
    .volatile(self => ({
        sio: io(url, {
            auth: {
                token: self.auth_key
            }
        })
    }))
    .actions(self => ({
        disconnect(): void {
            self.sio.close()
        },
        afterCreate() {
            self.sio.on('connect', () => {
                console.log('socket.io connected')
            })

            self.sio.on('disconnect', (reason: string) => {
                console.log('socket.io disconnected, reason ' + reason)
            })

            addDisposer(self, () => {
                self.sio.close()
            })
        },
    }))

export interface I$SIO extends Instance<typeof $SIO> {
}

export interface I$SIOSnapshotIn
    extends SnapshotIn<typeof $SIO> {
}