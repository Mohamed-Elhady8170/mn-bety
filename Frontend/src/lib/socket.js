import { io } from 'socket.io-client';

// Replace with your actual backend URL if it's different!
// We set autoConnect to false so it only connects AFTER a user logs in.
const BACKEND_URL = 'http://localhost:4000';

export const socket = io(BACKEND_URL, {
  autoConnect: false,
  withCredentials: true,
});