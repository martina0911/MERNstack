import { Modal, useMantineTheme } from '@mantine/core';
import React from 'react';
import './ProfileModel.css';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../Action/AuthAction';

//npm install @mantine/modals @mantine/hooks @mantine/core @mantine/next

function SettingsModel({modalOpened, setModalOpened}) {
  const theme = useMantineTheme();
  const dispatch = useDispatch()


  //logout function
  const handleLogOut=()=>{
    dispatch(logOut());
  }
  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened = {modalOpened}
      onClose={()=>{setModalOpened(false)}}
    >
      <form action="" className="infoForm">
        <h2>Settings</h2>
        <div id='buttons'>
        <button id='logout' onClick={handleLogOut}>Logout</button>
        </div>
      </form>
    </Modal>
  );
}
export default SettingsModel;