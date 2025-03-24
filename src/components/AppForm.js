import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Country } from "country-state-city";

const AppForm = (props) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cities, setCities] = useState([]);

  const fetchCities = async (countryCode) => {
    try {
      const response = await fetch("/city.list.json");
      const data = await response.json();
      const filteredCities = data
        .filter((city) => city.country === countryCode)
        .map((city) => ({ value: city.name, label: city.name }));
      setCities(filteredCities);
    } catch (error) {
      console.error("Error loading city list:", error);
      setCities([]);
    }
  };

  useEffect(() => {
    if (selectedCountry) {
      setSelectedCity(null);
      fetchCities(selectedCountry.value);
    } else {
      setCities([]);
    }
  }, [selectedCountry]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCountry && selectedCity) {
      props.getWeather(selectedCountry.value, selectedCity.value);
    } else {
      props.getWeather(null, null);
    }
  };

  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <h1>Weather App</h1>

      {/* Searchable Country Dropdown */}
      <Select
        options={countryOptions}
        value={selectedCountry}
        onChange={setSelectedCountry}
        placeholder="Select Country"
        isSearchable
        className="react-select-container"
        classNames={{
          control: () => "react-select__control",
          placeholder: (state) =>
            state.isFocused
              ? "react-select__placeholder react-select__placeholder--is-focused"
              : "react-select__placeholder",
          singleValue: () => "react-select__single-value",
          menu: () => "react-select__menu",
          input: () => "react-select__input",
          option: (state) =>
            state.isFocused
              ? "react-select__option react-select__option--is-focused"
              : state.isSelected
              ? "react-select__option react-select__option--is-selected"
              : "react-select__option",
        }}
      />

      {/* Searchable City Dropdown */}
      <Select
        options={cities}
        value={selectedCity}
        onChange={setSelectedCity}
        placeholder="Select City"
        isSearchable
        isDisabled={!selectedCountry || cities.length === 0}
        className="react-select-container"
        classNames={{
          control: () => "react-select__control",
          placeholder: (state) =>
            state.isFocused
              ? "react-select__placeholder react-select__placeholder--is-focused"
              : "react-select__placeholder",
          singleValue: () => "react-select__single-value",
          menu: () => "react-select__menu",
          input: () => "react-select__input",
          option: (state) =>
            state.isFocused
              ? "react-select__option react-select__option--is-focused"
              : state.isSelected
              ? "react-select__option react-select__option--is-selected"
              : "react-select__option",
        }}
      />

      <button type="submit">Get Weather</button>
    </form>
  );
};

export default AppForm;
