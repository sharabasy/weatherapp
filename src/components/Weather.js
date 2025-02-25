import React from "react";

const Weather = (props) => {
    return (
      <div className="weather">
        {
          props.country && 
          <p className="key">Country: 
            <span className="value">{props.country}</span>
          </p>
        }
        {
          props.city && 
          <p className="key">City: 
            <span className="value">{props.city}</span>
          </p>
        }
        {
          props.temperature && 
          <p className="key">Temperature: 
            <span className="value">{props.temperature}</span>
          </p>
        }
        {
          props.humidity && 
          <p className="key">Humidity: 
            <span className="value">{props.humidity}</span>
          </p>
        }
        {
          props.description && 
          <p className="key">Description: 
            <span className="value">{props.description}</span>
          </p>
        }
        {
          props.error && 
          <p className="key">Error: 
            <span className="value">{props.error}</span>
          </p>
        }
      </div>
    );
}

export default Weather;
