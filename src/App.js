import React, {Component} from "react";
import AppForm from "./components/AppForm";
import Weather from "./components/Weather";

const apiKey = 'e36ed364400282e43250b6c4c0274d44';

// http://api.openweathermap.org/data/2.5/weather?q=cairo%2Cegypt&appid=e36ed364400282e43250b6c4c0274d44

class App extends Component{
  state = {
    temperature: '',
    city: '',
    country: '',
    humidity: '',
    description: '',
    error: ''
  }


  getWeather = async (e) => {
    e.preventDefault();
    let city = e.target.elements.city.value;
    let country = e.target.elements.country.value;
    const apiURL = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}%2C${country}&appid=${apiKey}`);
    const data = await apiURL.json();
     
    if(city && country){
      this.setState({
        temperature: `${Math.round(data.main.temp - 273.15)}° C`,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ''
      })
    }else{
      this.setState({
        temperature: '',
        city: '',
        country: '',
        humidity: '',
        description: '',
        error: 'Please enter data'
      })
    }
  }

  render(){
    return (
      <div className="App">
        <div className="form-content">
          <AppForm getWeather={this.getWeather}/>
          <Weather 
            temperature = {this.state.temperature}
            city = {this.state.city}
            country = {this.state.country}
            humidity = {this.state.humidity}
            description = {this.state.description}
            error = {this.state.error}
          />
        </div>
      </div>
    );
  }

}

export default App;
