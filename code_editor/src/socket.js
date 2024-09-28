import { io } from 'socket.io-client';

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempts: 'infinity',
        timeout: 10000,
        transports: ['websocket'],
    };

    // Fetch backend URL from Vite's environment variables, fallback to your Render backend URL
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://code-editor-4-kotr.onrender.com";

    console.log('Connecting to Backend:', backendUrl);

    return io(backendUrl, options);
};
