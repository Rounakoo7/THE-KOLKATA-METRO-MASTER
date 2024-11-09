import React, { useState, useEffect } from 'react';
import LogoutError from './LogoutError';
import Cookies from 'universal-cookie';
import { FaPhoneAlt } from "react-icons/fa";
import { GiTicket } from "react-icons/gi";
import { MdMarkEmailRead } from "react-icons/md";
import axios from './Axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import { jwtDecode } from 'jwt-decode';
import "react-step-progress-bar/styles.css";
import SpancounterProp from './SpanCounterProp';
import { TailSpin } from 'react-loader-spinner'
import ContentLoader from 'react-content-loader'

function Userprofile(props) {
    const [loader, setLoader] = useState(0);
    const [contentLoader, setContentLoader] = useState(1);
    const [counter1, setCounter1] = useState(30);
    const [counter2, setCounter2] = useState(30);
    const [response, setResponse] = useState([])
    const [verify, setVerify] = useState(0);
    const toggleProgress = props.toggleProgress
    const removeJwt = props.removeJwt;
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    function timeoutAndRefresh(delay) {
        setTimeout(() => {
            navigate(0);
        }, delay)
    }
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
    const handleGet = async () => {
        toggleProgress(70);
        try {
            const config = {
                headers: { "Authorization": `Bearer ${cookies.get('jwt')}`, },
            };
            const response = await axios.get("/getuser", config);
            if (response.status === 200) {
                setContentLoader(0);
                setResponse(response.data)
            }
            else {
                const errorData = await response.json()
                toast.error(errorData.message);
            }
        }
        catch (error) {
            if (error.message.substring(error.message.length - 3, error.message.length) === "401") {
                toast.error("Unauthorized");
            }
            else {
                toast.error("Server error. Please try again later");
            }
        }
        toggleProgress(100);
    }
    useEffect(() => {
        handleGet();
        return () => {
        }
    }, [])
    const [formData11, setFormData11] = useState({
        phone: "",
        password: ""
    });
    const handleInputChange11 = event => {
        const { target: { name, value } } = event;
        setFormData11(formData11 => {
            return {
                ...formData11,
                [name]: value,
            }
        })
    }
    const [formData12, setFormData12] = useState({
        otp: "",
    });
    const handleInputChange12 = event => {
        const { target: { name, value } } = event;
        setFormData12(formData12 => {
            return {
                ...formData12,
                [name]: value,
            }
        })
    }
    const handleSubmit1 = (event) => {
        toggleProgress(10);
        toggleProgress(70);
        setVerify(11);
        toggleProgress(100);
    }
    const handleSubmit11 = async (event) => {
        event.preventDefault();
        try {
            const config = {
                headers: { "Authorization": `Bearer ${cookies.get('jwt')}`, },
            };
            setLoader(1);
            const response = await axios.put("/changephone", formData11, config);
            if (response.status === 200) {
                setLoader(0);
                toggleProgress(10);
                toggleProgress(40);
                toast.success("An OTP has been sent to the new Phone Number for verification");
                setVerify(12);
                toggleProgress(100);
            }
            else {
                const errorText = await response.text();
                toast.error(errorText);
            }
        }
        catch (error) {
            timeoutAndRefresh(3000);
            if (error.message.substring(error.message.length - 3, error.message.length) === "401") {
                formData11.password = "";
                toast.error("Invalid password");
            }
            else if (error.message.substring(error.message.length - 3, error.message.length) === "400") {
                formData11.phone = "";
                formData11.password = "";
                toast.error("Phone number is already registered");
            }
            else {
                toast.error("Server error. Please try again later");
            }
        }
    }
    const handleBack11 = (event) => {
        toggleProgress(10);
        toggleProgress(70);
        setVerify(0);
        formData11.phone = "";
        formData11.password = "";
        toggleProgress(100);
        navigate("/user-profile");
    }
    const handleSubmit12 = async (event) => {
        event.preventDefault();
        try {
            const config = {
                headers: { "Authorization": `Bearer ${cookies.get('jwt')}`, },
            };
            setLoader(1);
            const response = await axios.put("/verifychangephone", formData12, config);
            if (response.status === 200) {
                toggleProgress(10);
                toggleProgress(40);
                const decoded = jwtDecode(response.data);
                cookies.set("jwt", response.data, { expires: new Date(decoded.exp * 1000), });
                formData11.phone = "";
                formData11.password = "";
                formData12.otp = "";
                timeoutAndRefresh(3000);
                toast.success("Phone Number changed successfully");
                toggleProgress(100);
            }
            else {
                const errorText = await response.text();
                toast.error(errorText);
            }
        }
        catch (error) {
            setLoader(0);
            if (error.message.substring(error.message.length - 3, error.message.length) === "401") {
                formData12.otp = "";
                toast.error("The OTP is invalid or expired");
            }
            else if (error.message.substring(error.message.length - 3, error.message.length) === "400") {
                formData12.otp = "";
                setVerify(11);
                navigate("/user-profile");
                toast.error("Some error occured. Please retry Phone Number change");
            }
            else {
                toast.error("Server error. Please try again later");
            }
        }
    }
    const handleBack12 = (event) => {
        toggleProgress(10);
        toggleProgress(70);
        setCounter1(30);
        setVerify(11);
        formData12.otp = "";
        toggleProgress(100);
        navigate("/user-profile");
    }
    const handleSubmit13 = async (event) => {
        event.preventDefault();
        try {
            const config = {
                headers: { "Authorization": `Bearer ${cookies.get('jwt')}`, },
            };
            setLoader(1);
            const response = await axios.put("/changephone", formData11, config);
            if (response.status === 200) {
                setLoader(0);
                setCounter1(30);
                toast.success("An OTP has been sent to the new Phone Number for verification");
            }
            else {
                const errorText = await response.text();
                toast.error(errorText);
            }
        }
        catch (error) {
            timeoutAndRefresh(3000);
            if (error.message.substring(error.message.length - 3, error.message.length) === "401") {
                setVerify(11);
                toast.error("Some error occured. Please retry Phone Number change");
            }
            else if (error.message.substring(error.message.length - 3, error.message.length) === "400") {
                setVerify(11);
                toast.error("Some error occured. Please retry Phone Number change");
            }
            else {
                toast.error("Server error. Please try again later");
            }
        }
    }
    const [formData21, setFormData21] = useState({
        email: "",
        password: ""
    });
    const handleInputChange21 = event => {
        const { target: { name, value } } = event;
        setFormData21(formData21 => {
            return {
                ...formData21,
                [name]: value,
            }
        })
    }
    const [formData22, setFormData22] = useState({
        otp: "",
    });
    const handleInputChange22 = event => {
        const { target: { name, value } } = event;
        setFormData22(formData22 => {
            return {
                ...formData22,
                [name]: value,
            }
        })
    }
    const handleSubmit2 = (event) => {
        toggleProgress(10);
        toggleProgress(70);
        setVerify(21);
        toggleProgress(100);
    }
    const handleSubmit21 = async (event) => {
        event.preventDefault();
        try {
            const config = {
                headers: { "Authorization": `Bearer ${cookies.get('jwt')}`, },
            };
            setLoader(1);
            const response = await axios.put("/changeemail", formData21, config);
            if (response.status === 200) {
                setLoader(0);
                toggleProgress(10);
                toggleProgress(40);
                toast.success("An OTP has been sent to the new Email ID for verification");
                setVerify(22);
                toggleProgress(100);
            }
            else {
                const errorText = await response.text();
                toast.error(errorText);
            }
        }
        catch (error) {
            timeoutAndRefresh(3000);
            if (error.message.substring(error.message.length - 3, error.message.length) === "401") {
                formData21.password = "";
                toast.error("Invalid password");
            }
            else if (error.message.substring(error.message.length - 3, error.message.length) === "400") {
                formData21.email = "";
                formData21.password = "";
                toast.error("Email ID is already registered");
            }
            else {
                toast.error("Server error. Please try again later");
            }
        }
    }
    const handleBack21 = (event) => {
        toggleProgress(10);
        toggleProgress(70);
        setVerify(0);
        formData21.email = "";
        formData11.password = "";
        toggleProgress(100);
        navigate("/user-profile");
    }
    const handleSubmit22 = async (event) => {
        event.preventDefault();
        try {
            const config = {
                headers: { "Authorization": `Bearer ${cookies.get('jwt')}`, },
            };
            setLoader(1);
            const response = await axios.put("/verifychangeemail", formData22, config);
            if (response.status === 200) {
                toggleProgress(10);
                toggleProgress(40);
                formData21.email = "";
                formData11.password = "";
                formData22.otp = "";
                timeoutAndRefresh(3000);
                toast.success("Email ID changed successfully");
                toggleProgress(100);
            }
            else {
                const errorText = await response.text();
                toast.error(errorText);
            }
        }
        catch (error) {
            setLoader(0);
            if (error.message.substring(error.message.length - 3, error.message.length) === "401") {
                formData22.otp = "";
                toast.error("The OTP is invalid or expired");
            }
            else if (error.message.substring(error.message.length - 3, error.message.length) === "400") {
                formData22.otp = "";
                setVerify(21);
                navigate("/user-profile");
                toast.error("Some error occured. Please retry Email ID change");
            }
            else {
                toast.error("Server error. Please try again later");
            }
        }
    }
    const handleBack22 = (event) => {
        toggleProgress(10);
        toggleProgress(70);
        setCounter2(30);
        setVerify(21);
        formData22.otp = "";
        toggleProgress(100);
        navigate("/user-profile");
    }
    const handleSubmit23 = async (event) => {
        event.preventDefault();
        try {
            const config = {
                headers: { "Authorization": `Bearer ${cookies.get('jwt')}`, },
            };
            setLoader(1);
            const response = await axios.put("/changeemail", formData21, config);
            if (response.status === 200) {
                setLoader(0);
                toggleProgress(10);
                toggleProgress(40);
                toast.success("An OTP has been sent to the new Email ID for verification");
                toggleProgress(100);
            }
            else {
                const errorText = await response.text();
                toast.error(errorText);
            }
        }
        catch (error) {
            timeoutAndRefresh(3000);
            if (error.message.substring(error.message.length - 3, error.message.length) === "401") {
                setVerify(21);
                navigate("/user-profile");
                toast.error("Some error occured. Please retry Email ID change");
            }
            else if (error.message.substring(error.message.length - 3, error.message.length) === "400") {
                setVerify(21);
                navigate("/user-profile");
                toast.error("Some error occured. Please retry Email ID change");
            }
            else {
                toast.error("Server error. Please try again later");
            }
        }
    }
    const [formData3, setFormData3] = useState({
        password: ""
    });
    const handleInputChange3 = event => {
        const { target: { name, value } } = event;
        setFormData3(formData3 => {
            return {
                ...formData3,
                [name]: value,
            }
        })
    }
    const handleSubmit3 = (event) => {
        toggleProgress(10);
        toggleProgress(70);
        setVerify(3);
        toggleProgress(100);
    }
    const handleSubmit31 = async (event) => {
        event.preventDefault();
        try {
            const config = {
                headers: { "Authorization": `Bearer ${cookies.get('jwt')}`, },
            };
            setLoader(1);
            const response = await axios.post("/deleteuser", formData3, config);
            if (response.status === 200) {
                setLoader(0);
                toggleProgress(10);
                toggleProgress(40);
                navigate("/");
                toast.success("Account deactivated");
                removeJwt();
            }
            else {
                const errorText = await response.text();
                toast.error(errorText);
            }
        }
        catch (error) {
            timeoutAndRefresh(3000);
            if (error.message.substring(error.message.length - 3, error.message.length) === "401") {
                toast.error("Invalid password");
            }
            else {
                toast.error("Server error. Please try again later");
            }
        }
    }
    const handleSubmit32 = (event) => {
        toggleProgress(10);
        toggleProgress(70);
        setVerify(0);
        formData3.password = "";
        toggleProgress(100);
        navigate("/user-profile");
    }
    const cookies = new Cookies();
    return (<>{cookies.get("jwt") !== undefined ?
        <div style={{ paddingTop: "10px" }}>
            <br />
            {(verify === 0) && (contentLoader === 0) ? <><h1 align="center" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>My Profile</h1>
                <div className="card mb-3 container-sm" style={{ backgroundColor: props.mode === 'dark' ? '#495057' : 'white', maxWidth: "800px", paddingTop: "30px", paddingBottom: "30px" }}>
                    <div className="row g-0">
                        <div className="col-md-4" style={{ paddingLeft: "5px", paddingTop: "45px", paddingBottom: "100px", paddingRight: "20px", borderRight: `1px solid ${props.mode === 'dark' ? 'white' : 'black'}`, color: props.mode === 'dark' ? 'white' : 'black' }}>
                            <img src="/defaultprofile.jpg" className="img-fluid rounded" alt="..." />
                            <h4 align="center" className="card-title" style={{ paddingTop: "10px" }}>{response.name}</h4>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body" style={{ paddingLeft: "25px", paddingTop: "95px", color: props.mode === 'dark' ? 'white' : 'black' }}>
                                <h4 className="card-title"><FaPhoneAlt /> Phone Number : {response.phone}</h4>
                                <h4 className="card-title"><MdMarkEmailRead /> Email ID : {response.email}</h4>
                                <h4 className="card-title"><GiTicket /> Active Tickets : {response.tickets}</h4>
                                <form className="row g-3" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
                                    <div style={{ paddingTop: "40px" }}>
                                        <button type="submit" className="btn btn-success" style={{ backgroundColor: "rgb(19 203 19)", color: "white" }} value="change_phone_no" onClick={handleSubmit1}>Update Phone Number</button>
                                        <span style={{ paddingLeft: "10px" }}></span>
                                        <button type="submit" className="btn btn-success" style={{ backgroundColor: "rgb(19 203 19)", color: "white" }} value="change_email_id" onClick={handleSubmit2}>Update Email ID</button>
                                    </div>
                                    <div style={{ paddingTop: "10px" }}>
                                        <button type="submit" className="btn btn-danger" value="deactivate_account" onClick={handleSubmit3}>Deactivate Account</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div></> : <></>}
            {contentLoader === 1 ? <>
                <div className="card mb-3 container-sm" style={{ backgroundColor: props.mode === 'dark' ? '#495057' : 'white', maxWidth: "800px", paddingTop: "30px", paddingBottom: "30px" }}>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <ContentLoader
                        speed={2}
                        width={800}
                        height={160}
                        viewBox="0 0 400 160"
                        backgroundColor={`${props.mode === 'dark' ? "black" : "#f3f3f3"}`}
                        foregroundColor="grey"
                        {...props}
                    ></ContentLoader>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            </> : <></>
            }
            {(verify === 11) && (loader === 0) ? <>
                <div className="card mb-3 container-sm" style={{ backgroundColor: props.mode === 'dark' ? '#495057' : 'white', maxWidth: "800px", paddingTop: "30px", paddingBottom: "30px" }}>
                    <h1 align="center" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>Update Phone Number</h1>
                    <br />
                    <form className="row g-3" style={{ color: props.mode === 'dark' ? 'white' : 'black' }} >
                        <div className="col-md-12">
                            <input type="text" className={`form-control input ${props.mode === 'dark' ? "white-placeholder" : ""}`} style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }} name="phone" placeholder="New Phone Number" value={formData11.phone} onChange={handleInputChange11} required />
                        </div>
                        <div className="col-md-12">
                            <div className="input-group flex-nowrap">
                                <input type={type} className={`form-control input ${props.mode === 'dark' ? "white-placeholder" : ""}`} name="password" style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }} placeholder="Password" value={formData11.password} onChange={handleInputChange11} autoComplete="current-password" required />
                                <span class="input-group-text" id="addon-wrapping" onClick={handleToggle}>
                                    <Icon class="absolute mr-10" icon={icon} size={25} />
                                </span>
                            </div>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary" value="continue" onClick={handleSubmit11}>Continue</button>
                            <span style={{ paddingLeft: "10px" }}></span>
                            <button type="submit" className="btn btn-danger" value="back" onClick={handleBack11}>Back</button>
                        </div>
                    </form>
                    <br />
                </div>
                <br />
                <br /></> : <></>}
            {(verify === 12) && (loader === 0) ? <>
                <div className="card mb-3 container-sm" style={{ backgroundColor: props.mode === 'dark' ? '#495057' : 'white', maxWidth: "800px", paddingTop: "30px", paddingBottom: "30px" }}>
                    <h1 align="center" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>Update Phone Number</h1>
                    <br />
                    <form className="row g-3" style={{ color: props.mode === 'dark' ? 'white' : 'black' }} >
                        <div className="col-md-12">
                            <input type="text" className={`form-control input ${props.mode === 'dark' ? "white-placeholder" : ""}`} style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }} name="otp" placeholder="OTP received on new Phone" value={formData12.otp} onChange={handleInputChange12} required />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary" value="update" onClick={handleSubmit12}>Update</button>
                            <span style={{ paddingLeft: "10px" }}></span>
                            {counter1 === 0 ? <><button type="submit" className="btn btn-success" style={{ backgroundColor: "rgb(19 203 19)", color: "white" }} onClick={handleSubmit13}>Resend OTP</button></> : <></>}
                            {counter1 === 0 ? <></> : <><h7 class="card-subtitle mb-2" style={{ color: "#04f704" }}>Resend OTP in <SpancounterProp start="30" end="0" durationinseconds="30" setCounter={setCounter1} /> Seconds</h7></>}
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-danger" value="back" onClick={handleBack12}>Back</button>
                        </div>
                    </form>
                    <br />
                </div>
                <br />
                <br /></> : <></>}
            {(verify === 21) && (loader === 0) ? <>
                <div className="card mb-3 container-sm" style={{ backgroundColor: props.mode === 'dark' ? '#495057' : 'white', maxWidth: "800px", paddingTop: "30px", paddingBottom: "30px" }}>
                    <h1 align="center" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>Update Email ID</h1>
                    <br />
                    <form className="row g-3" style={{ color: props.mode === 'dark' ? 'white' : 'black' }} >
                        <div className="col-md-12">
                            <input type="text" className={`form-control input ${props.mode === 'dark' ? "white-placeholder" : ""}`} style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }} name="email" placeholder="New Email ID" value={formData21.email} onChange={handleInputChange21} required />
                        </div>
                        <div className="col-md-12">
                            <div className="input-group flex-nowrap">
                                <input type={type} className={`form-control input ${props.mode === 'dark' ? "white-placeholder" : ""}`} name="password" style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }} placeholder="Password" value={formData21.password} onChange={handleInputChange21} autoComplete="current-password" required />
                                <span class="input-group-text" id="addon-wrapping" onClick={handleToggle}>
                                    <Icon class="absolute mr-10" icon={icon} size={25} />
                                </span>
                            </div>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary" value="continue" onClick={handleSubmit21}>Continue</button>
                            <span style={{ paddingLeft: "10px" }}></span>
                            <button type="submit" className="btn btn-danger" value="back" onClick={handleBack21}>Back</button>
                        </div>
                    </form>
                    <br />
                </div>
                <br />
                <br /></> : <></>}
            {(verify === 22) && (loader === 0) ? <>
                <div className="card mb-3 container-sm" style={{ backgroundColor: props.mode === 'dark' ? '#495057' : 'white', maxWidth: "800px", paddingTop: "30px", paddingBottom: "30px" }}>
                    <h1 align="center" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>Update Email ID</h1>
                    <br />
                    <form className="row g-3" style={{ color: props.mode === 'dark' ? 'white' : 'black' }} >
                        <div className="col-md-12">
                            <input type="text" className={`form-control input ${props.mode === 'dark' ? "white-placeholder" : ""}`} style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }} name="otp" placeholder="OTP received on new Email" value={formData22.otp} onChange={handleInputChange22} required />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary" value="update" onClick={handleSubmit22}>Update</button>
                            <span style={{ paddingLeft: "10px" }}></span>
                            {counter2 === 0 ? <><button type="submit" className="btn btn-success" style={{ backgroundColor: "rgb(19 203 19)", color: "white" }} onClick={handleSubmit23}>Resend OTP</button></> : <></>}
                            {counter2 === 0 ? <></> : <><h7 class="card-subtitle mb-2" style={{ color: "#04f704" }}>Resend OTP in <SpancounterProp start="30" end="0" durationinseconds="30" setCounter={setCounter2} /> Seconds</h7></>}
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-danger" value="back" onClick={handleBack22}>Back</button>
                        </div>
                    </form>
                    <br />
                </div>
                <br />
                <br /></> : <></>}
            {(verify === 3) && (loader === 0) ? <>
                <div className="card mb-3 container-sm" style={{ backgroundColor: props.mode === 'dark' ? '#495057' : 'white', maxWidth: "800px", paddingTop: "30px", paddingBottom: "30px" }}>
                    <h1 align="center" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>Deactivate Account</h1>
                    <br />
                    <form className="row g-3" style={{ color: props.mode === 'dark' ? 'white' : 'black' }} >
                        <div className="col-md-12">
                            <div className="input-group flex-nowrap">
                                <input type={type} className={`form-control input ${props.mode === 'dark' ? "white-placeholder" : ""}`} name="password" style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }} placeholder="Password" value={formData3.password} onChange={handleInputChange3} autoComplete="current-password" required />
                                <span class="input-group-text" id="addon-wrapping" onClick={handleToggle}>
                                    <Icon class="absolute mr-10" icon={icon} size={25} />
                                </span>
                            </div>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary" value="deactivate_account" onClick={handleSubmit31}>Confirm</button>
                            <span style={{ paddingLeft: "10px" }}></span>
                            <button type="submit" className="btn btn-danger" value="back" onClick={handleSubmit32}>Back</button>
                        </div>
                    </form>
                    <br />
                </div>
                <br />
                <br /></> : <></>}
            {loader !== 1 ? <></> : <>
                <div className="card mb-3 container-sm" style={{ backgroundColor: props.mode === 'dark' ? '#495057' : 'white', maxWidth: "800px", paddingTop: "30px", paddingBottom: "30px" }}>
                    <br />
                    <br />
                    <br />
                    <TailSpin
                        visible={true}
                        height="80"
                        width="950"
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
                </div>
            </>}
        </div> : <><LogoutError mode={props.mode} /></>}</>
    )
}

export default Userprofile
