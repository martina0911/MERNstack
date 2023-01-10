import React from 'react';
import './Settings.css';
import { useState } from 'react';
import SettingsModel from '../ProfileModel/SettingsModel';

const Settings=()=>{
    const [modalOpened, setModalOpened] = useState(false);
    return(
        
        <div className='all'>
            <ion-icon id='settings' name="settings-outline" onClick={()=>setModalOpened(true)}/>
            <SettingsModel modalOpened={modalOpened} setModalOpened={setModalOpened}/>
        </div>
    )
}
export default Settings;          