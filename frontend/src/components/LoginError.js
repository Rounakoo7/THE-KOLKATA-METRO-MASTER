import React from 'react'
import axios from './Axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

function LoginError(props) {
  let location = useLocation();
  const navigate = useNavigate();
  const removeJwt = props.removeJwt;
  const toggleProgress = props.toggleProgress;
  const cookies = new Cookies();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const config = {
        headers: { "Authorization": `Bearer ${cookies.get('jwt')}`, },
      };
      const data = {
        jwt: `${cookies.get('jwt')}`
      }
      const response = await axios.post("/log-out", data, config);
      if (response.status === 200) {
        toggleProgress(10);
        removeJwt();
        navigate(location);
        toggleProgress(40);
        toggleProgress(100);
      }
      else {
        const errorData = await response.json()
        toast.error(errorData.message);
      }
    }
    catch (error) {
      if (error.message.substring(error.message.length - 3, error.message.length) === "401") {
        toggleProgress(10);
        removeJwt();
        navigate(location);
        toggleProgress(40);
        toggleProgress(100);
      }
      else {
        toast.error("Server error. Please try again later");
      }
    }
  }
  return (
    <div style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
      <h1>Oops!</h1>
      <p>You are already logged in. Please log out of your current session.</p>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-12">
          <button type="submit" className="btn btn-danger">Log Out</button>
        </div>
      </form>
    </div>
  )
}

export default LoginError