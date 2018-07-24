import React, { Component } from 'react';
import axios from 'axios';
import fire from './fire.png';
import './App.css';

// need to do ajax request to server to send lat and lon inputs
// then server needs to make api call with that data
// then on completion server needs to send api data back to front-end
// then front-end needs to display that info



class App extends Component {
  state = {
    lat: undefined,
    lon: undefined,
    temp: undefined,
    mean: undefined,
    median: undefined,
    mode: undefined,
    city: undefined,
    error: undefined,
  }

  componentDidMount(){
    
  };
  


  onSubmit = (e) => {
    e.preventDefault();

    let lat = e.target.elements.lat.value;
    let lon = e.target.elements.lon.value;

    let data = {
      "lat": lat,
      "lon": lon
    }

    this.setState(() => ({ lat: undefined }));
    this.setState(() => ({ lon: undefined }));
    this.setState(() => ({ city: undefined }));
    this.setState(() => ({ error: undefined }));
    this.setState(() => ({ mean: undefined }));
    this.setState(() => ({ median: undefined }));
    this.setState(() => ({ mode: undefined }));


    // axios post request
    const self = this;
    axios.post('/axios', data)
    .then(function(response){
      let mean = response.data.mean;
      //console.log("returned mean: " + response.data.mean);
      let median = response.data.median;
      //console.log("returned median: " + response.data.median);
      let mode = response.data.mode;
      //console.log("returned mode: " + response.data.mode);
      
      mean = (1.8 * (mean - 273) + 32).toFixed(2);
      //console.log("after conversion mean: " + mean);
      median = (1.8 * (median - 273) + 32).toFixed(2);
      //console.log("after conversion median: " + median);
      mode = (1.8 * (mode - 273) + 32).toFixed(2);
      //console.log("after conversion mode: " + mode);
      console.log("error: " + response.data.error);
      self.setState(() => ({ mean: mean }));
      self.setState(() => ({ median: median }));
      self.setState(() => ({ mode: mode }));
    })
    .catch(function(error){
      console.log(error);
    });

  }

  render() {
    return (
      <div className="app-main">
        <header className="app-header">
          <h1>
            Zac's 
            <img alt="fire emoji" src={fire} width="35px" height="35px" />
            <img alt="fire emoji" src={fire} width="35px" height="35px" />
            <img alt="fire emoji" src={fire} width="35px" height="35px" />
            Weather App!
          </h1>
        </header>
        
        <div className="app-body">
          <p>Check the current temperature anywhere on Earth</p>
          <form action="/formpost" method="post" onSubmit={this.onSubmit}>
            <label>Latitude</label><input placeholder="latitude" name="lat"></input>
            <label>Longitude</label><input placeholder="longitude" name="lon"></input>
            <input type="submit" value="Submit"></input>
          </form>

          {this.state.error && <p>{this.state.error}</p>}
          {this.state.city && <p>{this.state.city}</p>}
          {this.state.mean && <p>Temps Mean: {this.state.mean} &#8457;</p>}
          {this.state.median && <p>Temps Median: {this.state.median} &#8457;</p>}
          {this.state.mode && <p>Temps Mode: {this.state.mode} &#8457;</p>}
        </div>
      </div>
    );
  }
}

export default App;