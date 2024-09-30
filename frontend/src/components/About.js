import React from 'react'
import Cookies from 'universal-cookie'
import LoginError from './LoginError';
import { useEffect } from 'react';
function About(props) {
  const toggleProgress = props.toggleProgress
  useEffect(() => {
    toggleProgress(70);
    toggleProgress(100);
    return () => {
    }
  }, [])
  const cookies = new Cookies();
  return (<>{cookies.get("jwt") === undefined? 
    <div className="container">
      <br /><br />
      <h1 className="my-3" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>About Us</h1>
      <br />
      <div className="accordion" id="accordionExample" style={{ border: props.mode === 'dark' ? '2px solid rounded white' : 'black' }}>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" style={{ backgroundColor: props.mode === 'dark' ? '#495057' : '#cfe2ff', color: props.mode === 'dark' ? 'white' : 'black' }} data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Accordion Item #1
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body" style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', color: props.mode === 'dark' ? 'white' : 'black', border: props.mode === 'dark' ? '0.5px solid white' : 'black' }}>
              <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" style={{ backgroundColor: props.mode === 'dark' ? '#495057' : '#cfe2ff', color: props.mode === 'dark' ? 'white' : 'black' }} data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Accordion Item #2
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body" style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', color: props.mode === 'dark' ? 'white' : 'black', border: props.mode === 'dark' ? '0.5px solid white' : 'black' }}>
              <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" style={{ backgroundColor: props.mode === 'dark' ? '#495057' : '#cfe2ff', color: props.mode === 'dark' ? 'white' : 'black' }} data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Accordion Item #3
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body" style={{ backgroundColor: props.mode === 'dark' ? 'rgb(50 52 52)' : 'white', color: props.mode === 'dark' ? 'white' : 'black', border: props.mode === 'dark' ? '0.5px solid white' : 'black' }}>
              <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
      </div>
    </div>:<><LoginError mode={props.mode} removeJwt={props.removeJwt} /></>}</>
  )
}

export default About
