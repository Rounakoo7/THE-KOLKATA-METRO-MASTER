import React, { useState, useEffect } from 'react'
import axios from './Axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom'
import Linesandstations from './Linesandstations';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import Spancounter from './Spancounter'
import { toast } from 'react-toastify';
import LogoutError from './LogoutError';

function Usernavigate(props) {
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
  var stationcolour = {
    1 : "blue",
    2 : "#1de11d",
    3 : "#b806b8",
    4 : "red",
    5 : "#fb0793",
    6 : "#ff6500",
    7 : "grey",
  }
  const navigate = useNavigate();
  const [counter, setCounter] = useState(0);
  const startCounter = () => {
    if (counter <= 99) {
      setTimeout(() => {
        setCounter(counter + 1);
      }, 2/nodecount);
    }
  }
  const search = (property_value, array) => {
    return array.filter((x) => x.id === property_value)[0].name;
  }
  const [lbool1, setLbool1] = useState("");
  const [lbool2, setLbool2] = useState("");
  const handleline = (e) => {
    if(e === "Line1"){
      setLbool1(e);
      setFormData(formData => {
        return {
          ...formData,
          ["station1"]: "Station",
        }
      })
    }
    else if(e === "Line2"){
      setLbool2(e);
      setFormData(formData => {
        return {
          ...formData,
          ["station2"]: "Station",
        }
      })
    }
    else{
      setLbool1(e);
      setLbool2(e);
    }
    return 0
  }
  const [formData, setFormData] = useState({
    station1: "Station",
    station2: "Station"
  });
  const handleInputChange = event => {
    const { target: { name, value } } = event;
   if(value === "Station"){
      setFormData(formData => {
        return {
          ...formData,
          [name]: value,
        }
      })
    }
    else{
      setFormData(formData => {
        return {
          ...formData,
          [name]: search(`${value}`, stations),
        }
      })
    }
  }
  const [avgspeed, setAvgspeed] = useState(0.00);
  const [nodecount, setNodecount] = useState(0);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0.00);
  const [fare, setFare] = useState(0);
  const [path, setPath] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if((formData.station1 !== "Station") && (formData.station2 !== "Station") && (lbool1 !== "Line1") && (lbool2 !== "Line2")){
      if(formData.station1 !== formData.station2){
      setAvgspeed(0.00);
      setNodecount(0);
      setDistance(0);
      setTime(0.00);
      setFare(0);
      setPath([]);
      setCounter(0);
      try {
        const config = {
          headers: { "Authorization": `Bearer ${cookies.get('jwt')}`, },
        };
        const response = await axios.post("/fw",formData,config);
        if (response.status === 201){
          toggleProgress(10);
          setAvgspeed(response.data.avgspeed);
          setNodecount(response.data.nodecount);
          setDistance(response.data.distance);
          setTime(response.data.time);
          setFare(response.data.fare);
          toggleProgress(70);
          setPath(response.data.path);
          toggleProgress(100);
        }
        else {
          const errorData = await response.json()
          toast.error(errorData.message);
        }
      }
      catch(error) {
        if (error.message.substring(error.message.length - 3,error.message.length) === "401"){
          toast.error("Unauthorized");
        } 
        else if (error.message.substring(error.message.length - 3,error.message.length) === "400"){
          toast.error("Search fields are wrong");
        }
        else {
          toast.error("Server error. Please try again later");
        }
      }
      }
      else{
        toast.error("Search fields are same");  
      }
    }
    else{
      toast.error("Search fields are empty");
    }
  }
  return (<>{cookies.get("jwt") !== undefined?
    <div>
      <br />
      <div className="container-sm" style={{ backgroundColor: props.mode === 'dark' ? '#495057' : 'white', maxWidth: "1500px" }}>
        <h1 align="center" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>Navigate</h1>
        <br />
        <form className="row g-3" style={{ color: props.mode === 'dark' ? 'white' : 'black' }} onSubmit={handleSubmit}>
          <div className="col-6">
            <label style={{ paddingBottom: "20px" }}>Select Source Station</label>
            <Linesandstations mode={props.mode} name="station1" handleInputChange={handleInputChange} handleline={handleline} />
          </div>
          <div className="col-6">
            <label style={{ paddingBottom: "20px" }}>Select Destination Station</label>
            <Linesandstations mode={props.mode} name="station2" handleInputChange={handleInputChange} handleline={handleline} />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary" >Search</button>
            <span style={{ paddingLeft: "10px" }}></span>
            <button type="submit" className="btn btn-danger" onClick={() => navigate("/..")}>Back</button>
          </div>
        </form>
        <br />
        <br />
        {nodecount === 0?<></>:<>{startCounter()}
        <div style={{ overflow: "scroll", maxWidth: "1500px", paddingLeft: "70px",  paddingRight: "70px",border: "1px solid black", backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white' }}>
          <br />
          <br />
          <ProgressBar percent={counter} filledBackground="linear-gradient(to right, #fefb72, #fefb72)" width={`${nodecount*200}px`}>
            {path.map( (st, index) => {
                  return (
                    <Step transition="scale">
                      {({ accomplished }) => (
                        <span className="badge rounded-pill text" style={{ filter: `grayscale(${accomplished ? 0: (index === (nodecount - 1) ? 0: 100)}%)`, backgroundColor: `${stationcolour[stations.find((station) => (station.name === st)).lineId]}` }}>{st}</span>
                      )}
                    </Step>
                  )
              })
            }
          </ProgressBar>
          <br />
          <br />
        </div>
        <br />
        <div className="row g-2">
          <div className="col-6">
            <div className="table-responsive" style={{ backgroundColor: props.mode === 'dark' ? '#495057' : 'white', maxWidth: "700px", maxHeight: "400px" }}>
              <table className={`table table-striped table-hover table-bordered`}>
                <thead>
                  <tr>
                    <th scope="col">Sl No.</th>
                    <th scope="col">Colour</th>
                    <th scope="col">Line</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td style={{ backgroundColor: "blue" }}></td>
                    <td>Blue</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td style={{ backgroundColor: "#1de11d" }}></td>
                    <td>Green</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td style={{ backgroundColor: "#b806b8" }}></td>
                    <td>Purple</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td style={{ backgroundColor: "red" }}></td>
                    <td>Red</td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td style={{ backgroundColor: "#fb0793" }}></td>
                    <td>Pink</td>
                  </tr>
                  <tr>
                    <th scope="row">6</th>
                    <td style={{ backgroundColor: "#ff6500" }}></td>
                    <td>Orange</td>
                  </tr>
                  <tr>
                    <th scope="row">7</th>
                    <td style={{ backgroundColor: "grey" }}></td>
                    <td>Interchange</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-6">
            <div className="container text-center">
              <div className="row g-2">
                <div className="col-12" style={{ paddingTop: "40px", color: props.mode === 'dark' ? 'white' : 'black' }}>
                  <h3>The Average Speed is <Spancounter start="0" end={`${avgspeed}`} durationinseconds="0.1" /> Kilometers/Hour</h3>
                </div>
                <div className="col-6" style={{ paddingTop: "10px" }}>
                  <div className="p-3" style={{ backgroundColor: "#d088f8", border: "1px solid #3a0c3a" }}><Spancounter start="0" end={`${nodecount}`} durationinseconds="0.1" /> Stations</div>
                </div>
                <div className="col-6" style={{ paddingTop: "10px" }}>
                  <div className="p-3" style={{ backgroundColor: "#d088f8", border: "1px solid #3a0c3a" }} ><Spancounter start="0" end={`${distance}`} durationinseconds="0.1" /> Kilometers</div>
                </div>
                <div className="col-6" style={{ paddingTop: "10px" }}>
                  <div className="p-3" style={{ backgroundColor: "#d088f8", border: "1px solid #3a0c3a" }} ><Spancounter start="0" end={`${time}`} durationinseconds="0.1" /> Minutes</div>
                </div>
                <div className="col-6" style={{ paddingTop: "10px" }}>
                  <div className="p-3" style={{ backgroundColor: "#d088f8", border: "1px solid #3a0c3a" }} ><Spancounter start="0" end={`${fare}`} durationinseconds="0.1" /> Rupees</div>
                </div>
              </div>
            </div>
          </div>
        </div></>}
      </div>
      <br />
      <br />
    </div>:<><LogoutError mode={props.mode} /></>}</>
  )
}

export default Usernavigate

