import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b64e728d56b933d113ff5eb4925af54b`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation('');
    }
  };

  return (
    <div className="app">
      <div className='search'>
        <input 
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyUp={searchLocation}
          placeholder='Enter Location'
          type='text'
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            <h1>{(data.main?.temp - 273.15).toFixed(1)}℃</h1>
          </div>

          {/* <div className="temp">
            <h1>{data.main?.temp}℃</h1>
          </div> */}
          <div className='Description'>
            <p>{data.weather ? data.weather[0].description : ''}</p>
          </div>
        </div>
        {data.name != undefined && 
        <div className="bottom">
        <div className='feels'>
          <p className='bold'>{(data.main?.feels_like - 273.15).toFixed(1)}℃</p>
          <p>Feels Like</p>
        </div>
          {/* <div className='feels'>
            <p className='bold'>{data.main?.feels_like}℃</p>
            <p>Feels Like</p>
          </div> */}
          <div className='humidity'>
            <p className='bold'>{data.main?.humidity}%</p>
            <p>Humidity</p>
          </div>
          {/* <div className='wind'>
            <p className='bold'>{data.wind?.speed} KMPH</p>
            <p>Wind Speed</p>
          </div> */}
          <div className='wind'>
            <p className='bold'>{(data.wind?.speed * 3.6).toFixed(2)} KMPH</p>
            <p>Wind Speed</p> 
          </div>
        </div>
        }
      </div>
    </div>
  );
}

export default App;
