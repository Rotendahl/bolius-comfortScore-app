import React, { Component} from 'react';
import { Link } from 'react-router-dom'
import '../styles/improvements.css'
import '../styles/dawa.css'
import { MockJSON } from '../components/MockJSON.js'

class AddressInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      finalAddress: ''
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
    var newState = MockJSON;
    var that = this;
    var goNext = that.props.history.push;

    xhttp.onreadystatechange = function () {
      if(xhttp.readyState === 4 && xhttp.status === 200) {

        var resp = JSON.parse(xhttp.responseText);

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

        // Save new state in store
        that.props.store.address = finalAddress;
        that.props.store.currentState = newState;

        goNext('/Overview');
      }
    };

    xhttp.open("GET", 'https://ai01.boliusaws.dk/predictParams/' + encodeURI(
        this.state.finalAddress),
      true);
    xhttp.send();

  }

  render() {
    var rootDir = process.env.REACT_APP_COMFORTSCORE_ROOT_DIRECTORY;

    return (
      <div id="comfortscorewidget-container-setup" className="comfortscore-container">
        <div className="comfortscore-top">
          <h2><strong>Test</strong>: Kan dit indeklima blive bedre?</h2>
          <div className="autocomplete-container">
            <input type="text" className="dawa-autocomplete-input" id="dawa-autocomplete-input"
            value={this.state.address} onChange={this.handleChange} placeholder="Indtast din adresse"/>
          </div>
          <button className="btn btn-success" onClick={this.overViewPage}>Se dit resultat</button>

        </div>
        <div className="comfortscore-content">
          <p className="teaser"></p>
        </div>
      </div>
    )
  }
}

export default AddressInput;
