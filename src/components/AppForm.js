import React, {Component} from "react";

const AppForm = (props) => {
    return (
      <form onSubmit={props.getWeather}>
        <h1>Weather App</h1>
        <input name="country" type={'text'} placeholder={'Country...'} />
        <input name="city" type={'text'} placeholder={'City...'} />
        <button>Get Weather</button>
      </form >
    );
}

export default AppForm;
