import React, { useState} from 'react';
import { useSelector } from 'react-redux';
import { likePost } from '../../../api/PostRequest';
import './Post.css';

const Post =({data})=>{
    const {user}=useSelector((state)=>state.authReducer.authData);

    const [liked, setLiked] = useState(data.likes.includes(user._id));
    const [likes, setLikes] = useState(data.likes.length); //number of likes
    
    
    
    ///like post
    const handleLike =()=>{
        setLiked((prev)=>!prev)
        likePost(data._id, user._id)
        liked? setLikes((prev)=>prev-1) : setLikes((prev)=>prev+1)
    };


    return(
        <div className="Post">            
            {data.image?<img src={process.env.REACT_APP_PUBLIC_FOLDER + data.image} alt="" />:
            <p>{data.desc}</p> }               
            <div className="icons">
                <ion-icon name={liked?"heart":"heart-outline"} onClick={handleLike}></ion-icon>        
                <ion-icon name="chatbox-outline"></ion-icon>                
                    
            </div>
            <div className="likes">{likes} likes</div>
            <div className="user-description">
                <h4>{data.username}</h4>
                {data.image?<p> {data.desc}</p>:<p></p> }
                
            </div>
            
        </div>
    )
}
export default Post;