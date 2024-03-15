import React, { useState } from 'react';
import axios from 'axios';


function HomeScreen() {

    const user = "Nigga"
    return (
        <div>
            <div className="header-container">
                <h1>Welcome, {user}</h1>
            </div>
            <p>Having problems with the CSS :(</p>
        </div>

    );
};

export default HomeScreen;
