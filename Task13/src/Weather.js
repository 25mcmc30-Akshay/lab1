import React, { useState, useEffect } from "react";
import "./Weather.css";

function Weather(){

 const [city,setCity]=useState("London");
 const [weather,setWeather]=useState(null);
 const [error,setError]=useState("");

 const API_KEY="54d732aae3775320fc5cc741b35baa3d";

 const getWeather=async()=>{
   try{

     const response=await fetch(
       `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
     );

     const data=await response.json();

     if(data.cod!==200){
       throw new Error("City not found");
     }

     setWeather(data);
     setError("");

   }catch(err){
     setError("City not found");
     setWeather(null);
   }
 };

 useEffect(()=>{
   getWeather();
 },[]);

 const handleSubmit=(e)=>{
   e.preventDefault();
   getWeather();
 };

 return(

   <div className="weather-container">

     <form onSubmit={handleSubmit} className="search-box">

       <input
       type="text"
       value={city}
       onChange={(e)=>setCity(e.target.value)}
       placeholder="Enter city"
       />

       <button type="submit">Search</button>

     </form>

     {error && <p className="error">{error}</p>}

     {weather && (

       <div className="weather-card">

         <h2>{weather.name}</h2>
         <h3>{weather.main.temp}°C</h3>
         <p>Humidity: {weather.main.humidity}%</p>
         <p>{weather.weather[0].description}</p>

       </div>

     )}

   </div>

 );
}

export default Weather;