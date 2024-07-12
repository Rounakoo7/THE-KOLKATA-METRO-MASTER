import './App.css';
import React from 'react';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import About from './components/About';
import Error from './components/Error';
import Login from './components/Login';
import User from './components/User';
import Signup from './components/Signup';
import Usernavigate from './components/Usernavigate';
import Userfare from './components/Userfare';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import "./App.css";
function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);
  const [loggedin, setLoggedIn] = useState('no');
  if (mode === 'light') {
    document.body.style.backgroundColor = '#ecfcff';
  }
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      showAlert("Dark mode has been enabled", "success");
      document.body.style.backgroundColor = 'rgb(50 52 52)';
    } else {
      setMode('light');
      showAlert("Dark mode has been disabled", "success");
      document.body.style.backgroundColor = '#ecfcff';
    }
  }
  const toggleLoggedIn = () => {
    if (loggedin === 'no') {
      setLoggedIn('yes');
    } else {
      setLoggedIn('no');
    }
  }
  const router = createBrowserRouter([
    {
      errorElement: <Error />,
    },
    {
      path: "/",
      element: <>
        <Navbar mode={mode} toggleMode={toggleMode} loggedin="no" toggleLoggedIn={toggleLoggedIn}/>
        <Alert alert={alert} />
        <div id="body" style={{ backgroundImage: 'url("/homepage-img.jpg")', backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed", height: "100vh" }}></div>
      </>,
    },
    {
      path: "/about",
      element: <>
        <Navbar mode={mode} toggleMode={toggleMode} loggedin="no" toggleLoggedIn={toggleLoggedIn}/>
        <Alert alert={alert} />
        <About mode={mode} />
      </>,
    },
    {
      path: "/log-in",
      element: <>
        <Navbar mode={mode} toggleMode={toggleMode} loggedin="no" toggleLoggedIn={toggleLoggedIn}/>
        <Alert alert={alert} />
        <div id="body" style={{ backgroundImage: 'url("/homepage-img.jpg")', backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed", height: "100vh" }}><Login mode={mode} loggedin="no" toggleLoggedIn={toggleLoggedIn}/></div>
      </>,
    },
    {
      path: "/sign-up",
      element: <>
        <Navbar mode={mode} toggleMode={toggleMode} loggedin="no" toggleLoggedIn={toggleLoggedIn}/>
        <Alert alert={alert} />
        <div id="body" style={{ backgroundImage: 'url("/homepage-img.jpg")', backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed", height: "100vh" }}><Signup mode={mode} /></div>
      </>,
    },
    {
      path: "/user",
      element: <>
        <Navbar mode={mode} toggleMode={toggleMode} loggedin="yes" toggleLoggedIn={toggleLoggedIn}/>
        <Alert alert={alert} />
        <User mode={mode} />
      </>,
    },
    {
      path: "/user-navigate",
      element: <>
        <Navbar mode={mode} toggleMode={toggleMode} loggedin="yes" toggleLoggedIn={toggleLoggedIn}/>
        <Alert alert={alert} />
        <Usernavigate />
      </>,
    },
    {
      path: "/user-fare",
      element: <>
        <Navbar mode={mode} toggleMode={toggleMode} loggedin="yes" toggleLoggedIn={toggleLoggedIn}/>
        <Alert alert={alert} />
        <Userfare />
      </>,
    },
  ]);
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
export default App;
