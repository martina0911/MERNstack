import React from 'react';
import './profile.css';
import { useState } from 'react';
import ProfileModel from '../constants/ProfileModel/ProfileModel';
import Settings from '../constants/Settings/Settings';
import PostBar from '../constants/postbar/PostBar';
import { useEffect } from 'react';
import * as UserApi from '../../api/UserRequest.js';
import { useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Posts from '../constants/Posts/Posts';

const Profile=()=>{
    const {user} = useSelector((state)=>state.authReducer.authData)
    
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    const [modalOpened, setModalOpened] = useState(false);

    
    const params = useParams()
    const profileUserId = params.id
    const[profileUser, setProfileUser] = useState({})
    const dispatch = useDispatch()


    //get user from database
    useEffect(()=>{
        const fetchProfileUser = async()=>{
            if(profileUserId===user._id){
                setProfileUser(user)
            }else{
                const profileUser = await UserApi.getUser(profileUserId)
                setProfileUser(profileUser)
            }
        }
        fetchProfileUser();
    },[user])
    return(
        
        <div className='all'>
            <Settings/>
            <div className="profile-pics">
                <img src={user.coverPicture? serverPublic + user.coverPicture: serverPublic+"coverPicture.jpg" } alt="" className='cover-pic'/>
                <img src={user.profilePicture? serverPublic + user.profilePicture: serverPublic+"profilePicture.png"} alt="" className='profile-pic'/>
                <h1>{user.firstname} {user.lastname}</h1>
                
            </div>
            <div className='informacije'>
                
                <div className="info">
                    <h2>Info</h2>
                    {user._id===profileUserId?(<div>
                        <ion-icon name="create-outline" onClick={()=>setModalOpened(true)}/>
                        <ProfileModel modalOpened={modalOpened} setModalOpened={setModalOpened} data = {user}/>
  
                        </div>
                    ):("")}
                    <br/><br/>
                    
                    <h4>Gender:</h4><p id='gender'>{profileUser.gender}</p> <br/>
                    <h4>Relationship status:</h4><p id='rel-status'>{profileUser.relationship}</p> <br/>
                    <h4>Occupation:</h4><p id='occupation'>{profileUser.worksat}</p><br/>
                    <h4>School:</h4><p id='school'>{profileUser.education}</p> <br/>
                    <h4>Lives in </h4><p id='place'>{profileUser.livesin}</p> <br/>
                </div>
                <div  style={{"maxWidth":"550px"}}><PostBar/></div>
                
            </div>
            <div className="Posts1">
                
                <Posts/>

            </div>
        </div>
    )
}

export default Profile;