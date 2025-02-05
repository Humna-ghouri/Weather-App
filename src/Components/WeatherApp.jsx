
// import React, { useRef, useState, useEffect } from "react";
// import "./WeatherApp.css";

// const Weather = () => {
//   const inputRef = useRef(null);
//   const [weatherData, setWeatherData] = useState([]);
//   const [greeting, setGreeting] = useState("");
//   const [weatherEmoji, setWeatherEmoji] = useState("");
//   const [background, setBackground] = useState("default-bg");
//   const [showAll, setShowAll] = useState(false);

//   useEffect(() => {
//     const currentHour = new Date().getHours();
//     if (currentHour < 12) {
//       setGreeting("Good morning! Start your day by checking the weather. 🌅");
//     } else if (currentHour < 18) {
//       setGreeting("Good afternoon! How's the weather treating you? 🌞");
//     } else {
//       setGreeting("Hey there, it's a cozy night. Perfect for checking the weather! 🌙");
//     }
//   }, []);

//   const getCityName = async () => {
//     const cityName = inputRef.current.value;

//     try {
//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b371510967a8844c78bde9c9f4696f3e&units=metric`
//       );
//       const data = await res.json();

//       if (res.ok) {
//         setWeatherData([data, ...weatherData]);
//         updateWeatherEmoji(data.main.temp);
//         updateBackground(data.weather[0].main.toLowerCase());
//       } else {
//         alert(data.message || "Error fetching weather data.");
//       }
//     } catch (e) {
//       console.error("Error:", e);
//     }
//   };

//   const updateWeatherEmoji = (temp) => {
//     if (temp < 15) {
//       setWeatherEmoji("❄️");
//     } else if (temp > 30) {
//       setWeatherEmoji("☀️");
//     } else {
//       setWeatherEmoji("🌤️");
//     }
//   };

//   const updateBackground = (condition) => {
//     let newBackground = "default-bg";

//     if (condition.includes("hot")) {
//       newBackground = "hot-bg";
//     } else if (condition.includes("snow")) {
//       newBackground = "snowy-bg";
//     } else if (condition.includes("cold")) {
//       newBackground = "cold-bg";
//     } else if (condition.includes("wind")) {
//       newBackground = "windy-bg";
//     } else if (condition.includes("rain")) {
//       newBackground = "rainy-bg";
//     }

//     console.log(`Background updated to: ${newBackground}`);
//     setBackground(newBackground);
//   };

//   return (
//     <div className={`weather-app ${background}`}>
//       <h1 className="greeting">{greeting}</h1>
//       {weatherEmoji && <div className="weather-emoji">{weatherEmoji}</div>}

//       <div className="weather-form">
//         <label htmlFor="cityName">Enter your city name</label>
//         <input type="text" ref={inputRef} id="cityName" placeholder="City Name" />
//         <button onClick={getCityName}>Get Weather</button>
//       </div>

//       {weatherData.length ? (
//         <>
//           {showAll ? (
//             weatherData.map((data, index) => (
//               <div key={index} className="card">
//                 <p>City: {data?.name}</p>
//                 <p>Country: {data?.sys?.country}</p>
//                 <p>Temperature: {data?.main?.temp}°C</p>
//                 <p>Feels Like: {data?.main?.feels_like}°C</p>
//                 <p>Humidity: {data?.main?.humidity}%</p>
//                 <img
//                   src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
//                   alt="weather icon"
//                 />
//               </div>
//             ))
//           ) : (
//             <div className="card">
//               <p>City: {weatherData[0]?.name}</p>
//               <p>Country: {weatherData[0]?.sys?.country}</p>
//               <p>Temperature: {weatherData[0]?.main?.temp}°C</p>
//               <p>Feels Like: {weatherData[0]?.main?.feels_like}°C</p>
//               <p>Humidity: {weatherData[0]?.main?.humidity}%</p>
//               <img
//                 src={`https://openweathermap.org/img/wn/${weatherData[0]?.weather[0]?.icon}@2x.png`}
//                 alt="weather icon"
//               />
//             </div>
//           )}
//           <button onClick={() => setShowAll(!showAll)} id="ShowAllBtn">
//             {showAll ? "Show Less" : "Show More"}
//           </button>
//         </>
//       ) : (
//         <p>No data available. Enter a city name!</p>
//       )}
//     </div>
//   );
// };

// export default Weather;


// src/Navbar.js

// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FaGlobe } from 'react-icons/fa';
// import axios from 'axios';
// import './WeatherApp.css'; // Custom CSS file for additional styling

// const WeatherApp = () => {
//     const [cityName, setCityName] = useState('');
//     const [weatherData, setWeatherData] = useState(null);
//     const [forecastData, setForecastData] = useState([]);
//     const [isDarkMode, setIsDarkMode] = useState(false);
//     const [isMapVisible, setIsMapVisible] = useState(false); // Add this state

//     const toggleTheme = () => {
//         setIsDarkMode(!isDarkMode);
//         document.body.style.backgroundColor = isDarkMode ? '#f0f0f0' : '#000';
//         document.body.style.color = isDarkMode ? '#000' : '#fff';
//     };

//     const fetchWeatherData = async (e) => {
//         e.preventDefault();
//         if (!cityName) {
//             alert("Please enter a city name.");
//             return;
//         }
//         const apiKey = 'b371510967a8844c78bde9c9f4696f3e';
//         try {
//             // Fetch current weather data
//             const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
//             if (response.status === 200) {
//                 setWeatherData(response.data);
//                 // Fetch 6-day forecast data
//                 const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`);
//                 setForecastData(forecastResponse.data.list);
//             }
//         } catch (error) {
//             alert("Please enter a valid city name or check the country name.");
//             console.error("Error fetching weather data:", error);
//         }
//     };

//     // Function to get unique days from forecast data
//     const getUniqueDays = (data) => {
//         const uniqueDays = {};
//         data.forEach(item => {
//             const date = new Date(item.dt * 1000);
//             const day = date.toLocaleDateString(undefined, { weekday: 'long' });
//             if (!uniqueDays[day]) {
//                 uniqueDays[day] = item;
//             }
//         });
//         return Object.values(uniqueDays);
//     };
    
//     // Replace the onClick for the map button with this function
//         const handleMapClick = () => {
//             if (weatherData) {
//                 const { temp, humidity, pressure } = weatherData.main;
//                 const { speed: windSpeed } = weatherData.wind;
        
//                 const popupMessage = `
//                 🌍 City: ${weatherData.name}
//                 🌡️ Temperature: ${temp} °C
//                 💧 Humidity: ${humidity} %
//                 💨 Wind Speed: ${windSpeed} m/s
//                 🔵 Pressure: ${pressure} hPa
//                 `;
//                 alert(popupMessage); // Display information in a popup
//             } else {
//                 alert("Please search for a city to see its weather details!");
//             }
//         };
    

//     const uniqueForecastData = getUniqueDays(forecastData);

//     return (
//         <div>
//             <nav className={`navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
//                 <div className="container-fluid">
//                     <a className="navbar-brand" href="#">
//                         <FaGlobe /> Global Weather
//                     </a>
//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarNav">
//                         <form className="d-flex ms-auto" onSubmit={fetchWeatherData}>
//                             <input 
//                                 className="form-control me-2" 
//                                 type="search" 
//                                 placeholder="City" 
//                                 value={cityName} 
//                                 onChange={(e) => setCityName(e.target.value)} 
//                                 style={{ width: '200px', height: '38px' }} // Smaller size
//                             />
//                             <button className="btn btn-search" type="submit" style={{ backgroundColor: isDarkMode ? '#133E87' : '#47B5FF', color: 'white', height: '38px' }}>
//                                 Search
//                             </button>
//                             <button className="btn btn-toggle ms-2" style={{ backgroundColor: isDarkMode ? '#133E87' : '#47B5FF', color: 'white', height: '38px' }} onClick={toggleTheme}>
//                                 {isDarkMode ? 'Light Mode' : 'Dark Mode'}
//                             </button>
//                             {/* New button for showing map */}
//                             <button className="btn btn-map ms-2" style={{ backgroundColor: isDarkMode ? '#133E87' : '#47B5FF', color: 'white', height: '38px' }} onClick={() => setIsMapVisible(!isMapVisible)}>
//                                 {isMapVisible ? 'Hide Map' : 'Show Map'}
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </nav>

//             {weatherData && (
//                 <div className="weather-card" style={{ backgroundColor: isDarkMode ? '#133E87' : '#47B5FF', color: 'white', padding: '20px', borderRadius: '10px', margin: '20px' }}>
//                     <h2>{weatherData.name}</h2>
//                     <p><strong>Temperature:</strong> {weatherData.main.temp} °C</p>
//                     <p><strong>Real Feel:</strong> {weatherData.main.feels_like} °C</p>
//                     <p><strong>Wind:</strong> {weatherData.wind.speed} m/s</p>
//                     <p><strong>Pressure:</strong> {weatherData.main.pressure} hPa</p>
//                     <p><strong>Humidity:</strong> {weatherData.main.humidity} %</p>
//                     <p><strong>Time:</strong> {new Date().toLocaleString()}</p>
//                     <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
//                 </div>
//             )}

//             {uniqueForecastData.length > 0 && (
//                 <div className="forecast-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
//                     {uniqueForecastData.slice(0, 6).map((forecast, index) => {
//                         const date = new Date(forecast.dt * 1000);
//                         const dayName = date.toLocaleDateString(undefined, { weekday: 'long' });
//                         return (
//                             <div key={index} className="forecast-card" style={{ backgroundColor: isDarkMode ? '#444' : '#ccc', color: isDarkMode ? '#fff' : '#000', padding: '10px', borderRadius: '10px', margin: '10px', width: '150px' }}>
//                                 <h5 style={{ fontWeight: 'bold' }}>{dayName}</h5>
//                                 <p><strong>Temp:</strong> {forecast.main.temp} °C</p>
//                                 <p><strong>Humidity:</strong> {forecast.main.humidity} %</p>
//                                 <p><strong>Wind:</strong> {forecast.wind.speed} m/s</p>
//                                 <img src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`} alt="Weather Icon" />
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}

//             {/* Show map if isMapVisible is true */}
//             {isMapVisible && weatherData && (
//                 <div className="map-container" style={{ width: '100%', height: '400px', marginTop: '20px' }}>
//                     <iframe
//                         src={`https://www.google.com/maps?q=${weatherData.coord.lat},${weatherData.coord.lon}&z=12&output=embed`}
//                         width="100%" 
//                         height="100%" 
//                         frameBorder="0" 
//                         style={{ border: '0' }}
//                         allowFullScreen=""
//                     ></iframe>
//                 </div>
//             )
//             }
//         </div>
        
//     );
// };

// export default WeatherApp ;








// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FaGlobe } from 'react-icons/fa';
// import axios from 'axios';
// import './WeatherApp.css'; 

// const WeatherApp = () => {
//     const [cityName, setCityName] = useState('');
//     const [weatherData, setWeatherData] = useState(null);
//     const [forecastData, setForecastData] = useState([]);
//     const [isDarkMode, setIsDarkMode] = useState(false);
//     const [isMapVisible, setIsMapVisible] = useState(false);

//     const toggleTheme = () => {
//         setIsDarkMode(!isDarkMode);
//         document.body.style.backgroundColor = isDarkMode ? '#f0f0f0' : '#000';
//         document.body.style.color = isDarkMode ? '#000' : '#fff';
//     };

//     const fetchWeatherData = async (e) => {
//         e.preventDefault();
//         if (!cityName) {
//             alert("Please enter a city name.");
//             return;
//         }
//         const apiKey = 'b371510967a8844c78bde9c9f4696f3e';
//         try {
//             const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
//             if (response.status === 200) {
//                 setWeatherData(response.data);
//                 const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`);
//                 setForecastData(forecastResponse.data.list);
//             }
//         } catch (error) {
//             alert("Please enter a valid city name or check the country name.");
//             console.error("Error fetching weather data:", error);
//         }
//     };

//     const getUniqueDays = (data) => {
//         const uniqueDays = {};
//         data.forEach(item => {
//             const date = new Date(item.dt * 1000);
//             const day = date.toLocaleDateString(undefined, { weekday: 'long' });
//             if (!uniqueDays[day]) {
//                 uniqueDays[day] = item;
//             }
//         });
//         return Object.values(uniqueDays);
//     };

//     const handleMapClick = () => {
//         if (weatherData) {
//             const { temp, humidity, pressure } = weatherData.main;
//             const { speed: windSpeed } = weatherData.wind;

//             const popupMessage = `
//                 🌍 City: ${weatherData.name}
//                 🌡️ Temperature: ${temp} °C
//                 💧 Humidity: ${humidity} %
//                 💨 Wind Speed: ${windSpeed} m/s
//                 🔵 Pressure: ${pressure} hPa
//             `;
//             alert(popupMessage);
//         } else {
//             alert("Please search for a city to see its weather details!");
//         }
//     };

//     const uniqueForecastData = getUniqueDays(forecastData);

//     return (
//         <div>

// <nav className={`navbar navbar-expand ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`} >
//     <div className="container-fluid" id='nav'>
//         <a className="navbar-brand" href="#">
//             <FaGlobe /> Global Weather
//         </a>
//         <div className="d-flex ms-auto" onSubmit={fetchWeatherData}>
//             <form className="d-flex">
//                 <input 
//                     className="form-control me-2" 
//                     type="search" 
//                     placeholder="City" 
//                     value={cityName} 
//                     onChange={(e) => setCityName(e.target.value)} 
//                     style={{ width: '200px', height: '38px' }}
//                 />
//                 <button className="btn btn-search" type="submit" style={{ backgroundColor: isDarkMode ? '#133E87' : '#47B5FF', color: 'white', height: '35px' }}>
//                     Search
//                 </button>
//                 <button className="btn btn-toggle ms-2" style={{ backgroundColor: isDarkMode ? '#133E87' : '#47B5FF', color: 'white', height: '38px' }} onClick={toggleTheme}>
//                     {isDarkMode ? 'Light Mode' : 'Dark Mode'}
//                 </button>
//                 <button className="btn btn-map ms-2" style={{ backgroundColor: isDarkMode ? '#133E87' : '#47B5FF', color: 'white', height: '38px' }} onClick={() => setIsMapVisible(!isMapVisible)}>
//                     {isMapVisible ? 'Hide Map' : 'Show Map'}
//                 </button>
//             </form>
//         </div>
//     </div>
// </nav> 




//             {weatherData && (
//                 <div className="weather-card" style={{ backgroundColor: isDarkMode ? '#133E87' : '#47B5FF', color: 'white', padding: '20px', borderRadius: '10px', margin: '20px' }}>
//                     <h2>{weatherData.name}</h2>
//                     <p><strong>Temperature:</strong> {weatherData.main.temp} °C</p>
//                     <p><strong>Real Feel:</strong> {weatherData.main.feels_like} °C</p>
//                     <p><strong>Wind:</strong> {weatherData.wind.speed} m/s</p>
//                     <p><strong>Pressure:</strong> {weatherData.main.pressure} hPa</p>
//                     <p><strong>Humidity:</strong> {weatherData.main.humidity} %</p>
//                     <p><strong>Time:</strong> {new Date().toLocaleString()}</p>
//                     <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
//                 </div>
//             )}

//             {uniqueForecastData.length > 0 && (
//                 <div className="forecast-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
//                     {uniqueForecastData.slice(0, 6).map((forecast, index) => {
//                         const date = new Date(forecast.dt * 1000);
//                         const dayName = date.toLocaleDateString(undefined, { weekday: 'long' });
//                         return (
//                             <div key={index} className="forecast-card" style={{ backgroundColor: isDarkMode ? '#444' : '#ccc', color: isDarkMode ? '#fff' : '#000', padding: '10px', borderRadius: '10px', margin: '10px', width: '150px' }}>
//                                 <h5 style={{ fontWeight: 'bold' }}>{dayName}</h5>
//                                 <p><strong>Temp:</strong> {forecast.main.temp} °C</p>
//                                 <p><strong>Humidity:</strong> {forecast.main.humidity} %</p>
//                                 <p><strong>Wind:</strong> {forecast.wind.speed} m/s</p>
//                                 <img src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`} alt="Weather Icon" />
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}

//             {isMapVisible && weatherData && (
//                 <div className="map-container" style={{ width: '100%', height: '400px', marginTop: '20px' }}>
//                     <iframe
//                         src={`https://www.google.com/maps?q=${weatherData.coord.lat},${weatherData.coord.lon}&z=12&output=embed`}
//                         width="100%" 
//                         height="100%" 
//                         frameBorder="0" 
//                         style={{ border: '0' }}
//                         allowFullScreen=""
//                     ></iframe>
//                 </div>
//             )}
//         </div>
//     );
// };

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGlobe, FaMap, FaMapMarkerAlt, FaSun, FaMoon, FaSearch } from 'react-icons/fa'; // Import the icons
import axios from 'axios';
import Swal from 'sweetalert2';
import './WeatherApp.css';

const WeatherApp = () => {
    const [cityName, setCityName] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMapVisible, setIsMapVisible] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode', !isDarkMode);
    };

    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
    }, [isDarkMode]);

    const fetchWeatherData = async (e) => {
        e.preventDefault();
        if (!cityName) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please enter a city name.',
            });
            return;
        }
        const apiKey = 'b371510967a8844c78bde9c9f4696f3e';
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
            if (response.status === 200) {
                setWeatherData(response.data);
                const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`);
                setForecastData(forecastResponse.data.list);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please enter a valid city name or check the country name.',
            });
            console.error("Error fetching weather data:", error);
        }
    };

    const getUniqueDays = (data) => {
        const uniqueDays = {};
        data.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dayKey = date.toISOString().split('T')[0];
            if (!uniqueDays[dayKey]) {
                uniqueDays[dayKey] = item;
            }
        });
        return Object.values(uniqueDays);
    };

    const uniqueForecastData = getUniqueDays(forecastData).slice(1, 7);

    return (
        <div>
            <nav 
                className={`navbar navbar-expand ${isDarkMode ? 'navbar-dark' : 'navbar-light'}`} 
                style={{ backgroundColor: isDarkMode ? '#7C93C3' : '#EEF5FF' }}
            >
                <div className="container-fluid" id='nav'>
                    <a className="navbar-brand" href="#">
                        <FaGlobe /> Global Weather
                    </a>
                    <div className="d-flex ms-auto search-sec">
    <form className="d-flex flex-wrap" onSubmit={fetchWeatherData}>
        <input 
            className="form-control me-2" 
            type="search" 
            placeholder="City" 
            value={cityName} 
            onChange={(e) => setCityName(e.target.value)} 
            style={{ width: '200px', height: '38px' }}
        />
        <button className="btn btn-search" type="submit" style={{ backgroundColor: isDarkMode ? '#435585 ' : '#707fa9', color: 'white', height: '35px' }}>
            <FaSearch />
        </button>
        <button className="btn btn-toggle ms-2" style={{ backgroundColor: isDarkMode ? '#435585' : '#707fa9', color: 'white', height: '38px' }} onClick={toggleTheme}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
        <button className="btn btn-map ms-2" style={{ backgroundColor : isDarkMode ? '#435585' : '#707fa9', color: 'white', height: '38px' }} onClick={() => setIsMapVisible(!isMapVisible)}>
            {isMapVisible ? <FaMapMarkerAlt /> : <FaMap />}
        </button>
    </form>
</div>
                </div>
            </nav>

            {weatherData && (
                <div className={`weather-card ${isDarkMode ? 'dark-mode' : ''}`}>
                    <h2>{weatherData.name}</h2>
                    <p><strong>Temperature:</strong> {weatherData.main.temp} °C</p>
                    <p><strong>Real Feel:</strong> {weatherData.main.feels_like} °C</p>
                    <p><strong>Wind:</strong> {weatherData.wind.speed} m/s</p>
                    <p><strong>Pressure:</strong> {weatherData.main.pressure} hPa</p>
                    <p><strong>Humidity:</strong> {weatherData.main.humidity} %</p>
                    <p><strong>Time:</strong> {new Date().toLocaleString()}</p>
                    <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
                </div>
            )}

            {uniqueForecastData.length > 0 && (
                <div className="forecast-container">
                    {uniqueForecastData.map((forecast, index) => {
                        const date = new Date(forecast.dt * 1000);
                        const dayName = date.toLocaleDateString(undefined, { weekday: 'long' });
                        return (
                            <div key={index} className={`forecast-card ${isDarkMode ? 'dark-mode' : ''}`}>
                                <h5 style={{ fontWeight: 'bold' }}>{dayName}</h5>
                                <p><strong>Temp:</strong> {forecast.main.temp} °C</p>
                                <p><strong>Humidity:</strong> {forecast.main.humidity} %</p>
                                <p><strong>Wind:</strong> {forecast.wind.speed} m/s</p>
                                <img src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`} alt="Weather Icon" />
                            </div>
                        );
                    })}
                </div>
            )}

            {isMapVisible && weatherData && (
                <div className="map-container" style={{ width: '90%', height: '400px', margin: '20px auto', borderRadius: '10px', overflow: 'hidden' }}>
                    <iframe
                        src={`https://www.google.com/maps?q=${weatherData.coord.lat},${weatherData.coord.lon}&z=12&output=embed`}
                        width="100%" 
                        height="100%" 
                        frameBorder="0" 
                        style={{ border: '0' }}
                        allowFullScreen=""
                    ></iframe>
                </div>
            )}

            <footer className={`footer ${isDarkMode ? 'dark-mode' : ''} mt-4`}>
                <div className="container text-center">
                    <p className="mb-0">© {new Date().getFullYear()} Global Weather. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default WeatherApp;