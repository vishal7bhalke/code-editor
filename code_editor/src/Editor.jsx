import { useState , useRef, useEffect } from "react";
import Client from "./Client";
import Editorbox from "./Editorbox";
import './editor.css'
import { initSocket } from "./socket";
import { useLocation,useParams,useNavigate ,Navigate} from "react-router-dom";
import toast from 'react-hot-toast';


export default function Editor(){
  const [clients,setClients] = useState([]);
  const codeRef=useRef(null);
const location = useLocation();
const socketRef = useRef(null);
const reactNavigator = useNavigate();
const {roomid}=useParams();

useEffect(()=>{
 
  const init =async()=>{
    
    socketRef.current= await initSocket();
    socketRef.current.on('connect_error',(err)=> handleErrors(err));
    socketRef.current.on('connect_failed',(err)=> handleErrors(err));

    function handleErrors(e){
      console.log(e);
      toast.error('Socket connection failed,try again later');
      reactNavigator('/');
    }

    socketRef.current.emit('join',{
      roomid,
      user: location.state?.user,
    });

    //listening for joined event
    socketRef.current.on('joined', ({clients,user,socketid}) => 
      {
      if(user!==location.state?.user){
        toast.success(`${user} joined the room`);
        console.log(clients);
      }
      setClients(clients);
      socketRef.current.emit('sync_code', {
        code: codeRef.current,
        socketid,
      });
  });

// Handle the 'disconnected' event
socketRef.current.on('disconnected', ({ socketid, user }) => {
  toast.success(`${user} left the room`);

  setClients((prev) => {
    const updatedClients = prev.filter((client) => client.socketid !== socketid);
    return updatedClients;
  });
});
  
  };
  init();

  //cleaning function for diconnect socket connection
  return()=>{
socketRef.current.disconnect();
socketRef.current.off('joined');
socketRef.current.off('disconnected');
  }

},[]);

  async function copyroomid(){
    try{
      await navigator.clipboard.writeText(roomid);
      toast.success('Room ID has been copied');
    }
    catch(err){
      toast.error('Could not be copied');
    }

  }

    function leaveroom(){
      reactNavigator('/');
    }

    
    
if(!location.state){
  return <Navigate to="/" replace={true}/>;
}

    return (
       
        <div className="mainwrap">
            <div className="aside">
            <div className="asideinner">
                <div className="logo">
                <img className="img" src="/favicon.ico" alt="" />

                </div>
                <h3>Connected</h3>
                <div className="clientlist">
                  {
                    clients.map((client)=> (
                        <Client 
                       key={client.socketid} username={client.user} />
                    ))
                  }
                  
                </div>
            </div>
           <button className="btn copybtn" onClick={copyroomid}>copy room id</button>
           <button className="leavebtn" onClick={leaveroom}>Leave</button>
         </div>

         <div className="editorwrap">
                <Editorbox style={{width: "100vw"}} socketRef={socketRef} roomid={roomid} oncodechange={(code)=>{ codeRef.current=code}} />
         </div>
         </div>
    );
}