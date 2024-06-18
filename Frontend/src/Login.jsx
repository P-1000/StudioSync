import React from 'react'
import {GoogleLogin} from 'react-google-login'

const Login = () => {
    const clientId = '527997111994-i0qj1631gkl8gd9e2rel0qicrmsash48.apps.googleusercontent.com'
    const onSuccess = (res) => {
        console.log('Login Success:', res.profileObj);
        console.log(res.accessToken)
    }
    const onFailure = (res) => {
        console.log('Login Failed:', res);
    }
  return (
    <div>
        <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        />
    </div>
  )
}

export default Login