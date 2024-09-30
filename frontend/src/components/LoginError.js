import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
function LoginError(props) { 
  let location = useLocation();
  const navigate = useNavigate();
  const removeJwt = props.removeJwt;
  const handleSubmit = () => {
    removeJwt();
    navigate(location.pathname)
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