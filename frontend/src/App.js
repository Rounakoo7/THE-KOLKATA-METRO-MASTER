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
import LoginError from './components/LoginError';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import "./index.css";
import "./App.css";
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
function App() {
  const cookies = new Cookies();
  const [mode, setMode] = useState('light');
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
  const removeJwt = () => {
    cookies.remove("jwt");
  }
  const router = createBrowserRouter([
    {
      errorElement: <Error />,
    },
    {
      path: "/",
      element: <><Navbar mode={mode} toggleMode={toggleMode} loggedin={false} />
        <div id="body" style={{ backgroundImage: 'url("/homepage-img.jpg")', backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed", height: "100vh" }}><>{cookies.get("jwt") === undefined?<></>:<><LoginError mode={mode} removeJwt={removeJwt} /></>}</></div>
      </>,
    },
    {
      path: "/about",
      element: <><Navbar mode={mode} toggleMode={toggleMode} loggedin={false} />
        <About mode={mode} removeJwt={removeJwt} />
      </>,
    },
    {
      path: "/log-in",
      element: <><Navbar mode={mode} toggleMode={toggleMode} loggedin={false}/>
        <div id="body" style={{ backgroundImage: 'url("/homepage-img.jpg")', backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed", height: "100vh" }}><Login mode={mode} removeJwt={removeJwt} /></div>
      </>,
    },
    {
      path: "/sign-up",
      element: <><Navbar mode={mode} toggleMode={toggleMode} loggedin={false} />
        <div id="body" style={{ backgroundImage: 'url("/homepage-img.jpg")', backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed", height: "100vh" }}><Signup mode={mode} removeJwt={removeJwt} /></div>
      </>,
    },
    {
      path: "/user",
      element: <><Navbar mode={mode} toggleMode={toggleMode} loggedin={true} removeJwt={removeJwt} />
        <User mode={mode} />
      </>,
    },
    {
      path: "/user-navigate",
      element: <><Navbar mode={mode} toggleMode={toggleMode} loggedin={true} removeJwt={removeJwt} />
        <Usernavigate  mode={mode} />
      </>,
    },
    {
      path: "/user-fare",
      element: <><Navbar mode={mode} toggleMode={toggleMode} loggedin={true} removeJwt={removeJwt} />
        <Userfare mode={mode} />
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
