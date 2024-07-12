import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
function Login(props) {
  const [password, setPassword] = useState("");
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text')
    } else {
      setIcon(eyeOff)
      setType('password')
    }
  }
  const navigate = useNavigate();
  const toggle = props.toggleLoggedIn;
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container-sm" style={{ backgroundColor:'rgba(0,0,0,0.5)', maxWidth: "600px"}}>
        <h1 style={{ color: 'white' }}>User Log In</h1>
        <br /><br />
        <form className="row g-3" onSubmit={() => {navigate("/user");toggle()}}>
          <div className="col-md-12">
            <input type="text" className="form-control input white-placeholder" id="adminuserid" style={{ backgroundColor: "transparent", border: "none", borderBottom: "2px solid #ffffff", color: "#ffffff" }} placeholder="Phone Number" required />
          </div>
          <div className="col-md-12">
            <div className="input-group flex-nowrap">
              <input type={type} className="form-control input white-placeholder" id="adminuserid" style={{ backgroundColor: "transparent", border: "none", borderBottom: "2px solid #ffffff", color: "#ffffff" }} placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
              <span class="input-group-text" id="addon-wrapping" onClick={handleToggle}>
                <Icon class="absolute mr-10" icon={icon} size={25} />
              </span>
            </div>
          </div>          
          <div className="col-12">
              <button type="submit" className="btn btn-primary">Log in</button>
              <Link style={{color:"white", paddingLeft: "15px"}} to="/sign-up">Not an user? Sign up</Link>
          </div>
        </form>
        <br />
      </div>
      <br />
      <br />
    </div>
  )
}

export default Login