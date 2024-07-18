import React, { useState, useEffect } from 'react';
import axiosInstance from '../pages/AxiosInstance';
import { useNavigate } from 'react-router-dom';

const ProtectedComponent = () => {
    const navigate = useNavigate();
    
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/api/user/current');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const token = localStorage.getItem('token');
    console.log("LocalStorage", token)
    if(!token){
      navigate('/')
    }
    return (
        <div>
            {data ? (
                <div>Data: {JSON.stringify(data)}</div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default ProtectedComponent;
