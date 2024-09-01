import Avatar from 'react-avatar';
export default function Client({username}){
    return (
        <div>
            <Avatar name={username} size={50} round="15px" />
            <div className='client'>
            {username}
            </div>
           
           
        </div>
    );
}