import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Temp = () => {
    const location = useLocation(); 
    const navigate = useNavigate();
    const code = new URLSearchParams(location.search).get('code');
    const postToken = async () => {
        const res = await axios.get(`http://localhost:3000/oauth2callback?code=${code}`);
    }
    useEffect(() => {
        postToken();
        navigate('/');
    }, []);
  return (
    <div>
  please wait redirecting....
    </div>
  )
}

export default Temp