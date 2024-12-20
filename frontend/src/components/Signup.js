import React, { useState, useEffect } from 'react'
import axios from './Axios';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import LoginError from './LoginError';
import SpancounterProp from './SpanCounterProp';
import { TailSpin } from 'react-loader-spinner'


function Signup(props) {
  const [loader, setLoader] = useState(0);
  const [counter, setCounter] = useState(30);
  const toggleProgress = props.toggleProgress;
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
  const [verify, setVerify] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password1: "",
    password2: ""
  });
  const [otpData, setOtpData] = useState({
    phone_otp: "",
    email_otp: "",
  });
  const handleInputChange1 = event => {
    const { target: { name, value } } = event;
    setFormData(formData => {
      return {
        ...formData,
        [name]: value,
      }
    })
  }
  const handleInputChange2 = event => {
    const { target: { name, value } } = event;
    setOtpData(otpData => {
      return {
        ...otpData,
        [name]: value,
      }
    })
  }
  const handleSubmit1 = async (event) => {
    event.preventDefault();
    if (formData.phone.length === 10) {
      if (formData.password1 === formData.password2) {
        const finalFormData = {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          password: formData.password1,
        }
        try {
          setLoader(1);
          const response = await axios.post("/register", finalFormData);
          setLoader(0);
          if (response.status === 200) {
            setVerify(true);
            toast.info("OTPs have been sent to the Email ID and Phone Number for verification");
          }
          else {
            const errorText = await response.text();
            toast.error(errorText);
          }
        }
        catch (error) {
          timeoutAndRefresh(3000);
          if (error.message.substring(error.message.length - 3, error.message.length) === "400") {
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
    else {
      toast.error("Phone number should be of length 10 digits");
    }
  }
  const handleSubmit2 = async (event) => {
    event.preventDefault();
    const finalOtpData = {
      phone: formData.phone,
      email: formData.email,
      phone_otp: otpData.phone_otp,
      email_otp: otpData.email_otp,
    }
    try {
      setLoader(1);
      const response = await axios.put("/verifyregistration", finalOtpData);
      setLoader(0);
      if (response.status === 201) {
        toggleProgress(10);
        navigate("/log-in")
        toast.success("Registration successfull");
      }
      else {
        const errorText = await response.text();
        toast.error(errorText);
      }
    }
    catch (error) {
      timeoutAndRefresh(3000);
      if (error.message.substring(error.message.length - 3, error.message.length) === "400") {
        setVerify(false);
        navigate("/sign-up")
        toast.error("Some error occured. Please retry registration");
      }
      else if (error.message.substring(error.message.length - 3, error.message.length) === "401") {
        toast.error("One or both of the OTPs are invalid or expired");
      }
      else {
        toast.error("Server error. Please try again later");
      }
    }
  }
  const handleSubmit3 = async (event) => {
    event.preventDefault();
    const finalResendData = {
      phone: formData.phone,
      email: formData.email,
    }
    try {
      const response = await axios.put("/resendregisterotp", finalResendData);
      if (response.status === 200) {
        setCounter(30);
        toast.info("OTPs have been sent to the Email ID and Phone Number for verification");
      }
      else {
        const errorText = await response.text();
        toast.error(errorText);
      }
    }
    catch (error) {
      if (error.message.substring(error.message.length - 3, error.message.length) === "400") {
        setVerify(false);
        navigate("/sign-up")
        toast.error("Some error occured. Please retry registration");
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
      <div className="container-sm" style={{ backgroundColor: 'rgba(0,0,0,0.5)', maxWidth: "600px" }}>
        {(verify === true) && (loader !== 1) ? <>
          <h1 style={{ color: 'white' }}>User Sign Up</h1>
          <br /><br />
          <form className="row g-3">
            <div className="col-md-12">
              <input type="text" className="form-control input white-placeholder" name="phone_otp" style={{ backgroundColor: "transparent", border: "none", borderBottom: "2px solid #ffffff", color: "#ffffff" }} placeholder="OTP received on Phone" value={otpData.phone_otp} onChange={handleInputChange2} required />
            </div>
            <div className="col-md-12">
              <input type="text" className="form-control input white-placeholder" name="email_otp" style={{ backgroundColor: "transparent", border: "none", borderBottom: "2px solid #ffffff", color: "#ffffff" }} placeholder="OTP received on Email" value={otpData.email_otp} onChange={handleInputChange2} required />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary" onClick={handleSubmit2}>Verify and Register</button>
              <span style={{ paddingLeft: "10px" }}></span>
              {counter === 0 ? <><button type="submit" className="btn" style={{ backgroundColor: "rgb(19 203 19)", color: "white" }} onClick={handleSubmit3}>Resend OTP</button></> : <></>}
              {counter === 0 ? <></> : <><h7 class="card-subtitle mb-2" style={{ color: "#04f704" }}>Resend OTP in <SpancounterProp start="30" end="0" durationinseconds="30" setCounter={setCounter} /> Seconds</h7></>}
            </div>
            <div className="col-12">
              <Link style={{ color: "white", paddingLeft: "15px" }} to="/log-in">Already registered? Log in</Link>
            </div>
          </form></> : <></>}
        {(verify === true) || (loader !== 0) ? <></> : <>
          <h1 style={{ color: 'white' }}>User Sign Up</h1>
          <br /><br />
          <form className="row g-3" onSubmit={handleSubmit1}>
            <div className="col-md-12">
              <input type="text" className="form-control input white-placeholder" name="name" style={{ backgroundColor: "transparent", border: "none", borderBottom: "2px solid #ffffff", color: "#ffffff" }} placeholder="Name" value={formData.name} onChange={handleInputChange1} required />
            </div>
            <div className="col-md-12">
              <input type="number" className="form-control input white-placeholder" name="phone" style={{ backgroundColor: "transparent", border: "none", borderBottom: "2px solid #ffffff", color: "#ffffff" }} placeholder="Phone Number" value={formData.phone} onChange={handleInputChange1} required />
            </div>
            <div className="col-md-12">
              <input type="email" className="form-control input white-placeholder" name="email" style={{ backgroundColor: "transparent", border: "none", borderBottom: "2px solid #ffffff", color: "#ffffff" }} placeholder="Email ID" value={formData.email} onChange={handleInputChange1} required />
            </div>
            <div className="col-md-12">
              <div className="input-group flex-nowrap">
                <input type={type1} className="form-control input white-placeholder" name="password1" style={{ backgroundColor: "transparent", border: "none", borderBottom: "2px solid #ffffff", color: "#ffffff" }} placeholder="Enter Password" value={formData.password1} onChange={handleInputChange1} autoComplete="current-password" required />
                <span className="input-group-text" id="addon-wrapping" onClick={handleToggle1}>
                  <Icon className="absolute mr-10" icon={icon1} size={25} />
                </span>
              </div>
            </div>
            <div className="col-md-12">
              <div className="input-group flex-nowrap">
                <input type={type2} className="form-control input white-placeholder" name="password2" style={{ backgroundColor: "transparent", border: "none", borderBottom: "2px solid #ffffff", color: "#ffffff" }} placeholder="Confirm Password" value={formData.password2} onChange={handleInputChange1} autoComplete="current-password" required />
                <span className="input-group-text" id="addon-wrapping" onClick={handleToggle2}>
                  <Icon className="absolute mr-10" icon={icon2} size={25} />
                </span>
              </div>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">Continue</button>
              <Link style={{ color: "white", paddingLeft: "15px" }} to="/log-in">Already registered? Log in</Link>
            </div>
          </form></>}
        {loader !== 1 ? <></> : <>
          <br />
          <br />
          <br />
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
          <br />
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

export default Signup
