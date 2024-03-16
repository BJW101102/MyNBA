import React from 'react';
import '../../CSS/Dashboard.css';


function Navbar({ username, api}) {
    const handleLogOut = async (event) =>{
        try{
            const response = await api.post('logout')
            if (response.status === 200){
                window.location.href = 'http://localhost:3000';
            }
        }
        catch(error){
            console.log("Error:", error.message);
        }
    }

    return (
            <div className="header-container">
                <h1 style={{ display: 'inline-block' }}>Welcome, {username}</h1>
                <div className='nav-button-container'>
                    <button style={{ marginRight: "3vh" }}>Sports</button>
                    <button onClick={handleLogOut}>Logout</button>
                </div>
                <form className="search-bar">
                    <input
                        type="text"
                        placeholder="Searchbar"
                    />
                </form>
            </div>
    );
}

export default Navbar;
