import './App.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Clouds from '../src/Assets/PNG/512/cloudy.png';
import Rain from '../src/Assets/PNG/512/rain.png';
import Sun from '../src/Assets/PNG/512/day_clear.png';
import Thunder from '../src/Assets/PNG/512/thunder.png';
import Snow from '../src/Assets/PNG/512/snow.png';
import Fog from '../src/Assets/PNG/512/fog.png';

function App() {

  const api = {
    key: "29b3245b274832af2341a683f1348817",
    base: "api.openweathermap.org/data/2.5/",
  }
  const [query,setQuery] = useState('');
  const [forecast,setForecast] = useState({});
  const [location,setLocation] = useState('Malmö, SE');
  


  function weatherImage(key){

    let icon = null; 
    switch (key) {
      case "Drizzle":
      case "Rain":
      icon = Rain;
      break;
      case "Clouds":
      icon = Clouds;
      break;
      case "Sunny":
      icon = Sun;
      break;
      case "Clear":
      icon = Sun;
      break;
      case "Thunderstorm":
      icon = Thunder;
      break;
      case "Snow":
      icon = Snow;
      break;
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Fog":
      case "Sand":
      case "Ash":
      case "Squall":
      case "Tornado":
      icon = Fog;
      break;
      default:
        break;
    }
    return icon;

  }
  const cordLocation = (lat, lon) => {
    axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${api.key}`)
    .then(result => {
      setLocation(`${result.data[0].name}, ${result.data[0].country}`)
    }
    )
  }

  const onEnterPress = (evt) => {
    if(evt.key === "Enter"){
      console.log(axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${api.key}`))
      axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${api.key}`) 
     .then(result => {
       console.log(result.data)
       if(result.data.length === 0){
         alert("Location Does Not Exist")
         setQuery('')
       }else{
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${result.data[0].lat}&lon=${result.data[0].lon}&exclude=minutely,hourly,alerts&units=metric&appid=${api.key}`)
      .then(result => {
        setForecast(result.data)
        setQuery('')
        cordLocation(result.data.lat,result.data.lon)
        console.log(result.data)
      
  })
       }
      
})    
}  
}
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=Malmo&limit=1&appid=${api.key}`)
     .then(result => {
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${result.data[0].lat}&lon=${result.data[0].lon}&exclude=minutely,hourly,alerts&units=metric&appid=${api.key}`)
      .then(result => {
        setForecast(result.data)
  })
})    
  },[])


  var week = [];
  let date = new window.Date();
  for(let i = 0; i<7; i++){
    date.setDate(date.getDate() + 1);
    week.push(String(date).slice(0,3));
  }
  let todaysDate = String(new window.Date());
  todaysDate = todaysDate.slice(3,15);
  return (
    <div className="App">
      {(typeof forecast.daily != "undefined") ? (
      <div className={("wrapper")}>
        <input type="text" placeholder="Search for city..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={onEnterPress}/>
        

          
          <div className="textwrapper">
        <div className="location-box">
          <div className="location">{location}</div>
          <div className="date">{todaysDate}</div>
        </div>
        <div className="weatherbox">
          <div className="temp">{Math.round(forecast.current.temp)}°C</div>
          <div className="weather">{forecast.current.weather[0].main}</div>
          <div className="weatherIcon"><img src={weatherImage(forecast.current.weather[0].main)} alt="" /></div>
        </div>
        <div className="forecast">
          <ul>
            <li>
              {week[0]}
              <span></span>
              {Math.round(forecast.daily[0].temp.day)}°C
              <span></span>
              <img src={weatherImage(forecast.daily[0].weather[0].main)} alt="" />
            </li>
            <li>
              {week[1]}
              <span></span>
              {Math.round(forecast.daily[1].temp.day)}°C
              <span></span>
              <img src={weatherImage(forecast.daily[1].weather[0].main)} alt="" />
            </li>
            <li>
              {week[2]}
              <span></span>
              {Math.round(forecast.daily[2].temp.day)}°C
              <span></span>
              <img src={weatherImage(forecast.daily[2].weather[0].main)} alt="" />
            </li>
            <li>
              {week[3]}
              <span></span>
              {Math.round(forecast.daily[3].temp.day)}°C
              <span></span>
              <img src={weatherImage(forecast.daily[3].weather[0].main)} alt="" />
            </li>
            <li>
              {week[4]}
              <span></span>
              {Math.round(forecast.daily[4].temp.day)}°C
              <span></span>
              <img src={weatherImage(forecast.daily[4].weather[0].main)} alt="" />
            </li>
            <li>
              {week[5]}
              <span></span>
              {Math.round(forecast.daily[5].temp.day)}°C
              <span></span>
              <img src={weatherImage(forecast.daily[5].weather[0].main)} alt="" />
            </li>
            <li>
              {week[6]}
              <span></span>
              {Math.round(forecast.daily[6].temp.day)}°C
              <span></span>
              <img src={weatherImage(forecast.daily[6].weather[0].main)} alt="" />
            </li>
          </ul>
        </div>
        </div>
       
      </div>
      ) : ('')} 
    </div>
  );
}

export default App;
