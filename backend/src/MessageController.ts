import pool from './dbconnector';

export interface IMessage{id: number, author: string, dt: string, text: string}

class MessageController {

    public async insertMessage(author: string, message: string): Promise<IMessage> {
        try {
            const client = await pool.connect()
            const sql = 'INSERT INTO message (author, message) VALUES ($1, $2) RETURNING *'
            const { rows } = await client.query(sql, [author, message])
            client.release()
            return {id: rows[0].id, author: rows[0].author, dt: rows[0].created_dt, text: rows[0].message}

        } catch (error) {
            console.error('insertMessage', error)
        }
    }

    public async getLastMessageId() {
        try {
            const client = await pool.connect()
            const sql = 'SELECT MAX(id) FROM message'
            const { rows } = await client.query(sql)
            return rows[0].max
        } catch (error) {
            console.error('getLastMessageId', error)
        }
    }

    public async getMessages(fromId: number, toId: number): Promise<IMessage[]> {
        try {
            const client = await pool.connect()
            const sql = 'SELECT id, author, created_dt, message FROM message WHERE id BETWEEN $1 AND $2'

            const { rows } = await client.query(sql, [fromId, toId])
            return rows.map(row => ({id: row.id, author: row.author, dt: row.created_dt, text: row.message}))
        } catch (error) {
            console.error('getMessages', error)
        }
    }
}

export default MessageController;