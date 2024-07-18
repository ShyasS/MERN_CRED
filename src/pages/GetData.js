import React,{useEffect} from 'react'
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { deleteData, getUser } from '../redux/userSlice';
import {useDispatch,useSelector} from 'react-redux';
import Cookies from 'universal-cookie';
import axiosInstance from '../pages/AxiosInstance';
//useSelector is used to fetch the data
//useDispatch is used to modify the data
axios.defaults.withCredentials = true;
const GetData = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state)=>state.users.users)
  const cookies = new Cookies();
  console.log(cookies.cookies.accessToken)
  if(!cookies.cookies.accessToken){
    navigate('/')
  }
  const token = localStorage.getItem('token');
    console.log("LocalStorage", token)
    if(!token){
      navigate('/')
    }

    const fetchData = async()=>{
        await axiosInstance.get('/api')
        .then( (response) => {
            dispatch(getUser(response.data))   
          console.log(response.data);
        })
        .catch( (error)=>{
          console.log(error);
        })
    }
    useEffect(()=>{
        fetchData();
    },[])
    
    const handleDelete = (id)=>{
      axiosInstance.delete('/api/'+id)
        .then((response) => {
            dispatch(deleteData({id}))   
          console.log(response.data);
        })
        .catch( (error)=>{
          console.log(error);
        })
    }
    const logout = () => {
      cookies.remove('accessToken', { path: '/' });
      console.log('Remaining cookies:', cookies.getAll());
      navigate('/')
      const token = localStorage.removeItem('token');
      console.log(token);
      if(!token){
        navigate('/')
      }

    }
  
  return (
    <div className=' bg-primary d-flex justify-content-center align-items-center'>
        <div className=' col-12 col-sm-8 col-md-7 bg-white rounded p-3 my-4 '>
            <Link to={'/create'} className='btn btn-success'>Add+</Link>
            <button onClick={logout} className='btn btn-success'>Logout</button>
            {/* <button className='btn btn-primary'>Logout</button> */}
        <table class="table">
  <thead>
    <tr>
      <th scope="col">S.NO</th>
      <th scope="col">Name</th>
      <th scope="col">Profession</th>
      <th scope="col">Actions</th>
      {/* <th scope="col">Handle</th> */}
    </tr>
  </thead>
  <tbody>
    {
        users.map((user, i)=>{
        return(
            <tr>
            <th scope="row">{i+1}</th>
            <td>{user.name}</td>
            <td>{user.profession}</td>
            <td>
                <Link to={`/edit/${user.id}`} className='btn btn-success btn-sm me-1'>Edit</Link> | {' '}
                <button onClick={()=>handleDelete(user.id)} className='btn btn-danger btn-sm'>Delete</button>
            </td>
          </tr>
        )
        })

    }
    
  </tbody>
</table>
        </div>
    </div>
  )
}

export default GetData