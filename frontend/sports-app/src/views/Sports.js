import React, { useState, useEffect } from 'react';
import '../CSS/Sports.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import Navigation from '../components/dashboard/Navigation.js';
import Sport from '../components/dashboard/Sport.js';
import axios from 'axios'; // Import Axios library

import Row from 'react-bootstrap/Row';

import Col from 'react-bootstrap/Col';

function Sports() {

    const [followedTeams, setFollowedTeams] = useState([
    
        {
            "teamID": 17,
            "name": "Los Angeles Lakers",
            "logo": "https://logos-world.net/wp-content/uploads/2020/05/Los-Angeles-Lakers-Logo-700x394.png",
            "primary": "#552583",
            "secondary": "#FDB927",
            "code": "LAL",
            "conference": "West",
            "division": "Pacific",
            "location": "Los Angeles",
            "players": [
                {
                    "teamID": 17,
                    "playerID": 462,
                    "firstName": "D'Angelo",
                    "lastName": "Russell"
                },
                {
                    "teamID": 17,
                    "playerID": 560,
                    "firstName": "Christian",
                    "lastName": "Wood"
                },
                {
                    "teamID": 17,
                    "playerID": 437,
                    "firstName": "Taurean",
                    "lastName": "Prince"
                },
                {
                    "teamID": 17,
                    "playerID": 1775,
                    "firstName": "Gabe",
                    "lastName": "Vincent"
                },
                {
                    "teamID": 17,
                    "playerID": 1864,
                    "firstName": "Jaxson",
                    "lastName": "Hayes"
                },
                {
                    "teamID": 17,
                    "playerID": 1903,
                    "firstName": "Dylan",
                    "lastName": "Windler"
                },
                {
                    "teamID": 17,
                    "playerID": 3477,
                    "firstName": "Scotty",
                    "lastName": "Pippen Jr."
                },
                {
                    "teamID": 17,
                    "playerID": 3427,
                    "firstName": "Max",
                    "lastName": "Christie"
                },
                {
                    "teamID": 17,
                    "playerID": 3525,
                    "firstName": "Bryce",
                    "lastName": "Hamilton"
                },
                {
                    "teamID": 17,
                    "playerID": 3986,
                    "firstName": "Damion",
                    "lastName": "Baugh"
                },
                {
                    "teamID": 17,
                    "playerID": 3987,
                    "firstName": "Colin",
                    "lastName": "Castleton"
                },
                {
                    "teamID": 17,
                    "playerID": 3988,
                    "firstName": "Alex",
                    "lastName": "Fudge"
                },
                {
                    "teamID": 17,
                    "playerID": 3989,
                    "firstName": "D'Moi",
                    "lastName": "Hodge"
                },
                {
                    "teamID": 17,
                    "playerID": 3990,
                    "firstName": "Jalen",
                    "lastName": "HoodSchifino"
                },
                {
                    "teamID": 17,
                    "playerID": 3991,
                    "firstName": "Maxwell",
                    "lastName": "Lewis"
                },
                {
                    "teamID": 17,
                    "playerID": 3992,
                    "firstName": "Vincent",
                    "lastName": "ValerioBodon"
                },
                {
                    "teamID": 17,
                    "playerID": 4041,
                    "firstName": "Harry III",
                    "lastName": "Giles"
                },
                {
                    "teamID": 17,
                    "playerID": 126,
                    "firstName": "Anthony",
                    "lastName": "Davis"
                },
                {
                    "teamID": 17,
                    "playerID": 142,
                    "firstName": "Spencer",
                    "lastName": "Dinwiddie"
                },
                {
                    "teamID": 17,
                    "playerID": 265,
                    "firstName": "LeBron",
                    "lastName": "James"
                },
                {
                    "teamID": 17,
                    "playerID": 2845,
                    "firstName": "Austin",
                    "lastName": "Reaves"
                },
                {
                    "teamID": 17,
                    "playerID": 1889,
                    "firstName": "Cam",
                    "lastName": "Reddish"
                },
                {
                    "teamID": 17,
                    "playerID": 1036,
                    "firstName": "Jarred",
                    "lastName": "Vanderbilt"
                },
                {
                    "teamID": 17,
                    "playerID": 2620,
                    "firstName": "Skylar",
                    "lastName": "Mays"
                },
                {
                    "teamID": 17,
                    "playerID": 1862,
                    "firstName": "Rui",
                    "lastName": "Hachimura"
                }
            ]
        },
        {
            "teamID": 41,
            "name": "Washington Wizards",
            "logo": "https://logos-world.net/wp-content/uploads/2020/05/Washington-Wizards-logo-700x394.png",
            "primary": "#002B5C",
            "secondary": "#E31837",
            "code": "WAS",
            "conference": "East",
            "division": "Southeast",
            "location": "Washington",
            "players": [
                {
                    "teamID": 41,
                    "playerID": 285,
                    "firstName": "Tyus",
                    "lastName": "Jones"
                },
                {
                    "teamID": 41,
                    "playerID": 564,
                    "firstName": "Delon",
                    "lastName": "Wright"
                },
                {
                    "teamID": 41,
                    "playerID": 246,
                    "firstName": "Richaun",
                    "lastName": "Holmes"
                },
                {
                    "teamID": 41,
                    "playerID": 820,
                    "firstName": "Kyle",
                    "lastName": "Kuzma"
                },
                {
                    "teamID": 41,
                    "playerID": 960,
                    "firstName": "Hamidou",
                    "lastName": "Diallo"
                },
                {
                    "teamID": 41,
                    "playerID": 1022,
                    "firstName": "Landry",
                    "lastName": "Shamet"
                },
                {
                    "teamID": 41,
                    "playerID": 1859,
                    "firstName": "Daniel",
                    "lastName": "Gafford"
                },
                {
                    "teamID": 41,
                    "playerID": 1887,
                    "firstName": "Jordan",
                    "lastName": "Poole"
                },
                {
                    "teamID": 41,
                    "playerID": 2564,
                    "firstName": "Deni",
                    "lastName": "Avdija"
                },
                {
                    "teamID": 41,
                    "playerID": 2796,
                    "firstName": "Jared",
                    "lastName": "Butler"
                },
                {
                    "teamID": 41,
                    "playerID": 2590,
                    "firstName": "Anthony",
                    "lastName": "Gill"
                },
                {
                    "teamID": 41,
                    "playerID": 931,
                    "firstName": "Marvin",
                    "lastName": "Bagley III"
                },
                {
                    "teamID": 41,
                    "playerID": 2798,
                    "firstName": "Justin",
                    "lastName": "Champagnie"
                },
                {
                    "teamID": 41,
                    "playerID": 2825,
                    "firstName": "Corey",
                    "lastName": "Kispert"
                },
                {
                    "teamID": 41,
                    "playerID": 3413,
                    "firstName": "Patrick",
                    "lastName": "Baldwin Jr."
                },
                {
                    "teamID": 41,
                    "playerID": 3428,
                    "firstName": "Johnny",
                    "lastName": "Davis"
                },
                {
                    "teamID": 41,
                    "playerID": 3484,
                    "firstName": "Ryan",
                    "lastName": "Rollins"
                },
                {
                    "teamID": 41,
                    "playerID": 3597,
                    "firstName": "John",
                    "lastName": "Butler Jr."
                },
                {
                    "teamID": 41,
                    "playerID": 3576,
                    "firstName": "Jules",
                    "lastName": "Bernard"
                },
                {
                    "teamID": 41,
                    "playerID": 4003,
                    "firstName": "Trey",
                    "lastName": "Jemison"
                },
                {
                    "teamID": 41,
                    "playerID": 4035,
                    "firstName": "Chase",
                    "lastName": "Audige"
                },
                {
                    "teamID": 41,
                    "playerID": 4036,
                    "firstName": "Bilal",
                    "lastName": "Coulibaly"
                },
                {
                    "teamID": 41,
                    "playerID": 2838,
                    "firstName": "Eugene",
                    "lastName": "Omoruyi"
                },
                {
                    "teamID": 41,
                    "playerID": 4088,
                    "firstName": "T.",
                    "lastName": "Vukcevic"
                },
                {
                    "teamID": 41,
                    "playerID": 384,
                    "firstName": "Mike",
                    "lastName": "Muscala"
                },
                {
                    "teamID": 41,
                    "playerID": 190,
                    "firstName": "Taj",
                    "lastName": "Gibson"
                },
                {
                    "teamID": 41,
                    "playerID": 1191,
                    "firstName": "Xavier",
                    "lastName": "Cooks"
                },
                {
                    "teamID": 41,
                    "playerID": 181,
                    "firstName": "Danilo",
                    "lastName": "Gallinari"
                }
            ]
        },
        {
            "teamID": 5,
            "name": "Charlotte Hornets",
            "logo": "https://logos-world.net/wp-content/uploads/2020/05/Charlotte-Hornets-logo-700x394.png",
            "primary": "#1D1160",
            "secondary": "#00788C",
            "code": "CHA",
            "conference": "East",
            "division": "Southeast",
            "location": "Charlotte",
            "players": [
                {
                    "teamID": 5,
                    "playerID": 254,
                    "firstName": "RJ",
                    "lastName": "Hunter"
                },
                {
                    "teamID": 5,
                    "playerID": 880,
                    "firstName": "Edmond",
                    "lastName": "Sumner"
                },
                {
                    "teamID": 5,
                    "playerID": 941,
                    "firstName": "Miles",
                    "lastName": "Bridges"
                },
                {
                    "teamID": 5,
                    "playerID": 1879,
                    "firstName": "Cody",
                    "lastName": "Martin"
                },
                {
                    "teamID": 5,
                    "playerID": 458,
                    "firstName": "Terry",
                    "lastName": "Rozier"
                },
                {
                    "teamID": 5,
                    "playerID": 850,
                    "firstName": "Frank",
                    "lastName": "Ntilikina"
                },
                {
                    "teamID": 5,
                    "playerID": 1901,
                    "firstName": "Grant",
                    "lastName": "Williams"
                },
                {
                    "teamID": 5,
                    "playerID": 1897,
                    "firstName": "P.J.",
                    "lastName": "Washington"
                },
                {
                    "teamID": 5,
                    "playerID": 2482,
                    "firstName": "Marques",
                    "lastName": "Bolden"
                },
                {
                    "teamID": 5,
                    "playerID": 2566,
                    "firstName": "LaMelo",
                    "lastName": "Ball"
                },
                {
                    "teamID": 5,
                    "playerID": 2614,
                    "firstName": "Theo",
                    "lastName": "Maledon"
                },
                {
                    "teamID": 5,
                    "playerID": 2633,
                    "firstName": "Aleksej",
                    "lastName": "Pokusevski"
                },
                {
                    "teamID": 5,
                    "playerID": 2639,
                    "firstName": "Nick",
                    "lastName": "Richards"
                },
                {
                    "teamID": 5,
                    "playerID": 2831,
                    "firstName": "Tre",
                    "lastName": "Mann"
                },
                {
                    "teamID": 5,
                    "playerID": 2793,
                    "firstName": "James",
                    "lastName": "Bouknight"
                },
                {
                    "teamID": 5,
                    "playerID": 3506,
                    "firstName": "Mark",
                    "lastName": "Williams"
                },
                {
                    "teamID": 5,
                    "playerID": 3947,
                    "firstName": "Amari",
                    "lastName": "Bailey"
                },
                {
                    "teamID": 5,
                    "playerID": 3948,
                    "firstName": "Leaky",
                    "lastName": "Black"
                },
                {
                    "teamID": 5,
                    "playerID": 3949,
                    "firstName": "Nathan",
                    "lastName": "Mensah"
                },
                {
                    "teamID": 5,
                    "playerID": 3469,
                    "firstName": "Bryce",
                    "lastName": "McGowens"
                },
                {
                    "teamID": 5,
                    "playerID": 3950,
                    "firstName": "Brandon",
                    "lastName": "Miller"
                },
                {
                    "teamID": 5,
                    "playerID": 4042,
                    "firstName": "Nick Jr.",
                    "lastName": "Smith"
                },
                {
                    "teamID": 5,
                    "playerID": 2856,
                    "firstName": "JT",
                    "lastName": "Thor"
                },
                {
                    "teamID": 5,
                    "playerID": 227,
                    "firstName": "Gordon",
                    "lastName": "Hayward"
                },
                {
                    "teamID": 5,
                    "playerID": 488,
                    "firstName": "Ish",
                    "lastName": "Smith"
                },
                {
                    "teamID": 5,
                    "playerID": 52,
                    "firstName": "Davis",
                    "lastName": "Bertans"
                },
                {
                    "teamID": 5,
                    "playerID": 2739,
                    "firstName": "Vasilije",
                    "lastName": "Micic"
                },
                {
                    "teamID": 5,
                    "playerID": 123,
                    "firstName": "Seth",
                    "lastName": "Curry"
                }
            ]
        },
        {
            "teamID": 10,
            "name": "Detroit Pistons",
            "logo": "https://logos-world.net/wp-content/uploads/2020/05/Detroit-Pistons-logo-700x394.png",
            "primary": "#C8102E",
            "secondary": "#1D42BA",
            "code": "DET",
            "conference": "East",
            "division": "Central",
            "location": "Detroit",
            "players": [
                {
                    "teamID": 10,
                    "playerID": 845,
                    "firstName": "Monte",
                    "lastName": "Morris"
                },
                {
                    "teamID": 10,
                    "playerID": 945,
                    "firstName": "Troy",
                    "lastName": "Brown Jr."
                },
                {
                    "teamID": 10,
                    "playerID": 987,
                    "firstName": "Kevin",
                    "lastName": "Knox II"
                },
                {
                    "teamID": 10,
                    "playerID": 931,
                    "firstName": "Marvin",
                    "lastName": "Bagley III"
                },
                {
                    "teamID": 10,
                    "playerID": 2557,
                    "firstName": "Jontay",
                    "lastName": "Porter"
                },
                {
                    "teamID": 10,
                    "playerID": 2811,
                    "firstName": "Quentin",
                    "lastName": "Grimes"
                },
                {
                    "teamID": 10,
                    "playerID": 2666,
                    "firstName": "James",
                    "lastName": "Wiseman"
                },
                {
                    "teamID": 10,
                    "playerID": 2599,
                    "firstName": "Killian",
                    "lastName": "Hayes"
                },
                {
                    "teamID": 10,
                    "playerID": 2587,
                    "firstName": "Malachi",
                    "lastName": "Flynn"
                },
                {
                    "teamID": 10,
                    "playerID": 2648,
                    "firstName": "Isaiah",
                    "lastName": "Stewart"
                },
                {
                    "teamID": 10,
                    "playerID": 2678,
                    "firstName": "Zavier",
                    "lastName": "Simpson"
                },
                {
                    "teamID": 10,
                    "playerID": 2829,
                    "firstName": "Isaiah",
                    "lastName": "Livers"
                },
                {
                    "teamID": 10,
                    "playerID": 2801,
                    "firstName": "Cade",
                    "lastName": "Cunningham"
                },
                {
                    "teamID": 10,
                    "playerID": 3790,
                    "firstName": "Stanley",
                    "lastName": "Umude"
                },
                {
                    "teamID": 10,
                    "playerID": 3451,
                    "firstName": "Jaden",
                    "lastName": "Ivey"
                },
                {
                    "teamID": 10,
                    "playerID": 3433,
                    "firstName": "Jalen",
                    "lastName": "Duren"
                },
                {
                    "teamID": 10,
                    "playerID": 3481,
                    "firstName": "Jared",
                    "lastName": "Rhoden"
                },
                {
                    "teamID": 10,
                    "playerID": 3438,
                    "firstName": "Simone",
                    "lastName": "Fontecchio"
                },
                {
                    "teamID": 10,
                    "playerID": 3969,
                    "firstName": "Tosan",
                    "lastName": "Evbuomwan"
                },
                {
                    "teamID": 10,
                    "playerID": 3417,
                    "firstName": "Buddy",
                    "lastName": "Boeheim"
                },
                {
                    "teamID": 10,
                    "playerID": 3970,
                    "firstName": "Marcus",
                    "lastName": "Sasser"
                },
                {
                    "teamID": 10,
                    "playerID": 3968,
                    "firstName": "Malcolm",
                    "lastName": "Cazalon"
                },
                {
                    "teamID": 10,
                    "playerID": 181,
                    "firstName": "Danilo",
                    "lastName": "Gallinari"
                },
                {
                    "teamID": 10,
                    "playerID": 84,
                    "firstName": "Alec",
                    "lastName": "Burks"
                },
                {
                    "teamID": 10,
                    "playerID": 190,
                    "firstName": "Taj",
                    "lastName": "Gibson"
                },
                {
                    "teamID": 10,
                    "playerID": 3971,
                    "firstName": "Ausar",
                    "lastName": "Thompson"
                },
                {
                    "teamID": 10,
                    "playerID": 384,
                    "firstName": "Mike",
                    "lastName": "Muscala"
                },
                {
                    "teamID": 10,
                    "playerID": 177,
                    "firstName": "Evan",
                    "lastName": "Fournier"
                },
                {
                    "teamID": 10,
                    "playerID": 60,
                    "firstName": "Bojan",
                    "lastName": "Bogdanovic"
                },
                {
                    "teamID": 10,
                    "playerID": 221,
                    "firstName": "Joe",
                    "lastName": "Harris"
                },
                {
                    "teamID": 10,
                    "playerID": 999,
                    "firstName": "Chimezie",
                    "lastName": "Metu"
                },
                {
                    "teamID": 10,
                    "playerID": 1001,
                    "firstName": "Shake",
                    "lastName": "Milton"
                }
            ]
        }, {
            "teamID": 10,
            "name": "Detroit Pistons",
            "logo": "https://logos-world.net/wp-content/uploads/2020/05/Detroit-Pistons-logo-700x394.png",
            "primary": "#C8102E",
            "secondary": "#1D42BA",
            "code": "DET",
            "conference": "East",
            "division": "Central",
            "location": "Detroit",
            "players": [
                {
                    "teamID": 10,
                    "playerID": 845,
                    "firstName": "Monte",
                    "lastName": "Morris"
                },
                {
                    "teamID": 10,
                    "playerID": 945,
                    "firstName": "Troy",
                    "lastName": "Brown Jr."
                },
                {
                    "teamID": 10,
                    "playerID": 987,
                    "firstName": "Kevin",
                    "lastName": "Knox II"
                },
                {
                    "teamID": 10,
                    "playerID": 931,
                    "firstName": "Marvin",
                    "lastName": "Bagley III"
                },
                {
                    "teamID": 10,
                    "playerID": 2557,
                    "firstName": "Jontay",
                    "lastName": "Porter"
                },
                {
                    "teamID": 10,
                    "playerID": 2811,
                    "firstName": "Quentin",
                    "lastName": "Grimes"
                },
                {
                    "teamID": 10,
                    "playerID": 2666,
                    "firstName": "James",
                    "lastName": "Wiseman"
                },
                {
                    "teamID": 10,
                    "playerID": 2599,
                    "firstName": "Killian",
                    "lastName": "Hayes"
                },
                {
                    "teamID": 10,
                    "playerID": 2587,
                    "firstName": "Malachi",
                    "lastName": "Flynn"
                },
                {
                    "teamID": 10,
                    "playerID": 2648,
                    "firstName": "Isaiah",
                    "lastName": "Stewart"
                },
                {
                    "teamID": 10,
                    "playerID": 2678,
                    "firstName": "Zavier",
                    "lastName": "Simpson"
                },
                {
                    "teamID": 10,
                    "playerID": 2829,
                    "firstName": "Isaiah",
                    "lastName": "Livers"
                },
                {
                    "teamID": 10,
                    "playerID": 2801,
                    "firstName": "Cade",
                    "lastName": "Cunningham"
                },
                {
                    "teamID": 10,
                    "playerID": 3790,
                    "firstName": "Stanley",
                    "lastName": "Umude"
                },
                {
                    "teamID": 10,
                    "playerID": 3451,
                    "firstName": "Jaden",
                    "lastName": "Ivey"
                },
                {
                    "teamID": 10,
                    "playerID": 3433,
                    "firstName": "Jalen",
                    "lastName": "Duren"
                },
                {
                    "teamID": 10,
                    "playerID": 3481,
                    "firstName": "Jared",
                    "lastName": "Rhoden"
                },
                {
                    "teamID": 10,
                    "playerID": 3438,
                    "firstName": "Simone",
                    "lastName": "Fontecchio"
                },
                {
                    "teamID": 10,
                    "playerID": 3969,
                    "firstName": "Tosan",
                    "lastName": "Evbuomwan"
                },
                {
                    "teamID": 10,
                    "playerID": 3417,
                    "firstName": "Buddy",
                    "lastName": "Boeheim"
                },
                {
                    "teamID": 10,
                    "playerID": 3970,
                    "firstName": "Marcus",
                    "lastName": "Sasser"
                },
                {
                    "teamID": 10,
                    "playerID": 3968,
                    "firstName": "Malcolm",
                    "lastName": "Cazalon"
                },
                {
                    "teamID": 10,
                    "playerID": 181,
                    "firstName": "Danilo",
                    "lastName": "Gallinari"
                },
                {
                    "teamID": 10,
                    "playerID": 84,
                    "firstName": "Alec",
                    "lastName": "Burks"
                },
                {
                    "teamID": 10,
                    "playerID": 190,
                    "firstName": "Taj",
                    "lastName": "Gibson"
                },
                {
                    "teamID": 10,
                    "playerID": 3971,
                    "firstName": "Ausar",
                    "lastName": "Thompson"
                },
                {
                    "teamID": 10,
                    "playerID": 384,
                    "firstName": "Mike",
                    "lastName": "Muscala"
                },
                {
                    "teamID": 10,
                    "playerID": 177,
                    "firstName": "Evan",
                    "lastName": "Fournier"
                },
                {
                    "teamID": 10,
                    "playerID": 60,
                    "firstName": "Bojan",
                    "lastName": "Bogdanovic"
                },
                {
                    "teamID": 10,
                    "playerID": 221,
                    "firstName": "Joe",
                    "lastName": "Harris"
                },
                {
                    "teamID": 10,
                    "playerID": 999,
                    "firstName": "Chimezie",
                    "lastName": "Metu"
                },
                {
                    "teamID": 10,
                    "playerID": 1001,
                    "firstName": "Shake",
                    "lastName": "Milton"
                }
            ]
        },{
            "teamID": 10,
            "name": "Detroit Pistons",
            "logo": "https://logos-world.net/wp-content/uploads/2020/05/Detroit-Pistons-logo-700x394.png",
            "primary": "#C8102E",
            "secondary": "#1D42BA",
            "code": "DET",
            "conference": "East",
            "division": "Central",
            "location": "Detroit",
            "players": [
                {
                    "teamID": 10,
                    "playerID": 845,
                    "firstName": "Monte",
                    "lastName": "Morris"
                },
                {
                    "teamID": 10,
                    "playerID": 945,
                    "firstName": "Troy",
                    "lastName": "Brown Jr."
                },
                {
                    "teamID": 10,
                    "playerID": 987,
                    "firstName": "Kevin",
                    "lastName": "Knox II"
                },
                {
                    "teamID": 10,
                    "playerID": 931,
                    "firstName": "Marvin",
                    "lastName": "Bagley III"
                },
                {
                    "teamID": 10,
                    "playerID": 2557,
                    "firstName": "Jontay",
                    "lastName": "Porter"
                },
                {
                    "teamID": 10,
                    "playerID": 2811,
                    "firstName": "Quentin",
                    "lastName": "Grimes"
                },
                {
                    "teamID": 10,
                    "playerID": 2666,
                    "firstName": "James",
                    "lastName": "Wiseman"
                },
                {
                    "teamID": 10,
                    "playerID": 2599,
                    "firstName": "Killian",
                    "lastName": "Hayes"
                },
                {
                    "teamID": 10,
                    "playerID": 2587,
                    "firstName": "Malachi",
                    "lastName": "Flynn"
                },
                {
                    "teamID": 10,
                    "playerID": 2648,
                    "firstName": "Isaiah",
                    "lastName": "Stewart"
                },
                {
                    "teamID": 10,
                    "playerID": 2678,
                    "firstName": "Zavier",
                    "lastName": "Simpson"
                },
                {
                    "teamID": 10,
                    "playerID": 2829,
                    "firstName": "Isaiah",
                    "lastName": "Livers"
                },
                {
                    "teamID": 10,
                    "playerID": 2801,
                    "firstName": "Cade",
                    "lastName": "Cunningham"
                },
                {
                    "teamID": 10,
                    "playerID": 3790,
                    "firstName": "Stanley",
                    "lastName": "Umude"
                },
                {
                    "teamID": 10,
                    "playerID": 3451,
                    "firstName": "Jaden",
                    "lastName": "Ivey"
                },
                {
                    "teamID": 10,
                    "playerID": 3433,
                    "firstName": "Jalen",
                    "lastName": "Duren"
                },
                {
                    "teamID": 10,
                    "playerID": 3481,
                    "firstName": "Jared",
                    "lastName": "Rhoden"
                },
                {
                    "teamID": 10,
                    "playerID": 3438,
                    "firstName": "Simone",
                    "lastName": "Fontecchio"
                },
                {
                    "teamID": 10,
                    "playerID": 3969,
                    "firstName": "Tosan",
                    "lastName": "Evbuomwan"
                },
                {
                    "teamID": 10,
                    "playerID": 3417,
                    "firstName": "Buddy",
                    "lastName": "Boeheim"
                },
                {
                    "teamID": 10,
                    "playerID": 3970,
                    "firstName": "Marcus",
                    "lastName": "Sasser"
                },
                {
                    "teamID": 10,
                    "playerID": 3968,
                    "firstName": "Malcolm",
                    "lastName": "Cazalon"
                },
                {
                    "teamID": 10,
                    "playerID": 181,
                    "firstName": "Danilo",
                    "lastName": "Gallinari"
                },
                {
                    "teamID": 10,
                    "playerID": 84,
                    "firstName": "Alec",
                    "lastName": "Burks"
                },
                {
                    "teamID": 10,
                    "playerID": 190,
                    "firstName": "Taj",
                    "lastName": "Gibson"
                },
                {
                    "teamID": 10,
                    "playerID": 3971,
                    "firstName": "Ausar",
                    "lastName": "Thompson"
                },
                {
                    "teamID": 10,
                    "playerID": 384,
                    "firstName": "Mike",
                    "lastName": "Muscala"
                },
                {
                    "teamID": 10,
                    "playerID": 177,
                    "firstName": "Evan",
                    "lastName": "Fournier"
                },
                {
                    "teamID": 10,
                    "playerID": 60,
                    "firstName": "Bojan",
                    "lastName": "Bogdanovic"
                },
                {
                    "teamID": 10,
                    "playerID": 221,
                    "firstName": "Joe",
                    "lastName": "Harris"
                },
                {
                    "teamID": 10,
                    "playerID": 999,
                    "firstName": "Chimezie",
                    "lastName": "Metu"
                },
                {
                    "teamID": 10,
                    "playerID": 1001,
                    "firstName": "Shake",
                    "lastName": "Milton"
                }
            ]
        }
    
  
  
    ]);


    // const [followedTeams, setFollowedTeams] = useState([]); // State to hold followed teams

    // useEffect(() => {
    //     const fetchFollowedTeams = async () => {
    //         try {
    //             const response = await axios.get('/api/followed-teams'); // Fetch followed teams
    //             setFollowedTeams(response.data); // Update state with fetched teams
    //         } catch (error) {
    //             console.error('Error fetching followed teams:', error);
    //         }
    //     };

    //     fetchFollowedTeams(); // Call the fetch function when the component mounts
    // }, []); // Empty dependency array ensures the effect runs only once


    const splitTeamsIntoRows = () => {
        const rows = [];
        let currentRow = [];
        followedTeams.forEach((team, index) => {
            currentRow.push(
                <Col key={team.teamID}>
                    <Sport team={team} />
                </Col>
            );
            if ((index + 1) % 3 === 0 || index === followedTeams.length - 1) {
                rows.push(
                    <Row key={index}>
                        {currentRow}
                    </Row>
                );
                currentRow = [];
            }
        });
        return rows;
    };

    return (
        <Container fluid>
            <header>
                <Navigation />
            </header>
            <main>
                {splitTeamsIntoRows()}
            </main>
        </Container>
    );
}

export default Sports;
