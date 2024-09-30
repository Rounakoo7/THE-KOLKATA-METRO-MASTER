import './App.css';
import React from 'react';
import { useState,useEffect } from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Error from './components/Error';
import Login from './components/Login';
import User from './components/User';
import Signup from './components/Signup';
import Usernavigate from './components/Usernavigate';
import Userfare from './components/Userfare';
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
    toggleProgress(20);
    toggleProgress(100);
  }
  const router = createBrowserRouter([
    {
      errorElement: <Error />,
    },
    {
      path: "/",
      element: <><Navbar mode={mode} toggleMode={toggleMode} loggedin={false} />
        <LoadingBar color='blue' progress={progress} onLoaderFinished={() => setProgress(0)} />
        <div id="body" style={{ backgroundImage: 'url("/homepage-img.jpg")', backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed", height: "100vh" }}><>{cookies.get("jwt") === undefined?<></>:<><LoginError mode={mode} removeJwt={removeJwt} /></>}</></div>
      </>,
    },
    {
      path: "/about",
      element: <><Navbar mode={mode} toggleMode={toggleMode} loggedin={false} />
        <LoadingBar color='blue' progress={progress} onLoaderFinished={() => setProgress(0)} />
        <About mode={mode} removeJwt={removeJwt} toggleProgress={toggleProgress} />
      </>,
    },
    {
      path: "/log-in",
      element: <><Navbar mode={mode} toggleMode={toggleMode} loggedin={false} />
        <LoadingBar color='blue' progress={progress} onLoaderFinished={() => setProgress(0)} />
        <div id="body" style={{ backgroundImage: 'url("/homepage-img.jpg")', backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed", height: "100vh" }}><Login mode={mode} removeJwt={removeJwt} toggleProgress={toggleProgress} /></div>
      </>,
    },
    {
      path: "/sign-up",
      element: <><Navbar mode={mode} toggleMode={toggleMode} loggedin={false} />
        <LoadingBar color='blue' progress={progress} onLoaderFinished={() => setProgress(0)} />
        <div id="body" style={{ backgroundImage: 'url("/homepage-img.jpg")', backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed", height: "100vh" }}><Signup mode={mode} removeJwt={removeJwt} toggleProgress={toggleProgress} /></div>
      </>,
    },
    {
      path: "/user",
      element: <><Navbar mode={mode} toggleMode={toggleMode} loggedin={true} removeJwt={removeJwt} />
        <LoadingBar color='blue' progress={progress} onLoaderFinished={() => setProgress(0)} />
        <User mode={mode} toggleProgress={toggleProgress} />
      </>,
    },
    {
      path: "/user-navigate",
      element: <><Navbar mode={mode} toggleMode={toggleMode} loggedin={true} removeJwt={removeJwt} />
        <LoadingBar color='blue' progress={progress} onLoaderFinished={() => setProgress(0)} />
        <Usernavigate mode={mode} toggleProgress={toggleProgress} />
      </>,
    },
    {
      path: "/user-fare",
      element: <><Navbar mode={mode} toggleMode={toggleMode} loggedin={true} removeJwt={removeJwt} />
        <LoadingBar color='blue' progress={progress} onLoaderFinished={() => setProgress(0)} />
        <Userfare mode={mode} toggleProgress={toggleProgress} />
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
