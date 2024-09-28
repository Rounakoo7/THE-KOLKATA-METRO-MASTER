import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import { toast } from 'react-toastify';
function Signup(props) {
  const [type1, setType1] = useState('password');
  const [icon1, setIcon1] = useState(eyeOff);
  const handleToggle1 = () => {
    if (type1 === 'password') {
      setIcon1(eye);
      setType1('text')
    } else {
      setIcon1(eyeOff)
      setType1('password')
    }
  }
  const [type2, setType2] = useState('password');
  const [icon2, setIcon2] = useState(eyeOff);
  const handleToggle2 = () => {
    if (type2 === 'password') {
      setIcon2(eye);
      setType2('text')
    } else {
      setIcon2(eyeOff)
      setType2('password')
    }
  }
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password1: "",
    password2: ""
  });
  const handleInputChange = event => {
    const { target: { name, value } } = event;
    setFormData(formData => {
      return {
        ...formData,
        [name]: value,
      }
    })
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password1 === formData.password2) {
      const finalFormData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password1,
      }
      try {
        const response = await axios.post('http://localhost:1010/register', finalFormData);
        if (response.status === 201) {
          navigate("/log-in")
          toast.success("Registration successfull");
        }
        else {
          const errorText = await response.text();
          toast.error(errorText);
        }
      }
      catch (error) {
        if (error.message.substring(error.message.length - 3,error.message.length) === "400") {
          toast.error("Phone number or Email ID already registered");
        }
        else {
          toast.error("Server error. Please try again later");
        }
      }
    }
    else {
      toast.error("Passwords do not match");
    }
  }
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <div className="container-sm" style={{ backgroundColor: 'rgba(0,0,0,0.5)', maxWidth: "600px" }}>
        <h1 style={{ color: 'white' }}>User Sign Up</h1>
        <br /><br />
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-12">
            <input type="text" className="form-control input white-placeholder" name="name" style={{ backgroundColor: "transparent", border: "none", borderBottom: "2px solid #ffffff", color: "#ffffff" }} placeholder="Name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="col-md-12">
            <input type="number" className="form-control input white-placeholder" name="phone" style={{ backgroundColor: "transparent", border: "none", borderBottom: "2px solid #ffffff", color: "#ffffff" }} placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required />
          </div>
          <div className="col-md-12">
            <input type="email" className="form-control input white-placeholder" name="email" style={{ backgroundColor: "transparent", border: "none", borderBottom: "2px solid #ffffff", color: "#ffffff" }} placeholder="Email ID" value={formData.email} onChange={handleInputChange} required />
          </div>
          <div className="col-md-12">
            <div className="input-group flex-nowrap">
              <input type={type1} className="form-control input white-placeholder" name="password1" style={{ backgroundColor: "transparent", border: "none", borderBottom: "2px solid #ffffff", color: "#ffffff" }} placeholder="Enter Password" value={formData.password1} onChange={handleInputChange} autoComplete="current-password" required />
              <span className="input-group-text" id="addon-wrapping" onClick={handleToggle1}>
                <Icon className="absolute mr-10" icon={icon1} size={25} />
              </span>
            </div>
          </div>
          <div className="col-md-12">
            <div className="input-group flex-nowrap">
              <input type={type2} className="form-control input white-placeholder" name="password2" style={{ backgroundColor: "transparent", border: "none", borderBottom: "2px solid #ffffff", color: "#ffffff" }} placeholder="Confirm Password" value={formData.password2} onChange={handleInputChange} autoComplete="current-password" required />
              <span className="input-group-text" id="addon-wrapping" onClick={handleToggle2}>
                <Icon className="absolute mr-10" icon={icon2} size={25} />
              </span>
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Sign up</button>
          </div>
        </form>
        <br />
      </div>
      <br />
      <br />
    </div>
  )
}

export default Signup
