import React from 'react';
import LogoutError from './LogoutError';
import Cookies from 'universal-cookie';

function User(props) {
    const cookies = new Cookies();
    return (<>{cookies.get("jwt") !== undefined?
        <div>
            <br />
        <div className="container-sm" style={{maxWidth: "800px", maxHeigth: "900px", backgroundColor: "white"}} >
        <h1 align="center">The Metro Map</h1>
            <img src="/map.png" class="img-fluid" alt="..."></img>            
        </div>
        </div>:<><LogoutError mode={props.mode} /></>}</>
    )
}

export default User
