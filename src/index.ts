declare const process: {
  env: {
    NODE_ENV: string;
    DATABASE_URL: string;
    PORT: number;
  };
};

// #region Import modules
import dotenv from 'dotenv';

if (process.env.NODE_ENV.trim() === 'development') {
  console.log('Back-end is running on development mode!');
  dotenv.config();
}

import express, { Response } from 'express';
import mongoose from 'mongoose';

import http from 'http';
import socketIO from 'socket.io';

const app = express();

const server = http.createServer(app);
const io = socketIO(server);

import { classroomRouteV1, newClassroomRouteV1, studentRouteV1 } from './routes';
import {
  fullscreenExit,
  join,
  leave,
  privateMessage,
  requestTabs,
  studentNavigation,
  studentTabs,
  teacherConnection
} from './socketEvents';
// #endregion

// #region Initialize database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => console.log('Connected to database!'));
mongoose.connection.on('err', (error) => console.error(error.message));
mongoose.connection.on('disconnected', () => console.log('Database disconnected!'));
// #endregion

// #region Initialize socket server
io.on('connection', (socket: socketIO.Socket) => {
  socket.on('fullscreen-exit', (data: string) => fullscreenExit(data));
  socket.on('join', (data: string) => join(socket, data));
  socket.on('leave', (data: string) => leave(data));
  socket.on('private-message', (data: string) => privateMessage(socket, data));
  socket.on('request-tabs', (data: string) => requestTabs(socket, data));
  socket.on('student-navigation', (data: string) => studentNavigation(data));
  socket.on('student-tabs', (data: string) => studentTabs(socket, data));
  socket.on('teacher-connection', (id: string) => teacherConnection(socket, id));
});
// #endregion

// #region Set endpoints
app.use('/v1/newclassroom', newClassroomRouteV1);
app.use('/v1/classroom/:class_id', classroomRouteV1);
app.use('/v1/classroom/:class_id/student/:student_id', studentRouteV1);

app.all('*', (_, res: Response) => res.status(404).json({ error: 'Endpoint not found!' }));
// #endregion

// #region Initialize server
const port = process.env.PORT;

server.listen(port, () => console.log(`Back-end listening on port ${port}...`));
// #endregion
