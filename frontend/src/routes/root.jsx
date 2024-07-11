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
      <section className='w-100 h-83 pt-5' style={style}>
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
                <strong>Login</strong>
              </button>
            </div>
          </div>
          <div className='row justify-content-center m-1'>
            <div className='col-sm-12 col-md-2'>
              <button onClick={register} type='button' className={`${isLogin ? 'd-none' : ''} ${!password || (password !== passwordConfirm)? 'disabled' : ''} btn btn-danger w-100`}>
                <strong>Register</strong>
              </button>
            </div>
          </div>
          <div className='row text-center'>
            <a className='rounded link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-danger' href={`/#${isLogin ? 'login' : 'register'}`} onClick={toggleLogin}>
              <strong>or {isLogin ? 'Register' : 'Login'}</strong>
            </a>
          </div>
          <Alert message={alertMessage} show={alertShow} setShow={setAlertShow}/>
      </section>
      <section className='row text-center'>
          <div className='col-12'><sub>This site is a free community project.</sub></div>
          <div className='col-12'><sub>Trench Crusade and all artwork copyright © 2024 Mike Franchina.</sub></div>
          <div className='col-12'><sub>Trench Crusade playtest rules copyright © 2024 Tuomas Pirinen.</sub></div>
      </section>
      <section className='p-1 row justify-content-center text-center'>
          <a className='col-1 text-secondary ps-3' href='https://discord.com/invite/trenchcrusade' rel='noreferrer' target='_blank'>
              <i className='bi bi-discord'></i>
          </a>
          <a className='col-1 text-secondary ps-3' href='https://www.instagram.com/trench_crusade' rel='noreferrer' target='_blank'>
              <i className='bi bi-instagram'></i>
          </a>
          <a className='col-1 text-secondary px-3' href='https://twitter.com/TrenchCrusade' rel='noreferrer' target='_blank'>
              <i className='bi bi-twitter'></i>
          </a>
      </section>
      </>
    )
  }