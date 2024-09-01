import {io} from 'socket.io-client';


export const initSocket =async() =>{
    const options={
        'force new connection':true,
        reconnectionAttempts:'infinity',
        timeout:10000,
        transports:['websocket'],
    };
    // REACT_APP_BACKEND_URL = "http://localhost:5000"
    // const backendUrl = process.env.REACT_APP_BACKEND_URL;

    // console.log('Backend URL:', backendUrl);
    return io("http://localhost:5000", options);
};