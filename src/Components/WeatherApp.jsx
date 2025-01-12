// import React, { useRef, useState } from "react";
// import axios from "axios";

// import "./WeatherApp.css"

// const Weather = () => {
//   // not recommended
//   //   const [city, setCity] = useState("");

//   const inputRef = useRef(null);
//   const [weatherData, setWeatherData] = useState([]);

//   const getCityName = async () => {
//     // not recommended
//     // let userCityName = document.getElementById("cityName")
//     // console.log(userCityName.value);
//     // axios

//     let cityName = inputRef.current.value;

//     try {
//       let res = await axios.get(
//         `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b371510967a8844c78bde9c9f4696f3e&units=metric`
//       );

//       setWeatherData([res.data,...weatherData]);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   return (
//     <>
//       <div>
//         <label htmlFor="cityName"> Enter your city name</label>
//         {/* not recommended */}

//         {/* <input
//         type="text"
//         onChange={(e) => {
//           setCity(e.target.value);
//           console.log(city);
//         }}
//         id="cityName"
//       /> */}

//         <input type="text" ref={inputRef} id="cityName" />
//         <br />
//         <button onClick={getCityName}>Get Weather</button>
//       </div>

//       {weatherData.length ? (
//        weatherData.map((weatherData)=>(

//         <div className="card">
//         <p>cityName {weatherData?.name}</p>
//         <p>country {weatherData?.sys?.country} </p>
//         <p>temp {weatherData?.main?.temp}</p>
//         <p>feels_like {weatherData?.main?.feels_like}</p>
//         <p>humidity {weatherData?.main?.humidity}</p>
//       </div>
//        ))
//       ) : (
//         ""
//       )}
//     </>
//   );
// };

// export default Weather;
// import React, { useRef, useState, useEffect } from "react";
// import "./WeatherApp.css";

// const Weather = () => {
//   const inputRef = useRef(null);
//   const [weatherData, setWeatherData] = useState([]);
//   const [greeting, setGreeting] = useState("");
//   const [weatherEmoji, setWeatherEmoji] = useState("");
//   const [showAll, setShowAll] = useState(false);

//   useEffect(() => {
//     // Set greeting based on the time of the day
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
//       } else {
//         alert(data.message || "Error fetching weather data.");
//       }
//     } catch (e) {
//       console.error("Error:", e);
//     }
//   };
  

//   const updateWeatherEmoji = (temp) => {
//     if (temp < 15) {
//       setWeatherEmoji("❄️"); // Cold weather emoji
//     } else if (temp > 30) {
//       setWeatherEmoji("☀️"); // Hot weather emoji
//     } else {
//       setWeatherEmoji(""); // Neutral weather
//     }
//   };

//   return (
//     <>
//       <div className="weather-app">
//         <h1 className="greeting">{greeting}</h1>
//         {weatherEmoji && <div className="weather-emoji">{weatherEmoji}</div>}

//         <div className="weather-form">
//           <label htmlFor="cityName">Enter your city name</label>
//           <input type="text" ref={inputRef} id="cityName" placeholder="City Name" />
//           <button onClick={getCityName}>Get Weather</button>
//         </div>

//         {weatherData.length ? (
//           <>
//             {showAll ? (
//               weatherData.map((data, index) => (
//                 <div key={index} className="card">
//                   <p>City: {data?.name}</p>
//                   <p>Country: {data?.sys?.country}</p>
//                   <p>Temperature: {data?.main?.temp}°C</p>
//                   <p>Feels Like: {data?.main?.feels_like}°C</p>
//                   <p>Humidity: {data?.main?.humidity}%</p>
//                   <img
//                     src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
//                     alt="weather icon"
//                   />
//                 </div>
//               ))
//             ) : (
//               <div className="card">
//                 <p>City: {weatherData[0]?.name}</p>
//                 <p>Country: {weatherData[0]?.sys?.country}</p>
//                 <p>Temperature: {weatherData[0]?.main?.temp}°C</p>
//                 <p>Feels Like: {weatherData[0]?.main?.feels_like}°C</p>
//                 <p>Humidity: {weatherData[0]?.main?.humidity}%</p>
//                 <img
//                   src={`https://openweathermap.org/img/wn/${weatherData[0]?.weather[0]?.icon}@2x.png`}
//                   alt="weather icon"
//                 />
//               </div>
//             )}
//             <button onClick={() => setShowAll(!showAll)} id="ShowAllBtn">
//               {showAll ? "Show Less" : "Show More"}
//             </button>
//           </>
//         ) : (
//           <p>No data available. Enter a city name!</p>
//         )}
//       </div>
//     </>
//   );
// };

import React, { useRef, useState, useEffect } from "react";
import "./WeatherApp.css";

const Weather = () => {
  const inputRef = useRef(null);
  const [weatherData, setWeatherData] = useState([]);
  const [greeting, setGreeting] = useState("");
  const [weatherEmoji, setWeatherEmoji] = useState("");
  const [background, setBackground] = useState("default-bg");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good morning! Start your day by checking the weather. 🌅");
    } else if (currentHour < 18) {
      setGreeting("Good afternoon! How's the weather treating you? 🌞");
    } else {
      setGreeting("Hey there, it's a cozy night. Perfect for checking the weather! 🌙");
    }
  }, []);

  const getCityName = async () => {
    const cityName = inputRef.current.value;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b371510967a8844c78bde9c9f4696f3e&units=metric`
      );
      const data = await res.json();

      if (res.ok) {
        setWeatherData([data, ...weatherData]);
        updateWeatherEmoji(data.main.temp);
        updateBackground(data.weather[0].main.toLowerCase());
      } else {
        alert(data.message || "Error fetching weather data.");
      }
    } catch (e) {
      console.error("Error:", e);
    }
  };

  const updateWeatherEmoji = (temp) => {
    if (temp < 15) {
      setWeatherEmoji("❄️");
    } else if (temp > 30) {
      setWeatherEmoji("☀️");
    } else {
      setWeatherEmoji("🌤️");
    }
  };

  const updateBackground = (condition) => {
    let newBackground = "default-bg";

    if (condition.includes("hot")) {
      newBackground = "hot-bg";
    } else if (condition.includes("snow")) {
      newBackground = "snowy-bg";
    } else if (condition.includes("cold")) {
      newBackground = "cold-bg";
    } else if (condition.includes("wind")) {
      newBackground = "windy-bg";
    } else if (condition.includes("rain")) {
      newBackground = "rainy-bg";
    }

    console.log(`Background updated to: ${newBackground}`);
    setBackground(newBackground);
  };

  return (
    <div className={`weather-app ${background}`}>
      <h1 className="greeting">{greeting}</h1>
      {weatherEmoji && <div className="weather-emoji">{weatherEmoji}</div>}

      <div className="weather-form">
        <label htmlFor="cityName">Enter your city name</label>
        <input type="text" ref={inputRef} id="cityName" placeholder="City Name" />
        <button onClick={getCityName}>Get Weather</button>
      </div>

      {weatherData.length ? (
        <>
          {showAll ? (
            weatherData.map((data, index) => (
              <div key={index} className="card">
                <p>City: {data?.name}</p>
                <p>Country: {data?.sys?.country}</p>
                <p>Temperature: {data?.main?.temp}°C</p>
                <p>Feels Like: {data?.main?.feels_like}°C</p>
                <p>Humidity: {data?.main?.humidity}%</p>
                <img
                  src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
                  alt="weather icon"
                />
              </div>
            ))
          ) : (
            <div className="card">
              <p>City: {weatherData[0]?.name}</p>
              <p>Country: {weatherData[0]?.sys?.country}</p>
              <p>Temperature: {weatherData[0]?.main?.temp}°C</p>
              <p>Feels Like: {weatherData[0]?.main?.feels_like}°C</p>
              <p>Humidity: {weatherData[0]?.main?.humidity}%</p>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData[0]?.weather[0]?.icon}@2x.png`}
                alt="weather icon"
              />
            </div>
          )}
          <button onClick={() => setShowAll(!showAll)} id="ShowAllBtn">
            {showAll ? "Show Less" : "Show More"}
          </button>
        </>
      ) : (
        <p>No data available. Enter a city name!</p>
      )}
    </div>
  );
};

export default Weather;
