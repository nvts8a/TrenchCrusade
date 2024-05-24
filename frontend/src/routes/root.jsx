import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '../components/_alert';

export default function Root() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [alertMessage, setAlertMessage] = useState('');
    const [alertShow, setAlertShow] = useState(false);
    const navigate = useNavigate();

    const authenticate = () => {
      axios.patch('/api/user', { 
          username:  username, 
          password:  password
      })
      .then((response) => {
        localStorage.setItem('authorization', response.headers.getAuthorization())
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('authorization')
        navigate('/builder/warband/all', { replace: true })
      })
      .catch((err) => {
        setAlertMessage(err.message)
        setAlertShow(true)
      })
    }

    const handleChange = (set) => (event) => {
      set(event.target.value);
    }

    const style = {
      backgroundImage: `url('/img/login.jpg')`,
      backgroundSize: '115%'
    }

    return (
      <div className='w-100 h-100 pt-5' style={style}>
          <div className='row justify-content-center m-1'>
            <label htmlFor='username' className='visually-hidden'>Email</label>
            <input onInput={handleChange(setUsername)} type='text' className='form-control w-25' id='username' placeholder='Username' />
          </div>
          <div className='row justify-content-center m-1'>
            <label htmlFor='password' className='visually-hidden'>Password</label>
            <input onInput={handleChange(setPassword)} type='password' className='form-control w-25' id='password' placeholder='Password' />
          </div>
          <div className='row justify-content-center m-1'>
            <button onClick={authenticate} type='button' className='btn btn-danger mb-3 w-25'>Login</button>
          </div>
          <Alert message={alertMessage} show={alertShow} setShow={setAlertShow}/>
      </div>
    )
  }