import React from 'react'
import { useNavigate } from 'react-router-dom';

function LogoutError(props) {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/log-in")
  }  
  return (
    <div style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
      <h1>Oops!</h1>
      <p>Your session has expired or you were not logged in. Please log in to access the requested route.</p>
      <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-12">
            <button type="submit" className="btn btn-danger">Log In</button>
          </div>
      </form>
    </div>
  )
}

export default LogoutError