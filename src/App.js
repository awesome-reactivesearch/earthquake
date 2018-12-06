import React, {Component} from "react";
import {ReactiveMap} from "@appbaseio/reactivemaps";
import {
  ReactiveBase,
  SelectedFilters,
  SingleList,
  RangeSlider
} from "@appbaseio/reactivesearch";

import "./App.css";

class App extends Component {
  render() {
    return (
      <ReactiveBase
        app="earthquakes"
        credentials="dshr057Nz:e18bbbbe-5d55-4234-a17e-4d64fb2222c7"
        mapKey="AIzaSyBQdVcKCe0q_vOBDUvJYpzwGpt_d_uTj4Q"
      >
        <div className="main-container">
          <div className="filterContainer">
            <SingleList
              componentId="PlaceSensor"
              dataField="place.raw"
              defaultSelected="Japan"
              showCount={true}
              size={1000}
              react={{
                and: ["map", "RangeSensor", "YearSensor"]
              }}
              showSearch={true}
              title="Places"
              filterLabel="Places"
              searchPlaceholder="Search Place"
            />
            <hr />
            <RangeSlider
              componentId="RangeSensor"
              dataField="mag"
              react={{
                and: ["PlaceSensor", "map", "YearSensor"]
              }}
              defaultSelected={{
                start: 1,
                end: 9
              }}
              range={{
                start: 1,
                end: 10
              }}
              rangeLabels={{
                start: "1",
                end: "10"
              }}
              title="Magnitude"
              stepValue={1}
            />
            <hr />
            <RangeSlider
              componentId="YearSensor"
              dataField="time"
              react={{
                and: ["PlaceSensor", "RangeSensor", "YearSensor"]
              }}
              defaultSelected={{
                start: 1901,
                end: 2015
              }}
              range={{
                start: 1900,
                end: 2016
              }}
              rangeLabels={{
                start: "1900",
                end: "2016"
              }}
              title="Year"
              stepValue={1}
            />
          </div>
          <div className="mapContainer">
            <SelectedFilters
              className="selected-filters"
              clearAllLabel="Clear filter"
            />
            <ReactiveMap
              componentId="map"
              dataField="location"
              defaultZoom={6}
              size={100}
              react={{
                and: ["PlaceSensor", "RangeSensor", "YearSensor"]
              }}
              onData={result => ({
                label: result.mag
              })}
            />
          </div>
        </div>
      </ReactiveBase>
    );
  }
}

export default App;
