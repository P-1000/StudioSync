import React , {useState , useEffect , useContext} from 'react'
import Pings from './Ping'
import { AuthContext } from '../../context/userContext'
import axios from 'axios'

const PingComponent = () => {
  const { token } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };


  return (
    <div>
      <Pings/>
    </div>
  )
}

export default PingComponent