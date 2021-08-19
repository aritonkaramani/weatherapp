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
    baseNoPageBreak: "api.openweathermap.org/data/2.5/weather?q=Malmo&units=metric&appid=29b3245b274832af2341a683f1348817"
  }
  const [query,setQuery] = useState('');
  const [forQuery,setForQuery] = useState('');
  const [cords,setCords] = useState({});
  const [forecast,setForecast] = useState({});
  const [weather,setWeather] = useState({});
  

  useEffect(() => {
    axios.get(`https://${api.baseNoPageBreak}`)
    .then(res => {
      setWeather(res.data)
    })
  },[])

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
      case "Dust":
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


  const onEnterPress = async evt => {
    if(evt.key === "Enter"){
      axios.get(`https://${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(res => {
        setWeather(res.data)
        setQuery('')

      })
      .then(
        axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${api.key}`)
        .then(result => {
          setCords(result.data) // cords
          if(cords.length != null) {
          axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${cords[0].lat}&lon=${cords[0].lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${api.key}`)
          .then(result => {
            setForecast(result.data)
            console.log(result.data)
          })
        }
          
        })
        )
  }
   
}

  let date = String(new window.Date());
  date = date.slice(3,15);


  return (
    <div className="App">
      <div className="wrapper">
        <input type="text" placeholder="Search for city..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={onEnterPress}/>
        {(typeof weather.main != "undefined") ? (
          <div className="textwrapper">
        <div className="location-box">
          <div className="location">{weather.name} , {weather.sys.country}</div>
          <div className="date">{date}</div>
        </div>
        <div className="weatherbox">
          <div className="temp">{Math.floor(weather.main.temp)}°C</div>
          <div className="weather">{weather.weather[0].main}</div>
          <div className="weatherIcon"><img src={weatherImage(weather.weather[0].main)} alt="" /></div>
        </div>
        </div>
        ) : ('')} 
      </div>
    </div>
  );
}

export default App;
