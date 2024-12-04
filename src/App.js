import React, { useEffect, useState } from "react";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selCountry, setSelCountry] = useState("");
  const [selState, setSelState] = useState("");
  const [selCity, setSelCity] = useState("");
  const [text, setText] = useState("");
  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    if (!selCountry) return;
    setSelState("");
    setSelCity("");
    fetch(
      `https://crio-location-selector.onrender.com/country=${selCountry}/states`
    )
      .then((res) => res.json())
      .then((data) => setStates(data))
      .catch((err) => console.error(err));
  }, [selCountry]);
  useEffect(() => {
    if (!selState) return;
    setSelCity("");
    fetch(
      `https://crio-location-selector.onrender.com/country=${selCountry}/state=${selState}/cities`
    )
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => console.error(err));
  }, [selState]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Select Location</h1>
      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "10px",
          justifyContent: "center",
        }}
      >
        <select
          value={selCountry}
          onChange={(e) => setSelCountry(e.target.value)}
        >
          <option>Select Country</option>
          {countries.map((country) => (
            <option value={country} key={country}>
              {country}
            </option>
          ))}
        </select>
        <select
          value={selState}
          onChange={(e) => setSelState(e.target.value)}
          disabled={selCountry ? false : true}
        >
          <option>Select State</option>
          {states.map((state) => (
            <option value={state} key={state}>
              {state}
            </option>
          ))}
        </select>
        <select
          value={selCity}
          onChange={(e) => setSelCity(e.target.value)}
          disabled={selState ? false : true}
        >
          <option>Select City</option>
          {cities.map((city) => (
            <option value={city} key={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {selCity && (
        <p style={{ fontWeight: "bold", textAlign: "center" }}>
          You selected <span style={{ fontSize: "25px" }}>{selCity},</span>
          <span style={{ color: "gray" }}>
            {selState},{selCountry}
          </span>
        </p>
      )}
    </div>
  );
};

export default App;
