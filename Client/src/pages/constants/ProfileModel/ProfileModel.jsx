import { Modal, useMantineTheme } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../../Action/UploadAction.js';
import { updateUser } from '../../../Action/UserAction.js';
import './ProfileModel.css';

function ProfileModel({modalOpened, setModalOpened, data}) {
  const theme = useMantineTheme();
  const {password,...other}= data;
  const[formData,setFormData]= useState(other);
  const[profileImage,setProfileImage] = useState(null);
  const[coverImage,setCoverImage]=useState(null);
  const dispatch=useDispatch();
  const param = useParams();
  const {user}=useSelector((state)=>state.authReducer.authData);



  //data change
  const handleChange =(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  
  //image change
  const onImageChange =(event)=>{
    if(event.target.files && event.target.files[0]){
      let img = event.target.files[0];
      event.target.name==="profileImage" ? setProfileImage(img):setCoverImage(img);      
    }
  };

  //on click submit send data and pictures
  const handleSubmit=(e)=>{
    e.preventDefault();
    let UserData = formData;
    if(profileImage){
      const data = new FormData();
      const fileName = Date.now()+profileImage.name;
      data.append("name",fileName);
      data.append("file",profileImage);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    if(coverImage){
      const data = new FormData();
      const fileName = Date.now()+coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  }


// //get data from local storage
//   useEffect(()=>{
//   const data = localStorage.getItem('profile')  
//   if(data){
//     setFormData(JSON.parse(data))
//     }  
//   },[])


//   //put data in local storage
//   useEffect(()=>{  
//     localStorage.setItem('profile',JSON.stringify(formData))  
//   })
  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='55%'
      opened = {modalOpened}
      onClose={()=>{setModalOpened(false)}}
    >
      <form className="infoForm" onSubmit={handleSubmit}>
        <h2>Edit Info</h2>

        <div className="infoInput">
            <input type="text" className="input1" name='firstname' placeholder='First Name' onChange={handleChange}/>
            <input type="text" className="input2" name='lastname' placeholder='Last Name' onChange={handleChange}/>
        </div>
        <div className="gender">
        <input type="text" className="input7" name='gender' placeholder='Gender' onChange={handleChange}/>
        </div>
        <div className="relationship">
        <input type="text" className="input3" name='relationship' placeholder='Relationship' onChange={handleChange}/>
        </div>
        <div className="job">
        <input type="text" className="input4" name='worksat' placeholder='Works at ' onChange={handleChange}/>
        </div>
        <div className="edu">
        <input type="text" className="input6" name='education' placeholder='Studied at 'onChange={handleChange}/>
        </div>
        <div className="lives">
        <input type="text" className="input5" name='livesin' placeholder='Lives at 'onChange={handleChange}/>
        </div>

        <div className="selectPics">
          Profile Image
            <input type="file" name="profileImage" id="profimg" onChange={onImageChange}/>
            Cover Image
            <input type="file" name="coverImage" id="coverimg" onChange={onImageChange}/>
        </div>
        <button type='submit'>Update</button>
      </form>
    </Modal>
  );
}
export default ProfileModel;