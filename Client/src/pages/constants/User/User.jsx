import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unFollowUser } from '../../../Action/UserAction';

const User = ({person})=>{
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    const {user}=useSelector((state)=>state.authReducer.authData)
    const dispatch = useDispatch()
    const [following, setFollowing]=useState(person.followers.includes(user._id))


    //follow user
    const handleFollow=()=>{
        following?
        dispatch(unFollowUser(person._id,user)):
        dispatch(followUser(person._id,user))
        setFollowing((prev)=>!prev)
    }

    return(
        <div className="side">
            <div className="person">
                <div className="slika">
                    <img src={person.profilePicture? serverPublic + person.profilePicture: serverPublic+"profilePicture.png"} alt="" id='slika' />
                </div>
                <div className="personsname">
                    <h4>{person.firstname}  {person.lastname}</h4>
                    <p>@{person.username}</p>
                </div>
                <button className={following?'btn-follow unfollow':'btn-follow'} onClick={handleFollow}>{following?"UNFOLLOW":"FOLLOW"}</button>
            </div>
        </div>
    )
}

export default User;