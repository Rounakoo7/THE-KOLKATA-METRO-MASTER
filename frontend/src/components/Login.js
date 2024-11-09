import React, { useState, useEffect } from 'react'
import axios from './Axios';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import { toast } from 'react-toastify';
import LoginError from './LoginError';
import { TailSpin } from 'react-loader-spinner'

function Login(props) {
  const toggleProgress = props.toggleProgress;
  const [loader, setLoader] = useState(0);
  function timeoutAndRefresh(delay) {
    setTimeout(() => {
      navigate(0);
    }, delay)
  }
  useEffect(() => {
    toggleProgress(70);
    toggleProgress(100);
    return () => {
    }
  }, [])
  const cookies = new Cookies();
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
  const [formData, setFormData] = useState({
    phone: "",
    password: ""
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
    try {
      setLoader(1);
      const response = await axios.post("/login", formData);
      setLoader(0);
      if (response.status === 200) {
        toggleProgress(10);
        const decoded = jwtDecode(response.data);
        toggleProgress(20);
        cookies.set("jwt", response.data, { expires: new Date(decoded.exp * 1000), });
        navigate("/user-profile");
        toast.success("Logged in successfully");
      }
      else {
        const errorData = await response.json()
        toast.error(errorData.message);
      }
    }
    catch (error) {
      timeoutAndRefresh(3000);
      if (error.message.substring(error.message.length - 3, error.message.length) === "401") {
        toast.error("Invalid credentials. Please retry");
      }
      else {
        toast.error("Server error. Please try again later");
      }
    }
  }

  return (<>{cookies.get("jwt") === undefined ?
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container-sm" style={{ backgroundColor: 'rgba(0,0,0,0.5)', maxWidth: "600px" }}>
        {loader !== 0 ? <></> : <>
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
              <button type="submit" className="btn btn-primary">Log In</button>
              <Link style={{ color: "white", paddingLeft: "15px" }} to="/forgot-password">Forgot password</Link>
              <Link style={{ color: "white", paddingLeft: "15px" }} to="/sign-up">Not an user? Sign up</Link>
            </div>
          </form></>}
        {loader !== 1 ? <></> : <>
          <br />
          <br />
          <br />
          <br />
          <TailSpin
            visible={true}
            height="80"
            width="550"
            color="#05fb08"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <br />
          <br />
          <br />
        </>}
        <br />
      </div>
      <br />
      <br />
    </div> : <><LoginError mode={props.mode} removeJwt={props.removeJwt} toggleProgress={props.toggleProgress} /></>}</>
  )
}

export default Login