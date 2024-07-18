import React, { useState } from 'react';
import { updateData } from '../redux/userSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../pages/AxiosInstance';

const UpdateData = () => {
  const {id} = useParams();
  const users = useSelector((state)=>state.users.users)
  const user = users.find((u)=>u.id === id);
  console.log(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name);
  const [profession, setProfession] = useState(user.profession)
  const handleSubmit = async () => {
    await axiosInstance.put('/api/'+id, {id, name, profession })
      .then((response) => {
        dispatch(updateData(response.data));
        navigate('/getData')
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <h2>Update Data</h2>
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

export default UpdateData;