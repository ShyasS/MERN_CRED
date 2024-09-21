import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { addUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import axiosInstance from '../pages/AxiosInstance';

const CreateData = () => {
  
  const navigate = useNavigate();
  const cookies = new Cookies(null, { path: '/' });
  console.log(cookies.cookies.accessToken)
  if(!cookies.cookies.accessToken){
    navigate('/')
  }
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  
  const handleSubmit = async () => {
    await axiosInstance.post('/api', { name, profession })
      .then((response) => {
        dispatch(addUser(response.data));
        navigate('/getData')
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
      <h2>Add Data</h2>
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input type="email" value={name} onChange={(e) => setName(e.target.value)} class="form-control" placeholder="Enter the Name" />
        </div>

        <div class="mb-3">
          <label class="form-label">Profession</label>
          <input type="email" value={profession} onChange={(e) => setProfession(e.target.value)} class="form-control" placeholder="Enter the profession" />
        </div>
        <div class="mb-3">
          <button className='btn btn-success' onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default CreateData