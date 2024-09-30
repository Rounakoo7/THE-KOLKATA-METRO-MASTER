import React from 'react'
import { Link, useLocation } from 'react-router-dom'
export default function Navbar(props) {
    let location = useLocation();
    return (
        <div style={{ height: "58px" }}>
            <nav className={`navbar fixed-top navbar-expand-lg navbar-${props.mode} bg-${props.mode}`} style={{ borderBottom: "2px solid var(--bs-gray-500)" }}>
                <div className="container-fluid">
                    <h1 className="navbar-brand " to="/">The Kolkata Metro Master</h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${props.loggedin === true ? 'disabled' : location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${props.loggedin === true ? 'disabled' : location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                            {(props.loggedin === false) &&
                                <><li className="nav-item">
                                    <Link className={`nav-link ${props.loggedin === true ? 'disabled' : location.pathname === "/log-in" ? "active" : ""}`} to="/log-in">Log In</Link>
                                </li>
                                </>
                            }
                            {(props.loggedin === true) &&
                                <>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname === "/user" ? "active" : ""}`} to="/user">Map</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname === "/user-fare" ? "active" : ""}`} to="/user-fare">Fare Details</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname === "/user-navigate" ? "active" : ""}`} to="/user-navigate">Navigate</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/" onClick={props.removeJwt}>Log Out</Link>
                                    </li>
                                </>
                            }
                        </ul>
                        <div className={`form-check form-switch text-${props.mode === 'light' ? 'dark' : 'light'}`}>
                            {(props.mode === 'dark') && <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" style={{ cursor: "pointer" }} checked />}
                            {(props.mode === 'light') && <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" style={{ cursor: "pointer" }} />}
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable Dark mode</label>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
