import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {gapi } from 'gapi-script';
import Login from './Login';


const Temp = () => {
    const location = useLocation(); 
    const navigate = useNavigate();
    const code = new URLSearchParams(location.search).get('code');
    const postToken = async () => {
        const res = await axios.get(`http://localhost:3000/oauth2callback?code=${code}`);
    }
    useEffect(() => {
      
    }, []);

    useEffect(() => {
        gapi.load('auth2', function() {
            gapi.auth2.init({
                client_id: '527997111994-i0qj1631gkl8gd9e2rel0qicrmsash48.apps.googleusercontent.com',
              scope : "https://www.googleapis.com/auth/youtube"
            }).then((auth2) => {
                console.log(auth2);
            });
        });
    } , []);


  return (
    <div>
      <Login  />
    </div>
  )
}

export default Temp