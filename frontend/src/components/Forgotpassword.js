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

function Forgotpassword(props) {
    const [counter, setCounter] = useState(30);
    const toggleProgress = props.toggleProgress
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
        credential: "",
    });
    const [otpPasswordData, setOtpPasswordData] = useState({
        otp: "",
        password1: "",
        password2: "",
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
        setOtpPasswordData(otpPasswordData => {
            return {
                ...otpPasswordData,
                [name]: value,
            }
        })
    }
    const handleSubmit1 = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put("/forgotpassword", formData);
            if (response.status === 200) {
                setVerify(true);
                toast.info("An OTP has been sent to both the Email ID and Phone Number for password change");
            }
            else {
                const errorText = await response.text();
                toast.error(errorText);
            }
        }
        catch (error) {
            if (error.message.substring(error.message.length - 3, error.message.length) === "400") {
                toast.error("User is not registered");
            }
            else {
                toast.error("Server error. Please try again later");
            }
        }
    }
    const handleSubmit2 = async (event) => {
        event.preventDefault();
        if (otpPasswordData.password1 === otpPasswordData.password2) {
            const finalOtpPasswordData = {
                credential: formData.credential,
                otp: otpPasswordData.otp,
                password: otpPasswordData.password1,
            }
            try {
                const response = await axios.put("/verifyandchangepassword", finalOtpPasswordData);
                if (response.status === 200) {
                    toggleProgress(10);
                    navigate("/log-in")
                    toast.success("Password changed successfully");
                }
                else {
                    const errorText = await response.text();
                    toast.error(errorText);
                }
            }
            catch (error) {
                if (error.message.substring(error.message.length - 3, error.message.length) === "400") {
                    setVerify(false);
                    navigate("/forgot-password")
                    toast.error("Some error occured. Please retry password change");
                }
                else if (error.message.substring(error.message.length - 3, error.message.length) === "401") {
                    toast.error("The OTP is Invalid or expired");
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
    const handleSubmit3 = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put("/forgotpassword", formData);
            if (response.status === 200) {
                setVerify(true);
                toast.info("An OTP has been sent to both the Email ID and Phone Number for password change");
            }
            else {
                const errorText = await response.text();
                toast.error(errorText);
            }
        }
        catch (error) {
            if (error.message.substring(error.message.length - 3, error.message.length) === "400") {
                setVerify(false);
                navigate("/forgot-password")
                toast.error("Some error occured. Please retry password change");
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
                <h1 style={{ color: 'white' }}>Forgot Password</h1>
                <br /><br />{verify === true ? <><form className="row g-3">
                    <div className="col-md-12">
                        <input type="text" className="form-control input white-placeholder" name="otp" style={{ backgroundColor: "transparent", border: "none", borderBottom: "2px solid #ffffff", color: "#ffffff" }} placeholder="OTP received on Email or Phone" value={otpPasswordData.otp} onChange={handleInputChange2} required />
                    </div>
                    <div className="col-md-12">
                        <div className="input-group flex-nowrap">
                            <input type={type1} className="form-control input white-placeholder" name="password1" style={{ backgroundColor: "transparent", border: "none", borderBottom: "2px solid #ffffff", color: "#ffffff" }} placeholder="Enter New Password" value={otpPasswordData.password1} onChange={handleInputChange2} autoComplete="current-password" required />
                            <span className="input-group-text" id="addon-wrapping" onClick={handleToggle1}>
                                <Icon className="absolute mr-10" icon={icon1} size={25} />
                            </span>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="input-group flex-nowrap">
                            <input type={type2} className="form-control input white-placeholder" name="password2" style={{ backgroundColor: "transparent", border: "none", borderBottom: "2px solid #ffffff", color: "#ffffff" }} placeholder="Confirm New Password" value={otpPasswordData.password2} onChange={handleInputChange2} autoComplete="current-password" required />
                            <span className="input-group-text" id="addon-wrapping" onClick={handleToggle2}>
                                <Icon className="absolute mr-10" icon={icon2} size={25} />
                            </span>
                        </div>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit2}>Change Password</button>
                        <span style={{ paddingLeft: "10px" }}></span>
                        {counter === 0 ? <><button type="submit" className="btn" style={{ backgroundColor: "rgb(19 203 19)", color: "white" }} onClick={handleSubmit3}>Resend OTP</button></> : <></>}
                        {counter === 0 ? <></> : <><h7 class="card-subtitle mb-2" style={{ color: "#04f704" }}>Resend OTP in <SpancounterProp start="30" end="0" durationinseconds="30" setCounter={setCounter} /> Seconds</h7></>}
                    </div>
                    <div className="col-12">
                        <Link style={{ color: "white", paddingLeft: "15px" }} to="/log-in">Log in</Link>
                    </div>
                </form></> : <></>}
                {verify === true ? <></> : <>
                    <form className="row g-3" onSubmit={handleSubmit1}>
                        <div className="col-md-12">
                            <input type="text" className="form-control input white-placeholder" name="credential" style={{ backgroundColor: "transparent", border: "none", borderBottom: "2px solid #ffffff", color: "#ffffff" }} placeholder="Phone Number or Email ID" value={formData.credential} onChange={handleInputChange1} required />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">Continue</button>
                            <Link style={{ color: "white", paddingLeft: "15px" }} to="/log-in">Log in</Link>
                        </div>
                    </form></>}
                <br />
            </div>
            <br />
            <br />
        </div> : <><LoginError mode={props.mode} removeJwt={props.removeJwt} toggleProgress={props.toggleProgress} /></>}</>
    )
}

export default Forgotpassword
