import React, { Component } from "react";
import AppForm from "./components/AppForm";
import Weather from "./components/Weather";
import { Country } from "country-state-city";

const apiKey = "e36ed364400282e43250b6c4c0274d44";

class App extends Component {
  state = {
    temperature: "",
    city: "",
    country: "",
    humidity: "",
    description: "",
    error: "",
  };

  getCountryName = (countryCode) => {
    const country = Country.getAllCountries().find(
      (c) => c.isoCode === countryCode
    );
    return country ? country.name : countryCode;
  };

  getWeather = async (country, city) => {
    if (!city || !country) {
      this.setState({ error: "Please select a country and a city" });
      return;
    }

    try {
      const apiURL = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`
      );
      const data = await apiURL.json();

      if (data.cod === 200) {
        this.setState({
          temperature: `${data.main.temp}° C`,
          city: data.name,
          country: this.getCountryName(data.sys.country),
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: "",
        });
      } else {
        this.setState({ error: "City not found. Please select a valid city." });
      }
    } catch (error) {
      this.setState({ error: "Failed to fetch weather data" });
    }
  };

  render() {
    return (
      <div className="App">
        <div className="form-content">
          <AppForm getWeather={this.getWeather} />
          {this.state.error ? (
            <Weather error={this.state.error} />
          ) : (
            <Weather
              temperature={this.state.temperature}
              city={this.state.city}
              country={this.state.country}
              humidity={this.state.humidity}
              description={this.state.description}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
