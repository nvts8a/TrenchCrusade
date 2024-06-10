import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '../components/_alert';

export default function Root() {
    const [isLogin,  setIsLogin ] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [alertMessage, setAlertMessage] = useState('');
    const [alertShow, setAlertShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      if (localStorage.getItem('authorization')) {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('authorization')
        navigate('/builder/warband/all', { replace: true })
      }
    }, [navigate])

    const authenticate = () => {
      axios.put('user', { 
          username:  username, 
          password:  password
      })
      .then((response) => {
        localStorage.setItem('authorization', response.headers.getAuthorization())
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('authorization')
        console.log(localStorage.getItem('authorization'))
        navigate('/builder/warband/all', { replace: true })
      })
      .catch((err) => {
        if (err.response.status === 403) setAlertMessage("Invalid login.")
        else setAlertMessage(err.message)
        setAlertShow(true)
      })
    }

    const register = () => {
      axios.post('user', { 
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

    const toggleLogin = () => setIsLogin(!isLogin)

    const handleChange = (set) => (event) => {
      set(event.target.value);
    }

    const style = {
      backgroundImage: `url('/img/login.jpg')`,
      backgroundPosition: 'left 5%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '115%'
    }

    return (
      <>
      <div className='landing w-100 pt-5' style={style}>
          <div className='row justify-content-center m-1'>
            <div className='col-sm-12 col-md-2'>
              <label htmlFor='username' className='visually-hidden'>Email</label>
              <input onInput={handleChange(setUsername)} type='text' className='form-control' id='username' placeholder='Username' />
            </div>
          </div>
          <div className='row justify-content-center m-1'>
            <div className='col-sm-12 col-md-2'>
              <label htmlFor='password' className='visually-hidden'>Password</label>
              <input onInput={handleChange(setPassword)} type='password' className='form-control' id='password' placeholder='Password' />
            </div>
          </div>
          <div className='row justify-content-center m-1'>
            <div className='col-sm-12 col-md-2'>
              <label htmlFor='password' className='visually-hidden'>Password</label>
              <input onInput={handleChange(setPasswordConfirm)} type='password' className={`${isLogin ? 'd-none' : ''} form-control`} id='passwordConfirm' placeholder='Confirm Password' />
            </div>
          </div>
          <div className='row justify-content-center m-1'>
            <div className='col-sm-12 col-md-2'>
              <button onClick={authenticate} type='button' className={`${isLogin ? '' : 'd-none'} btn btn-danger w-100`}>
                Login
              </button>
            </div>
          </div>
          <div className='row justify-content-center m-1'>
            <div className='col-sm-12 col-md-2'>
              <button onClick={register} type='button' className={`${isLogin ? 'd-none' : ''} ${!password || (password !== passwordConfirm)? 'disabled' : ''} btn btn-danger w-100`}>
                Register
              </button>
            </div>
          </div>
          <div className='row text-center'>
            <a href={`/#${isLogin ? 'login' : 'register'}`} onClick={toggleLogin}>or {isLogin ? 'Register' : 'Login'}</a>
          </div>
          <Alert message={alertMessage} show={alertShow} setShow={setAlertShow}/>
      </div>
      <div className='row text-center'>
          <div className='col-12'><sub>This site is a free community project.</sub></div>
          <div className='col-12'><sub>Trench Crusade and all artwork copyright © 2024 Mike Franchina.</sub></div>
          <div className='col-12'><sub>Trench Crusade playtest rules copyright © 2024 Tuomas Pirinen.</sub></div>
      </div>
      </>
    )
  }