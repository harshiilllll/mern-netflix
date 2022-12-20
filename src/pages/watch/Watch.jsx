import React from 'react';

import './watch.scss'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Video from '../../components/listitem/Avatar_Video.mp4';

const Watch = () => {
  return (
    <div className='watch'>
        <div className="back">
            <ArrowBackIcon />
            <span>Home</span>
        </div>
        <video className='video' autoPlay progress controls src={Video} ></video>
    </div>
  )
}

export default Watch