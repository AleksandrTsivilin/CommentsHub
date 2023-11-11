import express from 'express';
import http from 'http';
import { WebSocket } from 'ws';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
import cookieParser from 'cookie-parser';
import { captchaRouter } from './routes/captcha.route';
import { authRouter } from './routes/auth.route';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { commentsRouter } from './routes/comments.route';
import { v4 as uuidv4 } from 'uuid';

interface CustomWebSocket extends WebSocket {
  connectionId: string;
}

const createAPI = () => {
    const app = express();

    const corsOptions = {
        origin: ['http://localhost:3000', 'https://comments-hub.onrender.com', 'https://comments-8q992x4lg-aleksandrtsivilin.vercel.app'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true
    };

    app.use(cors(corsOptions));
    app.use(cookieParser());
    app.use(express.json());
    app.use('/', express.static(path.join('static')));
    app.use(fileUpload({}));
    
    app.use('/captcha', captchaRouter);

    app.use('/', commentsRouter);

    app.use('/auth', authRouter);

    app.use(errorHandler);

    return app;
}

export const server = http.createServer(createAPI());

const wss = new WebSocket.Server({ noServer: true });


wss.on('connection', (ws: CustomWebSocket) => {
    const connectionId = uuidv4();
    ws.connectionId = connectionId;
    ws.send(JSON.stringify({ connectionId, type: 'info' }));
  
    ws.on('close', () => {});
});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, ws => {
        wss.emit('connection', ws, request);
    });
});

export const broadCast = (comment: any, connectionId: string) => {

    wss.clients.forEach((client: any) => {

        if (client.readyState === WebSocket.OPEN) {
            if (client.connectionId !== connectionId) {
                client.send(JSON.stringify(comment));
            }
        }

    });
}


