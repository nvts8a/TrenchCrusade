import { useState } from 'react';
import axios from 'axios';

export default function Root() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const authenticate = () => {
      console.log("##############")
      console.log(username)
      console.log("##############")

      console.log(password)

      axios.post('/api/user/login', { 
          username:  username, 
          password:  password
      })
      .then((response) => console.log(response))
      .catch((err)     => console.log(err.message))
    }

    const handleChange = (set) => (event) => {
      set(event.target.value);
    }

    return (
      <form className='row g-3'>
        <div className='col-auto'>
          <label htmlFor='username' className='visually-hidden'>Email</label>
          <input onInput={handleChange(setUsername)} type='text' className='form-control' id='username' placeholder='Username' />
        </div>
        <div className='col-auto'>
          <label htmlFor='password' className='visually-hidden'>Password</label>
          <input onInput={handleChange(setPassword)} type='password' className='form-control' id='password' placeholder='Password' />
        </div>
        <div className='col-auto'>
          <button onClick={authenticate} type='button' className='btn btn-primary mb-3'>Confirm identity</button>
        </div>
      </form>
    )
  }