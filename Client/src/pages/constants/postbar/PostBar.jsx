import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../../Action/UploadAction';
import './PostBar.css';
import {UilTimes} from '@iconscout/react-unicons';

const PostBar =()=>{
  const [image,setImage]=useState(null);
  const imageRef = useRef();
  const dispatch = useDispatch();
  const desc = useRef();
  const {user}=useSelector((state)=>state.authReducer.authData)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  
  
  //select image
  const onImageChange=(event)=>{
    if(event.target.files && event.target.files[0]){
      let img = event.target.files[0];
      setImage(img);
    }
  }

  //reset state
  const reset =()=>{
    setImage(null);
    desc.current.value=""
  }

  //on click submit data to database
  const handleSubmit = (e)=>{
    e.preventDefault();

    const newPost ={
      userId:user._id,
      username:user.username,
      desc:desc.current.value
    }
    if(image){
      const data = new FormData()
      const filename = Date.now()+ image.name
      data.append("name", filename)
      data.append("file",image)
      newPost.image = filename
      console.log(newPost)
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }
    dispatch(uploadPost(newPost))
    reset()
  }
    
    return(
        <div className="write-somethingg">
            <div className="slikaaa">
            <img src={user.profilePicture? serverPublic + user.profilePicture: serverPublic+"profilePicture.png"} alt="" id='slikaaa' /> 
            </div>
            <div className="nestoou">
                <input ref={desc} required type="text" name="desc" id="" placeholder='Write something...'/>

                <ion-icon name="image-outline" onClick={()=>imageRef.current.click()}></ion-icon>
                <ion-icon name="play-circle-outline"></ion-icon>
                <ion-icon name="location-outline"></ion-icon>
                <ion-icon name="calendar-outline"></ion-icon>
                <button className='btn0' onClick={handleSubmit}>POST</button><br/>
                <div style={{display:"none"}}>
                    <input type="file" name="myImage" ref={imageRef} onChange={onImageChange}/>
                </div>
            </div>{image&&(
                <div className="previewImage">
                <UilTimes onClick={()=>setImage(null)}/>
                <img src={URL.createObjectURL(image)} alt="" />
                </div>
            )}
        </div>
    )
}
export default PostBar;