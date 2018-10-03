import React, { Component } from "react";
import "../styles/improvements.css";
import "../styles/dawa.css";

import { Tracking } from "../components/Tracking.js";

class AddressInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
      finalAddress: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.overViewPage = this.overViewPage.bind(this);

    // Track load event
    Tracking.trackEvent("load", "initial address", true);
  }

  handleChange(event) {
    var target = event.target.value;
    var dawaAutocomplete2 = require("dawa-autocomplete2");
    var inputElm = document.getElementById("dawa-autocomplete-input");
    var that = this;
    dawaAutocomplete2.dawaAutocomplete(inputElm, {
      select: function(selected) {
        target = selected;

        // Update selected address somewhere else than for input field value
        that.updateFinalAddress(selected.tekst);

        // Hide suggestions if still visible
        var elements = document.getElementsByClassName(
          "dawa-autocomplete-suggestions"
        );
        for (var i = 0; i < elements.length; i++) {
          elements[i].innerHTML = "";
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
    var newState = {};
    var that = this;
    var goNext = that.props.history.push;

    xhttp.onreadystatechange = function() {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        var resp = JSON.parse(xhttp.responseText);

        // Clear currentScore before proceeding
        newState.currentScore = 0;

        newState.sliders = [
          {
            name: "Træk",
            value: resp.draft * 10,
            initial_value: resp.draft * 10
          },
          {
            name: "Temp",
            value: resp.temperature * 10,
            initial_value: resp.temperature * 10
          },
          {
            name: "Fugt",
            value: resp.moisture * 10,
            initial_value: resp.moisture * 10
          },
          {
            name: "Støj",
            value: resp.noise * 10,
            initial_value: resp.noise * 10
          },
          {
            name: "Lys",
            value: resp.light * 10,
            initial_value: resp.light * 10
          }
        ];

        newState.sliders.map(
          slider => (newState.currentScore += (slider.value / 500) * 100)
        );

        // Save new state in store
        newState.address = finalAddress;
        that.props.store.address = finalAddress;
        that.props.store.currentState = newState;

        goNext("/Overview");
      }
    };

    xhttp.open(
      "GET",
      "https://ai02.boliusaws.dk/predictParams/" +
        encodeURI(this.state.finalAddress),
      true
    );
    xhttp.send();
  }

  render() {
    var rootDir = process.env.REACT_APP_COMFORTSCORE_ROOT_DIRECTORY;

    return (
      <div
        id="comfortscorewidget-container-setup"
        className="comfortscore-container"
      >
        <div className="comfortscore-top">
          <h2>
            <strong>Test</strong>: Hvor god er komforten i dit hus?
          </h2>
          <div className="comfortscore-autocomplete-container">
            <input
              type="text"
              className="comfortscore-dawa-autocomplete-input"
              id="dawa-autocomplete-input"
              value={this.state.address}
              onChange={this.handleChange}
              placeholder="Indtast din adresse"
            />
          </div>
          <button
            className="comfortscore-btn comfortscore-btn-success"
            data-src="{action: 'load', eventLabel: 'initial address', noninteractive: true}"
            onClick={this.overViewPage}
          >
            Se dit resultat
          </button>
        </div>
        <div className="comfortscore-content comfortscore-hidden">
          <p className="comfortscore-teaser" />
        </div>
      </div>
    );
  }
}

export default AddressInput;
