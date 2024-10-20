import './App.css';
import React from 'react';
import { useState,useEffect } from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Error from './components/Error';
import Login from './components/Login';
import Forgotpassword from './components/Forgotpassword';
import Signup from './components/Signup';
import Userprofile from './components/Userprofile';
import Usermap from './components/Usermap';
import Usernavigate from './components/Usernavigate';
import Userfare from './components/Userfare';
import Userbookticket from './components/Userbookticket';
import Usertickets from './components/Usertickets';
import LoginError from './components/LoginError';
import LoadingBar from 'react-top-loading-bar';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import "./index.css";
import "./App.css";
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

function App() {
  const [progress, setProgress] = useState(0)
  const toggleProgress = (p) => {
      setProgress(Math.floor(p));
  }
  useEffect(() => {
    toggleProgress(10);
    toggleProgress(70);
    toggleProgress(100);
    return () => {
    }
  }, [])
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
    toggleProgress(10);
    cookies.remove("jwt");
    toast.success("Logged out successfully")
    toggleProgress(20);
    toggleProgress(100);
  }
  const router = createBrowserRouter([
    {
      errorElement: <Error />,
    },
    {
      path: "/",
      element: <><Navbar mode={mode} toggleMode={toggleMode} loggedin={false} toggleProgress={toggleProgress} />
        <LoadingBar color='blue' progress={progress} onLoaderFinished={() => setProgress(0)} />
        <div id="body" style={{ backgroundImage: 'url("/homepage-img.jpg")', backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed", height: "100vh" }}><>{cookies.get("jwt") === undefined?<></>:<><LoginError mode={mode} removeJwt={removeJwt} toggleProgress={toggleProgress} /></>}</></div>
      </>,
    },
    {
      path: "/about",
      element: <><Navbar mode={mode} toggleMode={toggleMode} loggedin={false} toggleProgress={toggleProgress} />
        <LoadingBar color='blue' progress={progress} onLoaderFinished={() => setProgress(0)} />
        <About mode={mode} removeJwt={removeJwt} toggleProgress={toggleProgress} />
      </>,
    },
    {
      path: "/log-in",
      element: <><Navbar mode={mode} toggleMode={toggleMode} loggedin={false} toggleProgress={toggleProgress} />
        <LoadingBar color='blue' progress={progress} onLoaderFinished={() => setProgress(0)} />
        <div id="body" style={{ backgroundImage: 'url("/homepage-img.jpg")', backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed", height: "100vh" }}><Login mode={mode} removeJwt={removeJwt} toggleProgress={toggleProgress} /></div>
      </>,
    },
    {
      path: "/forgot-password",
      element: <><Navbar mode={mode} toggleMode={toggleMode} loggedin={false} toggleProgress={toggleProgress} />
        <LoadingBar color='blue' progress={progress} onLoaderFinished={() => setProgress(0)} />
        <div id="body" style={{ backgroundImage: 'url("/homepage-img.jpg")', backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed", height: "100vh" }}><Forgotpassword mode={mode} removeJwt={removeJwt} toggleProgress={toggleProgress} /></div>
      </>,
    },
    {
      path: "/sign-up",
      element: <><Navbar mode={mode} toggleMode={toggleMode} loggedin={false} toggleProgress={toggleProgress} />
        <LoadingBar color='blue' progress={progress} onLoaderFinished={() => setProgress(0)} />
        <div id="body" style={{ backgroundImage: 'url("/homepage-img.jpg")', backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed", height: "100vh" }}><Signup mode={mode} removeJwt={removeJwt} toggleProgress={toggleProgress} /></div>
      </>,
    },
    {
      path: "/user-profile",
      element: <><Navbar mode={mode} toggleMode={toggleMode} loggedin={true} removeJwt={removeJwt} toggleProgress={toggleProgress} />
        <LoadingBar color='blue' progress={progress} onLoaderFinished={() => setProgress(0)} />
        <Userprofile mode={mode}  removeJwt={removeJwt} toggleProgress={toggleProgress} />
      </>,
    },
    {
      path: "/user-map",
      element: <><Navbar mode={mode} toggleMode={toggleMode} loggedin={true} removeJwt={removeJwt} toggleProgress={toggleProgress} />
        <LoadingBar color='blue' progress={progress} onLoaderFinished={() => setProgress(0)} />
        <Usermap mode={mode} toggleProgress={toggleProgress} />
      </>,
    },
    {
      path: "/user-navigate",
      element: <><Navbar mode={mode} toggleMode={toggleMode} loggedin={true} removeJwt={removeJwt} toggleProgress={toggleProgress} />
        <LoadingBar color='blue' progress={progress} onLoaderFinished={() => setProgress(0)} />
        <Usernavigate mode={mode} toggleProgress={toggleProgress} />
      </>,
    },
    {
      path: "/user-fare",
      element: <><Navbar mode={mode} toggleMode={toggleMode} loggedin={true} removeJwt={removeJwt} toggleProgress={toggleProgress} />
        <LoadingBar color='blue' progress={progress} onLoaderFinished={() => setProgress(0)} />
        <Userfare mode={mode} toggleProgress={toggleProgress} />
      </>,
    },
    {
      path: "/book-ticket",
      element: <><Navbar mode={mode} toggleMode={toggleMode} loggedin={true} removeJwt={removeJwt} toggleProgress={toggleProgress} />
        <LoadingBar color='blue' progress={progress} onLoaderFinished={() => setProgress(0)} />
        <Userbookticket mode={mode} toggleProgress={toggleProgress} />
      </>,
    },
    {
      path: "/user-tickets",
      element: <><Navbar mode={mode} toggleMode={toggleMode} loggedin={true} removeJwt={removeJwt} toggleProgress={toggleProgress} />
        <LoadingBar color='blue' progress={progress} onLoaderFinished={() => setProgress(0)} />
        <Usertickets mode={mode} toggleProgress={toggleProgress} />
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
