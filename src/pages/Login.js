import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

   axios.defaults.withCredentials = true;

    const HandleSubmit = async() => {
        await axios.post('http://localhost:5001/api/user/login', {email, password})
        .then(function (response){
            if (response.data.accessToken) {
                localStorage.setItem('token', response.data.accessToken); // Store the token
                navigate('/getData');
            }
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    // const HandleSubmit = async () => {
    //     try {
    //         const response = await axios.post('http://localhost:5001/api/user/login', { email, password });
           
    //         console.log(response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };


    return (
        <div className='vh-100 d-flex justify-content-center align-items-center bg-primary'>
            <div className="p-3 bg-white card rounded col-12 col-md-5" >
                <h2>Login</h2>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Email</label>
                    <input type="email" class="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="name@example.com" />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Password</label>
                    <input type="password" class="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="name@example.com" />
                </div>
                <div class="mb-3">
                    <button className='btn btn-success' onClick={HandleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Login