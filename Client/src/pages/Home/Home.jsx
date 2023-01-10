import React from 'react';
import {UilSearch} from '@iconscout/react-unicons';
import './home.css';
import PostBar from '../constants/postbar/PostBar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FollowersCard from '../constants/Followers/FollowersCard';
import Posts from '../constants/Posts/Posts';


const Home=()=>{
    const {user} = useSelector((state)=>state.authReducer.authData)
    const posts = useSelector((state)=>state.postReducer.posts)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    

    return(
        
        <div className='Home'>

            {/* kartica profila */}
            <div className="Profile">
                <div className="ProfileSide"> 

                {/* search bar i logo                    */}
                    <div className="LogoSearch">
                        <ion-icon name="diamond"></ion-icon>
                        <div className="Search">
                            <input type="text" placeholder='#Explore' className='explore'/>
                            <div className="s-icon">
                                <UilSearch/>
                            </div>
                        </div>
                    </div>

                    {/* slike i informacije */}
                    <div className="Profile1">
                        <div className="ProfilePic">
                            <img src={user.coverPicture? serverPublic + user.coverPicture: serverPublic+"coverPicture.jpg" } alt="" className="Cover-Pic" />                            
                            <img src={user.profilePicture? serverPublic + user.profilePicture: serverPublic+"profilePicture.png"} alt="" className="Profile-Pic" />
                        </div>
                        <div className="name">
                            <h3>{user.firstname} {user.lastname}</h3>
                        </div>
                        <div className="follow">
                            <div className="followers"><h4>{user.followers.length}</h4>
                            <p>Followers</p></div>
                            <div className="following"><h4>{user.following.length}</h4>
                            <p>Following</p></div>
                            <div className="postsnum"><h4>{posts.filter((post)=>post.userId===user._id).length}</h4>
                            <p>Posts</p></div>
                        </div>

                        {/* link */}
                        <div className="viewProfile">
                            <Link to={`/profile/${user._id}`}><h4 className="view-Profile">View Profile</h4></Link>
                        </div>
                    </div>                    
                </div>
            </div>

            {/* objave */}
            <div className="Posts">
                <PostBar/>
                <Posts/>
            </div>
           

           {/* kartica sa ljudima koje mozda znas da ih zapratis */}
            <div className="Rightside">                
                <FollowersCard/>
            </div>
        </div>
    )
}

export default Home;