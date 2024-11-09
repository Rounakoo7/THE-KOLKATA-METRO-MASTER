import React from 'react'
import Cookies from 'universal-cookie'
import LoginError from './LoginError';
import { useEffect } from 'react';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function About(props) {
  const toggleProgress = props.toggleProgress
  useEffect(() => {
    toggleProgress(70);
    toggleProgress(100);
    return () => {
    }
  }, [])
  const cookies = new Cookies();
  return (<>{cookies.get("jwt") === undefined ?
    <div className="container">
      <br /><br />
      <h1 className="my-3" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>About The Project</h1>
      <br />
      <div className="accordion" id="accordionExample" style={{ border: props.mode === 'dark' ? '2px solid rounded white' : 'black' }}>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" style={{ backgroundColor: props.mode === 'dark' ? '#495057' : '#cfe2ff', color: props.mode === 'dark' ? 'white' : 'black' }} data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              <strong>Problem Statement</strong>
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body" style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', color: props.mode === 'dark' ? 'white' : 'black', border: props.mode === 'dark' ? '0.5px solid white' : 'black' }}>
              A newcomer in KOLKATA is more likely to face problems <strong>in identifying the shortest route between his/her source and destination stations</strong> in the complex map that KOLKATA METRO offers. This is a simple <strong>ReactJS, Spring Boot and MySQL based website</strong> that will help the user <strong>to navigate throughout the metro map and book unreserverd tickets online.</strong>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" style={{ backgroundColor: props.mode === 'dark' ? '#495057' : '#cfe2ff', color: props.mode === 'dark' ? 'white' : 'black' }} data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              <strong>Features</strong>
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <dicvbv className="accordion-body" style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', color: props.mode === 'dark' ? 'white' : 'black', border: props.mode === 'dark' ? '0.5px solid white' : 'black' }}>
              <strong>1.</strong> User can switch between a <strong>Normal mode</strong> and a <strong>Dark mode.</strong>
              <br></br>
              <strong>2.</strong> User can perform basic <strong>CRUD operations</strong> like <strong>Sign up, Book unreserved tickets, View profile data, View active booked tickets, Change password, Update phone number, Update email id, Deactive account </strong> with the use of <strong>Spring RESTful API services and Spring Data JPA.</strong>
              <br></br>
              <strong>3.</strong> User can perform <strong>LOG IN</strong> and <strong>LOG OUT</strong> operations using robust <strong>Spring Security Authentication and JWT Authorization services.</strong> Logging out is achieved by <strong>blacklisting the logged-out JWT in the database.</strong>
              <br></br>
              <strong>4.</strong> Navigation is done by implementing <strong>Floyd Warshall Algorithm</strong> and using data structures like <strong>Arrays, Vectors, ArrayLists and HashMaps.</strong>
              <br></br>
              <strong>5.</strong> <strong>Scheduled Deletion of expired blacklisted JWTs, expired user tickets and unverified users</strong> is done by <strong>Spring Scheduler.</strong>
              <br></br>
              <strong>6.</strong> <strong>SMS and Email services for OTP verification and messaging</strong> is achieved by using <strong>Twilio and Spring Boot Starter Mail</strong> correspondingly.
            </dicvbv>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" style={{ backgroundColor: props.mode === 'dark' ? '#495057' : '#cfe2ff', color: props.mode === 'dark' ? 'white' : 'black' }} data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              <strong>Made By</strong>
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body" style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', color: props.mode === 'dark' ? 'white' : 'black', border: props.mode === 'dark' ? '0.5px solid white' : 'black' }}>
              <strong>ROUNAK KUNDU</strong>
              <br></br>
              <FaLinkedin /> <a href="https://www.linkedin.com/in/RKoo7" target="_blank">https://www.linkedin.com/in/RKoo7</a>
              <br></br>
              <FaGithub /> <a href="https://github.com/Rounakoo7" target="_blank">https://github.com/Rounakoo7</a>
            </div>
          </div>
        </div>
      </div>
    </div> : <><LoginError mode={props.mode} removeJwt={props.removeJwt} toggleProgress={props.toggleProgress} /></>}</>
  )
}

export default About
