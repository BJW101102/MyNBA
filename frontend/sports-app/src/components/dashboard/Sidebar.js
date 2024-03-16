import React from 'react';
import '../../CSS/Dashboard.css';

function Sidebar() {
    return (
        <div className='sidebar-container'>
            <p style={{fontWeight:"bold"}}>Row 1</p>
            <div className='profile-picture-container'>
                <p style={{fontWeight:"bold"}}>Profile picture goes here</p>
            </div>
            <br></br>
            <div className='user-meta-container'>
                <p style={{fontWeight:"bold"}}> User metadata goes here</p>
            </div>
        </div>
    );
}

export default Sidebar