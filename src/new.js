import React, {Component} from "react";
import {
  ReactiveBase,
  SingleList,
  SelectedFilters,
  MultiDataList,
  RangeSlider,
  MultiList
} from "@appbaseio/reactivesearch";
import {ReactiveMap} from "@appbaseio/reactivemaps";

import "./App.css";

class App extends Component {
  render() {
    return (
      <ReactiveBase
        app="earthquake"
        credentials="OrXIHcgHn:d539c6e7-ed14-4407-8214-c227b0600d8e"
        type="places"
        mapKey="AIzaSyBQdVcKCe0q_vOBDUvJYpzwGpt_d_uTj4Q"
      >
        <div className="row">
          <div className="col">
            <SingleList
              title="Places"
              componentId="places"
              dataField="place.raw"
              size={50}
              showSearch
            />
            <MultiList
              componentId="PlaceSensor"
              dataField="place.raw"
              defaultSelected={["Japan"]}
              showCount={true}
              size={1000}
              showSearch={true}
              title="Places"
              searchPlaceholder="Search Place"
            />
            <RangeSlider
              componentId="RangeSensor"
              dataField="mag"
              react={{
                and: "PlaceSensor"
              }}
              defaultSelected={{
                start: 1,
                end: 9
              }}
              range={{
                start: 1,
                end: 10
              }}
              title="Magnitude"
              stepValue={1}
            />
            <RangeSlider
              componentId="YearSensor"
              dataField="time"
              react={{
                and: "PlaceSensor"
              }}
              defaultSelected={{
                start: 1901,
                end: 2015
              }}
              range={{
                start: 1900,
                end: 2016
              }}
              title="Year"
              stepValue={1}
            />
          </div>
          <div className="col">
            <SelectedFilters />
            <ReactiveMap
              componentId="map"
              dataField="location"
              react={{
                and: "places"
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
