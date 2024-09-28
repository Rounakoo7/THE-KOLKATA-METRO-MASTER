import './App.css';
import React from 'react';
import { useState } from 'react';
import Navbar from './components/Navbar';
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
import { toast } from 'react-toastify';
function App() {
  const [mode, setMode] = useState('light');
  const [loggedin, setLoggedIn] = useState('no');
  if (mode === 'light') {
    document.body.style.backgroundColor = '#ecfcff';
  }
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      toast.success("Dark mode has been enabled");
      document.body.style.backgroundColor = 'rgb(50 52 52)';
    } else {
      setMode('light');
      toast.success("Dark mode has been disabled");
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
        <Navbar mode={mode} toggleMode={toggleMode} loggedin={loggedin}/>
        <div id="body" style={{ backgroundImage: 'url("/homepage-img.jpg")', backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed", height: "100vh" }}></div>
      </>,
    },
    {
      path: "/about",
      element: <>
        <Navbar mode={mode} toggleMode={toggleMode} loggedin={loggedin}/>
        <About mode={mode} />
      </>,
    },
    {
      path: "/log-in",
      element: <>
        <Navbar mode={mode} toggleMode={toggleMode} loggedin={loggedin} toggleLoggedIn={toggleLoggedIn}/>
        <div id="body" style={{ backgroundImage: 'url("/homepage-img.jpg")', backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed", height: "100vh" }}><Login mode={mode} loggedin={loggedin} toggleLoggedIn={toggleLoggedIn} /></div>
      </>,
    },
    {
      path: "/sign-up",
      element: <>
        <Navbar mode={mode} toggleMode={toggleMode} loggedin={loggedin}/>
        <div id="body" style={{ backgroundImage: 'url("/homepage-img.jpg")', backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed", height: "100vh" }}><Signup mode={mode} /></div>
      </>,
    },
    {
      path: "/user",
      element: <>
        <Navbar mode={mode} toggleMode={toggleMode} loggedin={loggedin} toggleLoggedIn={toggleLoggedIn}/>
        <User mode={mode} />
      </>,
    },
    {
      path: "/user-navigate",
      element: <>
        <Navbar mode={mode} toggleMode={toggleMode} loggedin={loggedin} toggleLoggedIn={toggleLoggedIn}/>
        <Usernavigate />
      </>,
    },
    {
      path: "/user-fare",
      element: <>
        <Navbar mode={mode} toggleMode={toggleMode} loggedin={loggedin} toggleLoggedIn={toggleLoggedIn}/>
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
