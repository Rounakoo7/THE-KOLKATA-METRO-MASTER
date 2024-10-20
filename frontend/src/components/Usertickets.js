import React, { useState, useEffect } from 'react'
import axios from './Axios';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import LogoutError from './LogoutError';
import { FaTrainSubway } from "react-icons/fa6";
import { FaRoute } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { RiPinDistanceFill } from "react-icons/ri";
import { GiTicket } from "react-icons/gi";
import { BsCalendarDateFill } from "react-icons/bs";

function Usertickets(props) {
  const toggleProgress = props.toggleProgress
  const [response, setResponse] = useState([])
  const handleGet = async () => {
    toggleProgress(70);
    try {
      const config = {
        headers: { "Authorization": `Bearer ${cookies.get('jwt')}`, },
      };
      const response = await axios.get("/showtickets", config);
      if (response.status === 200) {
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
  const cookies = new Cookies();
  return (<>{cookies.get("jwt") !== undefined ?
    <div>
      <br />
      <div className="container-sm" style={{ backgroundColor: props.mode === 'dark' ? '#495057' : 'white', maxWidth: "1000px" }}>
        <h1 align="center" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>My Tickets</h1>
        <br />
        <div style={{ paddingTop: "10px" }}>
          {response.length != 0 ?
            response.map((ticket, index) => {
              return (
                <div className="card mb-3 container-sm" style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', maxWidth: "930px", paddingTop: "10px", paddingBottom: "10px" }}>
                  <div className="row g-0">
                    <div className="col-md-4" style={{ paddingLeft: "5px", paddingTop: "15px", paddingBottom: "10px", paddingRight: "10px", borderRight: `1px solid ${props.mode === 'dark' ? 'white' : 'black'}`, color: props.mode === 'dark' ? 'white' : 'black' }}>
                      <h5 className="card-title" style={{ border: `1px solid ${props.mode === 'dark' ? 'white' : 'black'}` }}><span style={{ paddingLeft: "65px" }}></span><GiTicket /> Ticket Id : {ticket.id}</h5>
                      <br />
                      <h5 className="card-title"><IoPeople /> Passengers : {ticket.passengers}</h5>
                      <h5 className="card-title"><RiMoneyRupeeCircleFill /> Fare : {ticket.fare} rupees</h5>
                      <h5 className="card-title"><RiPinDistanceFill /> Distance : {ticket.distance} {ticket.distance === 1 ? "km" : "kms"}</h5>
                    </div>
                    <div className="col-md-8" style={{ paddingTop: "5px" }}>
                      <div className="card-body" style={{ paddingLeft: "25px", paddingTop: "15px", paddingBottom: "10px", color: props.mode === 'dark' ? 'white' : 'black' }}>
                        <h5 className="card-title"><FaTrainSubway /> Source Station : {ticket.station1}</h5>
                        <br />
                        <h6 className="card-title"><FaRoute /> Interchanges : {ticket.interchange_path[0] === "NULL" ? "No Interchanges" : `${ticket.interchange_path.join(" -> ")}`}</h6>
                        <br />
                        <h5 className="card-title"><FaTrainSubway /> Destination Station : {ticket.station2}</h5>
                      </div>
                    </div>
                    <div style={{ paddingLeft: "5px", paddingTop: "5px", color: props.mode === 'dark' ? 'white' : 'black' }}>
                      <h6 className="card-title"><BsCalendarDateFill /> Booking Time : {ticket.booking_time.replace("T", " :: ")}<span style={{ paddingLeft: "209px" }}></span><BsCalendarDateFill /> Expiry Time : {ticket.expiry_time.replace("T", " :: ")}</h6>
                    </div>
                  </div>
                </div>)
            }) : <h2 align="center" style={{ color: props.mode === 'dark' ? 'white' : 'black' }} >No Active Tickets</h2>
          }
          <br />
        </div>
      </div>
      <br />
      <br />
    </div> : <><LogoutError mode={props.mode} /></>}</>
  )
}

export default Usertickets