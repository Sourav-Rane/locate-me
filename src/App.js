import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [address, setAddress] = useState("");

  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  const locateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        axios
          .get(
            ` https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=1 `
          )
          .then((res) => {
            console.log(res);
            const obj = res.data.address;
            setZip(obj.postcode);
            setCountry(obj.country);
            setState(obj.state);
          })
          .catch();
      });
    }
  };
  
  return (
    <div className="app">
      <button onClick={locateMe}>Auto Fill address</button>
      <form>
        ZIP:<input value={zip}></input>
        <br />
        Country:<input value={country}></input>
        <br />
        State:<input value={state}></input>
        <br />
      </form>
    </div>
  );
}

export default App;
