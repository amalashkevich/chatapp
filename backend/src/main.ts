import {createServer} from 'http';
import {Server, Socket} from 'socket.io';
import MessageController, {IMessage} from './MessageController';


const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: '*',
    }
});

const messageController = new MessageController()

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    next()
});


io.on('connection', (socket: Socket) => {
    const ctx = new Map
    ctx.set('lastSentId', 0)
    console.log('connection ' + socket.id)

    function broadcastMessage({id, author, dt, text}: IMessage) {
        io.emit('server_message', {id, author, dt, text})
        ctx.set('lastSentId', id)
    }

    function sendMessage(socket: Socket, {id, author, dt, text}: IMessage) {
        socket.emit('server_message', {id, author, dt, text})
        ctx.set('lastSentId', id)
    }

    messageController.getLastMessageId().then((lastMessageId: number) => {
        if (lastMessageId != ctx.get('lastSentId')) {
            messageController.getMessages(ctx.get('lastSentId'), lastMessageId).then((messages) => {
                if (messages !== undefined) {
                    for (let message of messages) {
                        sendMessage(socket, message)
                    }
                }
            })
        }
    })

    socket.on('disconnect', (reason) => {
        console.log('disconnected')
    });

    socket.on('client_message', ({author, text}) => {
        console.log('client_message', author, text)

        messageController.insertMessage(author, text).then((message) => {
            broadcastMessage(message)
        })
    });

});

httpServer.listen(3001);
