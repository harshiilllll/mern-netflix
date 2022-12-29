import './watch.scss'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useLocation } from 'react-router-dom';

const Watch = () => {
  const location = useLocation()
  console.log(location);
  const movie  = location.movie;
  return (
    <div className='watch'>
      <Link to="/">
        <div className="back">
            <ArrowBackIcon />
            <span>Home</span>
        </div>
      </Link>
        <video className='video' autoPlay progress={+true} controls src="https://youtu.be/tsNswx0nRKM" />
    </div>
  )
}

export default Watch;