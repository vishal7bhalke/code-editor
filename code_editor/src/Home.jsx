import {v4 as uuid} from 'uuid';
import toast from 'react-hot-toast';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

import './home.css'
export default function Home(){

   const navigate=useNavigate();

    const [roomid,setRoomid]=useState('');
    const [user,setUser]=useState('');
    const createRoom =(e)=>{
        e.preventDefault();
        const id=uuid();
        setRoomid(id);
       
        toast.success('Room Created Successfully');
    }

    function joinroom() {
        
        if(!roomid || !user ){
            toast.error('Please Enter Room Id and Username');
            return ;
        }
        //redirect
       
            navigate(`/editor/${roomid}`,{
                state: {
                    user,
                },
            });
        
    };

    function enterjoin(e) {
        
        if(e.code==='Enter'){
            joinroom();
        }
    }

    return (
         <div className="homePage">
            <div className="formwrap">
            <img className="img" src="/favicon.ico" alt="" />
            <h4 className="mainLabel">Paste invitation ROOM ID</h4>
            <div className="inputgroup">
                <input className="box" type="text" value={roomid} onChange={(e)=> setRoomid(e.target.value)} placeholder="ROOM ID" onKeyUp={enterjoin} />
                <input className="box" type="text" value={user} onChange={(e)=> setUser(e.target.value)} placeholder="USERNAME" onKeyUp={enterjoin} />
                <button onClick={joinroom} className="btn joinbtn">JOIN</button>

                <span className="createinfo">
                    if you dont have an invite then create &nbsp;
                    <a href="" onClick={createRoom} className="createnewbtn">new room</a>
                </span>
            </div>
         </div>
         <footer>
            <h4>Built with by <a href="https://github.com/vishal7bhalke">github link</a></h4>
         </footer>
         </div>
    );
}