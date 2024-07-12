import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Linesandstations from './Linesandstations';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import Spancounter from './Spancounter'
function Usernavigate(props) {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    if (counter <= 100) {
      setTimeout(() => {
        setCounter(counter + 1);
      }, 5);
    }
  }, [counter])
  return (
    <div>
      <br />
      <div className="container-sm" style={{ backgroundColor: props.mode === 'dark' ? '#495057' : 'white', maxWidth: "1500px" }}>
        <h1 align="center" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>Navigate</h1>
        <br />
        <form className="row g-3">
          <div className="col-6">
            <label style={{ paddingBottom: "20px" }}>Select Source Station</label>
            <Linesandstations mode={props.mode} />
          </div>
          <div className="col-6">
            <label style={{ paddingBottom: "20px" }}>Select Destination Station</label>
            <Linesandstations mode={props.mode} />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary" onClick={() => navigate("/admin")}>Search</button>
            <span style={{ paddingLeft: "10px" }}></span>
            <button type="submit" className="btn btn-danger" onClick={() => navigate("/user")}>Back</button>
          </div>
        </form>
        <br />
        <br />
        <div style={{ overflow: "scroll", maxWidth: "1500px", paddingLeft: "50px", border: "1px solid black" }}>
          <br />
          <br />
          <ProgressBar percent={counter} filledBackground="linear-gradient(to right, #fefb72, #fefb72)">
            <Step transition="scale">
              {({ accomplished }) => (
                <span class="badge rounded-pill text" style={{ filter: `grayscale(${accomplished ? 0 : 80}%)`, backgroundColor: "red" }}>Park Street</span>
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished }) => (
                <span class="badge rounded-pill text-bg" style={{ filter: `grayscale(${accomplished ? 0 : 80}%)`, backgroundColor: "red" }}>Primary</span>
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished }) => (
                <span class="badge rounded-pill text-bg" style={{ filter: `grayscale(${accomplished ? 0 : 80}%)`, backgroundColor: "red" }}>Primary</span>
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished }) => (
                <span class="badge rounded-pill text-bg" style={{ filter: `grayscale(${accomplished ? 0 : 80}%)`, backgroundColor: "red" }}>Primary</span>
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished }) => (
                <span class="badge rounded-pill text-bg" style={{ filter: `grayscale(${accomplished ? 0 : 80}%)`, backgroundColor: "red" }}>Primary</span>
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished }) => (
                <span class="badge rounded-pill text-bg" style={{ filter: `grayscale(${accomplished ? 0 : 80}%)`, backgroundColor: "red" }}>Primary</span>
              )}
            </Step>
          </ProgressBar>
          <br />
          <br />
        </div>
        <br />
        <div class="row g-2">
          <div class="col-6">
            <div className="table-responsive" style={{ backgroundColor: props.mode === 'dark' ? '#495057' : 'white', maxWidth: "700px", maxHeight: "400px" }}>
              <table className={`table table-striped ${props.mode === 'dark' ? 'table-dark' : ''} table-hover table-bordered`}>
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
          <div class="col-6">
            <div class="container text-center">
              <div class="row g-2">
                <div class="col-12" style={{ paddingTop: "40px" }}>
                  <h3>The Average Speed is <Spancounter start="0" end="30" durationinseconds="3" /> Kilometers/Hour</h3>
                </div>
                <div class="col-6" style={{ paddingTop: "10px" }}>
                  <div class="p-3" style={{ backgroundColor: "#d088f8", border: "1px solid #3a0c3a" }}><Spancounter start="0" end="100" durationinseconds="3" /> Stations</div>
                </div>
                <div class="col-6" style={{ paddingTop: "10px" }}>
                  <div class="p-3" style={{ backgroundColor: "#d088f8", border: "1px solid #3a0c3a" }} ><Spancounter start="0" end="100" durationinseconds="3" /> Kilometers</div>
                </div>
                <div class="col-6" style={{ paddingTop: "10px" }}>
                  <div class="p-3" style={{ backgroundColor: "#d088f8", border: "1px solid #3a0c3a" }} ><Spancounter start="0" end="100" durationinseconds="3" /> Minutes</div>
                </div>
                <div class="col-6" style={{ paddingTop: "10px" }}>
                  <div class="p-3" style={{ backgroundColor: "#d088f8", border: "1px solid #3a0c3a" }} ><Spancounter start="0" end="100" durationinseconds="3" /> Rupees</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  )
}

export default Usernavigate

