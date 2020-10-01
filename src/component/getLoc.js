import React from "react";

function GetLoc({ setLoc, setFind, find, loc }) {
  const saveLoc = (e) => {
    setLoc({
      ...loc,
      location: e.target.value,
      autoDetect: false,
      error: null,
    });
  };
  const handleLocation = () => {
    setFind(find + 1);
  };
  const autopick = () => {
    setLoc({ ...loc, autoDetect: true });
    setFind(find + 1);
  };
  return (
    <div className="getloc-container">
      <div className="search-container">
        <input
          type="text"
          value={loc.location}
          className="loc_in"
          placeholder="Location..."
          onChange={saveLoc}
        ></input>
        <button className="get" onClick={handleLocation}>
          Get
        </button>
      </div>
      <p>
        My current Location
        <i className="pickLocation fa fa-crosshairs" onClick={autopick}></i>
        <span className="warning">{loc.error === null ? "" : loc.error}</span>
      </p>
    </div>
  );
}
export default GetLoc;
