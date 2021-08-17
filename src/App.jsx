import './App.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Clouds from '../src/Assets/PNG/512/cloudy.png';
import Rain from '../src/Assets/PNG/512/rain.png';

function App() {

  const api = {
    key: "29b3245b274832af2341a683f1348817",
    base: "api.openweathermap.org/data/2.5/",
    baseNoPageBreak: "api.openweathermap.org/data/2.5/weather?q=Malmo&units=metric&appid=29b3245b274832af2341a683f1348817"
  }
  const [query,setQuery] = useState('');
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
      case "Rain":
      icon = Rain;
      break;
      case "Clouds":
      icon = Clouds;
    
      default:
        break;
    }
    return icon;

  }


  const onEnterPress = evt => {
    if(evt.key === "Enter"){
      axios.get(`https://${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(res => {
        setWeather(res.data)
        setQuery('')

      })

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
