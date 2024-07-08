import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/token/', {
                username,
                password
            });
            localStorage.setItem('token', response.data.access);
            navigate('/Home');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className='container'>
          <div className='row justify-content-center mt-5'>
            <div className='col-12 col-md-6 col-lg-4 text-center'>
              <img src='/images/logo.png' alt='Logo' className='img-fluid mb-4' style={{ maxWidth: '200px', marginTop: '25px' }} />
              <br></br>
            
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='username'>Usuário:</label>
                  <input
                    type='text'
                    className='form-control'
                    id='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Digite seu usuário'
                  />
                </div>
                <br></br>
                <br></br>
                <div className='form-group'>
                  <label htmlFor='password'>Senha:</label>
                  <input
                    type='password'
                    className='form-control'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Digite sua senha'
                  />
                </div>
                <br></br>
                <button type='submit' className='btn btn-primary btn-block'>Login</button>
              </form>
              {error && <p>{error}</p>}
              <br />
              <p>criado por Douglas R. Silva</p>
              <p>suporte: (21) 96523-8304</p>
            </div>
          </div>
        </div>
      );
};

export default Login;
