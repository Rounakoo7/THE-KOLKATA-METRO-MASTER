import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
function Login(props) {
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
  const [formData, setFormData] = useState({
    phone: "",
    password: ""
  });
  const handleInputChange = event =>{
    const {target: {name, value}} = event;
    setFormData(formData => {
      return {
        ...formData,
        [name]:value,
      }
    })    
  }
  const handleSubmit = event =>{
    event.preventDefault();
    console.log(formData);
    try {
      //const response = await fetch("http://localhost:8080/") 
    } catch (error) {
      
    }
    //navigate("/user");toggle()
  }
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
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-12">
            <input type="text" className="form-control input white-placeholder" name="phone" style={{ backgroundColor: "transparent", border: "none", borderBottom: "2px solid #ffffff", color: "#ffffff" }} placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required />
          </div>
          <div className="col-md-12">
            <div className="input-group flex-nowrap">
              <input type={type} className="form-control input white-placeholder" name="password" style={{ backgroundColor: "transparent", border: "none", borderBottom: "2px solid #ffffff", color: "#ffffff" }} placeholder="Password" value={formData.password} onChange={handleInputChange} autoComplete="current-password" required />
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