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
import fs from 'fs';

declare module 'express-session' {
    interface SessionData {
      captchaText?: string; 
    }
}

const createAPI = () => {
    const app = express();

    const corsOptions = {
        origin: 'http://localhost:3000',
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

wss.on('connection', (ws: any) => {
  
  ws.on('message', (message: any) => {
    const formObj: {
        [key: string] : any
    } = {};
    message.forEach((value: any, key: string) => {
        formObj[key] = value;
    });

  });
  
  ws.on('close', () => {
  });
});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, ws => {
      wss.emit('connection', ws, request);
    });
});

export const broadCast = (comment: any) => {
    wss.clients.forEach((client: any) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(comment));
        }
    });
}


