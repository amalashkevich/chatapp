import {Instance, SnapshotIn, types} from 'mobx-state-tree'

export const $Message = types.model('$Message', {
    id: types.identifierNumber,
    dt: types.string,
    author: types.string,
    text: types.string
})

export interface I$Message extends Instance<typeof $Message> {}
export interface I$MessageSnapshotIn extends SnapshotIn<typeof $Message> {}
