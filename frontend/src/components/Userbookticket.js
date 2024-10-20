import React, { useState, useEffect } from 'react'
import axios from './Axios';
import Cookies from 'universal-cookie';
import Linesandstations from './Linesandstations';
import { toast } from 'react-toastify';
import LogoutError from './LogoutError';
import { FaTrainSubway } from "react-icons/fa6";
import { FaRoute } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaStopwatch } from "react-icons/fa6";
import { RiPinDistanceFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

function Userbookticket(props) {
    const toggleProgress = props.toggleProgress
    useEffect(() => {
        toggleProgress(70);
        toggleProgress(100);
        return () => {
        }
    }, [])
    const cookies = new Cookies();
    const stations = [
        { id: "1", lineId: "1", name: "Shahid Khudiram" },
        { id: "2", lineId: "1", name: "Gitanjali" },
        { id: "3", lineId: "1", name: "Kavi Nazrul" },
        { id: "4", lineId: "1", name: "Masterda Surya Sen" },
        { id: "5", lineId: "1", name: "Netaji" },
        { id: "6", lineId: "1", name: "Mahanayak Uttam Kumar" },
        { id: "7", lineId: "1", name: "Rabindra Sarobar" },
        { id: "8", lineId: "1", name: "Kalighat" },
        { id: "9", lineId: "1", name: "Jatin Das Park" },
        { id: "10", lineId: "1", name: "Netaji Bhavan" },
        { id: "11", lineId: "1", name: "Rabindra Sadan" },
        { id: "12", lineId: "1", name: "Maidan" },
        { id: "13", lineId: "1", name: "Chandni Chowk" },
        { id: "14", lineId: "1", name: "Central" },
        { id: "15", lineId: "1", name: "Mahatma Gandhi Road" },
        { id: "16", lineId: "1", name: "Girish Park" },
        { id: "17", lineId: "1", name: "Shobhabazar Sutanuti" },
        { id: "18", lineId: "1", name: "Shyambazar" },
        { id: "19", lineId: "1", name: "Belgachhia" },
        { id: "20", lineId: "1", name: "Dum Dum" },
        { id: "21", lineId: "1", name: "Dakshineswar" },
        { id: "22", lineId: "2", name: "Howrah Maidan" },
        { id: "23", lineId: "2", name: "Howrah" },
        { id: "24", lineId: "2", name: "MahaKaran" },
        { id: "25", lineId: "2", name: "Sealdah" },
        { id: "26", lineId: "2", name: "Phoolbagan" },
        { id: "27", lineId: "2", name: "Salt Lake Stadium" },
        { id: "28", lineId: "2", name: "Bengal Chemical" },
        { id: "29", lineId: "2", name: "City Center" },
        { id: "30", lineId: "2", name: "Cenrtral Park" },
        { id: "31", lineId: "2", name: "Karunamoyee" },
        { id: "32", lineId: "2", name: "Keshtopur" },
        { id: "33", lineId: "2", name: "Dum Dum Park" },
        { id: "34", lineId: "2", name: "Baguiati" },
        { id: "35", lineId: "2", name: "Raghunathpur" },
        { id: "36", lineId: "3", name: "Victoria" },
        { id: "37", lineId: "3", name: "Kidderpore" },
        { id: "38", lineId: "3", name: "Mominpore" },
        { id: "39", lineId: "3", name: "Majerhat" },
        { id: "40", lineId: "3", name: "Taratala" },
        { id: "41", lineId: "3", name: "Behala Bazar" },
        { id: "42", lineId: "3", name: "Behala Chowrasta" },
        { id: "43", lineId: "3", name: "Sakherbazar" },
        { id: "44", lineId: "3", name: "Thakurpur" },
        { id: "45", lineId: "3", name: "Joka" },
        { id: "46", lineId: "3", name: "IIM" },
        { id: "47", lineId: "3", name: "Diamond Park" },
        { id: "48", lineId: "4", name: "Dum Dum Cant" },
        { id: "49", lineId: "4", name: "Jessore Road" },
        { id: "50", lineId: "4", name: "Birati" },
        { id: "51", lineId: "4", name: "Michael Nagar" },
        { id: "52", lineId: "4", name: "New Barrackpur" },
        { id: "53", lineId: "4", name: "Madhyamgram" },
        { id: "54", lineId: "4", name: "Hridaypur" },
        { id: "55", lineId: "4", name: "Barasat" },
        { id: "56", lineId: "5", name: "Kamarhati" },
        { id: "57", lineId: "5", name: "Agarpara" },
        { id: "58", lineId: "5", name: "Sodepur" },
        { id: "59", lineId: "5", name: "Panihati" },
        { id: "60", lineId: "5", name: "Subash Nagar" },
        { id: "61", lineId: "5", name: "Khardaha" },
        { id: "62", lineId: "5", name: "Tata Gate" },
        { id: "63", lineId: "5", name: "Titagarh" },
        { id: "64", lineId: "5", name: "Talpukur" },
        { id: "65", lineId: "5", name: "Barrackpore" },
        { id: "66", lineId: "6", name: "Satyajit Ray" },
        { id: "67", lineId: "6", name: "Kavi Sukanta" },
        { id: "68", lineId: "6", name: "Jyotindra Nath Nandi" },
        { id: "69", lineId: "6", name: "Hemanta Mukhapadhyay" },
        { id: "70", lineId: "6", name: "Vip Bazar" },
        { id: "71", lineId: "6", name: "Ritwik Ghatak" },
        { id: "72", lineId: "6", name: "Barun Sengupta" },
        { id: "73", lineId: "6", name: "Beliaghata" },
        { id: "74", lineId: "6", name: "Gour Kishor Ghosh" },
        { id: "75", lineId: "6", name: "Nicco Park" },
        { id: "76", lineId: "6", name: "Technopolis" },
        { id: "77", lineId: "6", name: "Bidhan Nagar" },
        { id: "78", lineId: "6", name: "Sub Cbd 1" },
        { id: "79", lineId: "6", name: "Cbd 1" },
        { id: "80", lineId: "6", name: "Kalakhetra" },
        { id: "81", lineId: "6", name: "New Town" },
        { id: "82", lineId: "6", name: "Convention Centre" },
        { id: "83", lineId: "6", name: "Sub Cbd 2" },
        { id: "84", lineId: "6", name: "Titumir" },
        { id: "85", lineId: "6", name: "Rabindra Tirtha" },
        { id: "86", lineId: "7", name: "Kavi Subhash" },
        { id: "87", lineId: "7", name: "Park Street" },
        { id: "88", lineId: "7", name: "Esplanade" },
        { id: "89", lineId: "7", name: "Noapara" },
        { id: "90", lineId: "7", name: "Baranagar" },
        { id: "91", lineId: "7", name: "Salt Lake Sector-V" },
        { id: "92", lineId: "7", name: "Teghoria" },
        { id: "93", lineId: "7", name: "Biman Bandar" },
    ]
    const navigate = useNavigate();
    const handleBack = (event) => {
        event.preventDefault();
        setPhone("");
        setStation1("");
        setStation2("");
        setDistance(0);
        setDuration(0);
        setFare(0);
        setPassengers(0);
        setInterchange_path([]);
        navigate("/book-ticket");
    }
    const search = (property_value, array) => {
        return array.filter((x) => x.id === property_value)[0].name;
    }
    const [lbool1, setLbool1] = useState("");
    const [lbool2, setLbool2] = useState("");
    const handleline = (e) => {
        if (e === "Line1") {
            setLbool1(e);
            setFormData(formData => {
                return {
                    ...formData,
                    ["station1"]: "Station",
                }
            })
        }
        else if (e === "Line2") {
            setLbool2(e);
            setFormData(formData => {
                return {
                    ...formData,
                    ["station2"]: "Station",
                }
            })
        }
        else {
            setLbool1(e);
            setLbool2(e);
        }
        return 0
    }
    const [formData, setFormData] = useState({
        station1: "Station",
        station2: "Station",
        passengers: 1
    });
    const handleInputChange = (event) => {
        const { target: { name, value } } = event;
        if (value === "Station") {
            setFormData(formData => {
                return {
                    ...formData,
                    [name]: value,
                }
            })
        }
        else if (name === "passengers") {
            setFormData(formData => {
                return {
                    ...formData,
                    [name]: Number(value),
                }
            })
        }
        else {
            setFormData(formData => {
                return {
                    ...formData,
                    [name]: search(`${value}`, stations),
                }
            })
        }
    }
    const [phone, setPhone] = useState("")
    const [station1, setStation1] = useState("");
    const [station2, setStation2] = useState("");
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(0);
    const [fare, setFare] = useState(0);
    const [passengers, setPassengers] = useState(0)
    const [interchange_path, setInterchange_path] = useState([]);
    const handleSubmit1 = async (event) => {
        event.preventDefault();
        if ((formData.station1 !== "Station") && (formData.station2 !== "Station") && (lbool1 !== "Line1") && (lbool2 !== "Line2")) {
            if (formData.station1 !== formData.station2) {
                setPhone("");
                setStation1("");
                setStation2("");
                setDistance(0);
                setDuration(0);
                setFare(0);
                setPassengers(0);
                setInterchange_path([]);
                try {
                    const config = {
                        headers: { "Authorization": `Bearer ${cookies.get('jwt')}`, },
                    };
                    const response = await axios.post("/getticketdata", formData, config);
                    if (response.status === 201) {
                        toggleProgress(10);
                        setPhone(response.data.phone);
                        setStation1(response.data.station1);
                        setStation2(response.data.station2);
                        setDistance(response.data.distance);
                        setDuration(response.data.duration);
                        setFare(response.data.fare);
                        toggleProgress(70);
                        setPassengers(response.data.passengers);
                        setInterchange_path(response.data.interchange_path);
                        toggleProgress(100);
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
                    else if (error.message.substring(error.message.length - 3, error.message.length) === "400") {
                        toast.error("Search fields are wrong");
                    }
                    else {
                        toast.error("Server error. Please try again later");
                    }
                }
            }
            else {
                toast.error("Search fields are same");
            }
        }
        else {
            toast.error("Search fields are empty");
        }
    }
    const handleSubmit2 = async (event) => {
        event.preventDefault();
        const data = {
            phone: phone,
            station1: station1,
            station2: station2,
            distance: distance,
            duration: duration * 60,
            fare: fare,
            passengers: passengers,
            interchange_path: interchange_path    
        }
            try {
                const config = { 
                    headers: { "Authorization": `Bearer ${cookies.get('jwt')}`, },
                };
                const response = await axios.post("/issueticket", data, config);
                if (response.status === 201) {
                    toast.success("Ticket booked successfully");
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
                else if (error.message.substring(error.message.length - 3, error.message.length) === "400") {
                    toast.error("Search fields are wrong");
                }
                else {
                    toast.error("Server error. Please try again later");
                }
            }
    }
    return (<>{cookies.get("jwt") !== undefined ?
        <div>
            <br />
            <div className="container-sm" style={{ backgroundColor: props.mode === 'dark' ? '#495057' : 'white', maxWidth: "800px" }}>
                <h1 align="center" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>Book Ticket</h1>
                <br />
                {fare !== 0 ? <></> : <><form className="row g-3" style={{ color: props.mode === 'dark' ? 'white' : 'black' }} onSubmit={handleSubmit1}>
                    <div className="col-12">
                        <label style={{ paddingBottom: "20px" }}>Select Source Station</label>
                        <Linesandstations mode={props.mode} name="station1" handleInputChange={handleInputChange} handleline={handleline} />
                    </div>
                    <div className="col-12">
                        <label style={{ paddingBottom: "20px" }}>Select Destination Station</label>
                        <Linesandstations mode={props.mode} name="station2" handleInputChange={handleInputChange} handleline={handleline} />
                    </div>
                    <div className="col-6">
                        <label style={{ paddingBottom: "20px" }}>Select Number of Passengers</label>
                        <select id="passengers" name="passengers" className="form-select" aria-label="Default select example" style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }} onChange={(e) => handleInputChange(e)} required>
                            <option key="1" value={1} style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }}>1</option>
                            <option key="2" value={2} style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }}>2</option>
                            <option key="3" value={3} style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }}>3</option>
                            <option key="4" value={4} style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }}>4</option>
                        </select>
                    </div>
                    <div className="col-12" style={{ paddingBottom: "20px" }}>
                        <button type="submit" className="btn btn-primary" >Book</button>
                    </div>
                </form></>}
                {fare === 0 ? <></> : <><div style={{ paddingTop: "10px" }}>
                        <div className="card mb-3 container-sm" style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', maxWidth: "900px", paddingTop: "30px", paddingBottom: "10px" }}>
                            <div className="row g-0">
                                <div className="col-md-4" style={{ paddingLeft: "5px", paddingTop: "45px", paddingBottom: "10px", paddingRight: "15px", borderRight: `1px solid ${props.mode === 'dark' ? 'white' : 'black'}`, color: props.mode === 'dark' ? 'white' : 'black' }}>
                                    <h6 className="card-title" ><FaPhoneAlt /> User Phone : {phone}</h6>
                                    <br />
                                    <h5 className="card-title"><IoPeople /> Passengers : {passengers}</h5>
                                    <h5 className="card-title"><RiMoneyRupeeCircleFill /> Fare : {fare} rupees</h5>
                                    <h5 className="card-title"><RiPinDistanceFill /> Distance : {distance} {distance === 1? "km":"kms"}</h5>
                                    <h5 className="card-title"><FaStopwatch /> Duration : {duration/2} minutes</h5>
                                </div>
                                <div className="col-md-8"style={{ paddingTop: "35px"}}>
                                    <div className="card-body" style={{ paddingLeft: "25px", paddingTop: "10px", color: props.mode === 'dark' ? 'white' : 'black' }}>
                                        <h5 className="card-title"><FaTrainSubway /> Source Station : {station1}</h5>
                                        <br />
                                        <h6 className="card-title"><FaRoute /> Interchanges : {interchange_path[0] === "NULL"? "No Interchanges": `${interchange_path.join(" -> ")}`}</h6>
                                        <br />
                                        <h5 className="card-title"><FaTrainSubway /> Destination Station : {station2}</h5>
                                        <form className="row g-3" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
                                        <div style={{ paddingTop: "40px" }}>
                                            <button type="submit" className="btn btn-primary" value="payment" onClick={handleSubmit2}>Confirm</button>
                                            <span style={{ paddingLeft: "10px" }}></span>
                                            <button type="submit" className="btn btn-danger" value="back" onClick={handleBack}>Back</button>
                                        </div>
                                        </form>
                                    </div>
                                </div>
                            </div>    
                            <br />
                            <h6 className="card-title" style={{color: "red"}}>Note : The ticket will be available for only twice the duration of the journey !</h6>
                        </div>
                        <br />
                    </div></>}
            </div>
            <br />
            <br />
        </div> : <><LogoutError mode={props.mode} /></>}</>
    )
}

export default Userbookticket