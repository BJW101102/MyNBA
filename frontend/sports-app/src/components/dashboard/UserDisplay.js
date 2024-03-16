import React from 'react';
import '../../CSS/Dashboard.css';


function UserDisplay() {
    return (
        <div className='userdisplay-container'>
            <p style={{fontWeight:"bold"}}>Row 2</p>
            <div className='user-info-container'>
                <p style={{fontWeight:"bold"}}>User cards go here</p>
            </div>
            <br></br>
        </div>
    );
}

export default UserDisplay