import React, { Component} from 'react';
import { Link } from 'react-router'
import '../styles/improvements.css'
import '../styles/dawa.css'
import { MockJSON } from '../components/MockJSON.js'

import Overview from './Overview.js'

class AddressInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      finalAddress: '',
      currentView: 'AddressInput',
      overviewParams: {},
      sliders: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.overViewPage = this.overViewPage.bind(this)
  }

  handleChange(event) {
    var target = event.target.value
    var dawaAutocomplete2 = require('dawa-autocomplete2');
    var inputElm = document.getElementById('dawa-autocomplete-input');
    var that = this;
    var component = dawaAutocomplete2.dawaAutocomplete(inputElm, {
      select: function (selected) {
        target = selected;

        // Update selected address somewhere else than for input field value
        that.updateFinalAddress(selected.tekst);

        // Hide suggestions if still visible
        var elements = document.getElementsByClassName('dawa-autocomplete-suggestions');
        for (var i=0; i < elements.length; i++) {
            elements[i].innerHTML = '';
        }
      }
    });

    this.setState((prevState, props) => ({
      address: target
    }));
  }

  updateFinalAddress(address) {
      this.setState((prevState, props) => ({
        finalAddress: address
      }));
  }

  overViewPage() {
    var xhttp = new XMLHttpRequest();
    var finalAddress = this.state.finalAddress;
    var newState = MockJSON
    var goNext = this.props.history.push
    var that = this;

    xhttp.onreadystatechange = function () {
      if(xhttp.readyState === 4 && xhttp.status === 200) {

        newState.finalAddress = finalAddress
        var resp = JSON.parse(xhttp.responseText);

        console.log('resp => ', resp);

        newState.sliders = [
          {
            "name": "Træk",
            "value": resp.draft * 10
            },
          {
            "name": "Temperatur",
            "value": resp.temperature * 10
            },
          {
            "name": "Fugt",
            "value": resp.moisture * 10
            },
          {
            "name": "Støj",
            "value": resp.noise * 10
            },
          {
            "name": "Dagslys",
            "value": resp.light * 10
            },
          {
            "name": "Lugt",
            "value": resp.smell * 10
            }
          ]

        newState.sliders.map((slider => newState.currentScore += slider.value /
          600 *
          100))

        that.setState({
            currentView: 'Overview',
            sliders: newState.sliders
        });

        // goNext('/Overview', newState);
      }
    };
    xhttp.open("GET", 'https://ai01.boliusaws.dk/predictParams/' + encodeURI(
        this.state.finalAddress),
      true);
    xhttp.send();

  }

  render() {
    var rootDir = process.env.REACT_APP_COMFORTSCORE_ROOT_DIRECTORY,
        currentView = this.state.currentView;

    if (currentView == 'Overview') {
        return (
            <Overview {...this.props} state={this.state} />
        )
    }
    else {
        return (
            <div className="container">
              <div id="comfortscorewidget-container-setup">
                <h1></h1>
                <p className="teaser"></p>
                <div className="autocomplete-container">
                  <input type="text" className="dawa-autocomplete-input" id="dawa-autocomplete-input"
                  value={this.state.address} onChange={this.handleChange} placeholder="Indtast din adresse"/>
                </div>
              </div>
              <div className="btn btn-success" onClick={this.overViewPage}>Gå til oversigt</div>

              <button className="btn text-left" id="comfortscorewidget-send-btn">Send mig en PDF</button>
              <button className="btn text-right" id="comfortscorewidget-save-btn">Gem i Mit Bolius</button>
            </div>
        )
    }


}
}

export default AddressInput;
