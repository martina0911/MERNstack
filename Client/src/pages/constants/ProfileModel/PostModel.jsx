import { Modal } from '@mantine/core';
import React from 'react';
import PostBar from '../postbar/PostBar';
import './ProfileModel.css';
import { useMantineTheme } from '@mantine/core';

function PostModel({modalOpened, setModalOpened}) {
  const theme = useMantineTheme();
  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='50%'
      opened = {modalOpened}
      onClose={()=>{setModalOpened(false)}}
    >
      <PostBar/>
    </Modal>
  );
}
export default PostModel;