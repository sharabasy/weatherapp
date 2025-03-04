import React, { useState, useEffect } from "react";
import { Country } from "country-state-city";

const AppForm = (props) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);

  const fetchCities = async (countryCode) => {
    try {
      const response = await fetch("/city.list.json");
      const data = await response.json();

      const filteredCities = data.filter(
        (city) => city.country === countryCode
      );
      setCities(filteredCities);
    } catch (error) {
      console.error("Error loading city list:", error);
      setCities([]);
    }
  };

  useEffect(() => {
    if (selectedCountry) {
      setSelectedCity("");
      fetchCities(selectedCountry);
    } else {
      setCities([]);
    }
  }, [selectedCountry]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.getWeather(selectedCountry, selectedCity);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Weather App</h1>

      {/* Country Dropdown */}
      <select
        name="country"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="">Select Country</option>
        {Country.getAllCountries().map((country) => (
          <option key={country.isoCode} value={country.isoCode}>
            {country.name}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      <select
        name="city"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        disabled={!selectedCountry || cities.length === 0}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>

      <button type="submit">Get Weather</button>
    </form>
  );
};

export default AppForm;
