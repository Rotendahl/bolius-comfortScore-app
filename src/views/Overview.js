import React, { Component } from "react";
import { Redirect } from "react-router";

import "../styles/overview.css";
import Slider from "../components/slider.js";
import TextRow from "../components/TextRow.js";
import { MockJSON } from "../components/MockJSON.js";

import Improvements from "./Improvements.js";
import { Tracking } from "../components/Tracking.js";

class Overview extends Component {
  constructor(props) {
    super(props);

    var state = this.props.store.currentState;
    this.state = state;

    this.updateScore = this.updateScore.bind(this);
    this.improvementsPage = this.improvementsPage.bind(this);

    // Track load event
    Tracking.trackEvent("load", "overview", false);
  }

  updateScore(newVal, key) {
    var sliders = this.state.sliders;
    var oldVal = (sliders[parseInt(key, 10)].value / 500) * 100;
    sliders[parseInt(key, 10)].value = newVal;
    this.setState(
      state => ({
        currentScore: state.currentScore + (newVal / 500) * 100 - oldVal,
        sliders: sliders
      }),
      function() {}
    );
  }

    improvementsPage() {
        var goNext = this.props.history.push,
          newState = this.state;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                var resp = JSON.parse(xhttp.responseText);
                console.log(resp)
                var cards = []
                for (var i = 0; i < resp.length; i++) {
                    var improv = resp[i]
                    var card = {
                          key: parseInt(resp[i]['SEEB'].split("-").join(""), 10),
                          title: resp[i]['title'],
                          done: false,
                          willDo: false,
                          description: resp[i]['describtion']
                        }
                    var targets = []
                    // fix key mashup
                    resp[i].light ? targets.push('Lys') :  1 + 1;
                    resp[i].noise ? targets.push('Støj') :  1 + 1;
                    resp[i].moisture ? targets.push('Fugt') :  1 + 1;
                    resp[i].temperature ? targets.push('Temperatur') :  1 + 1;

                    card.targets = targets
                    cards.push(card)
                }
                newState.cards = cards
                goNext("/Improvements");
            }
        }
        xhttp.open(
          "GET",
          "https://ai01.boliusaws.dk/predictImprovements/" +
            encodeURI(this.state.address),
          true
        );
        xhttp.send();
    }

  render() {
    var img =
      "https://maps.googleapis.com/maps/api/streetview?parameters&size=880x542&key=" +
      "AIzaSyBy3Ect_uyKDDhuRCQvUC0n7KQa5mbbiZg&location=" +
      this.state.address;

    if (this.state.address === undefined || this.state.address === "") {
      return <Redirect to="/" />;
    }

    return (
      <div
        id="comfortscorewidget-container-setup"
        className="comfortscore-container"
      >
        <div className="comfortscore-top comfortscore-activated">
          <h2>
            <strong>Resultat</strong> for {this.state.address}
          </h2>
        </div>
        <div className="comfortscore-content">
          <div className="comfortscore-twocol">
            <div className="comfortscore-col">
              <div className="comfortscore-wrapper">
                <p className="comfortscore-current">
                  <span className="comfortscore-score">
                    {Math.floor(this.state.currentScore)}%
                  </span>
                  <span className="comfortscore-label">
                    Din nuværende komfortscore
                  </span>
                </p>
              </div>
              <div className="comfortscore-map">
                <img alt="house" src={img} />
              </div>
              <div className="comfortscore-instruction">
                <TextRow
                  text={
                    "Resultatet viser, hvordan andre i lignende huse oplever komforten. Juster de små smileyer, så det passer til din oplevelse – så får du en ny score og forslag til, hvordan du kan forbedre komforten hjemme hos dig."
                  }
                />
              </div>
            </div>
            <div className="comfortscore-col comfortscore-sliders">
              {this.state.sliders.map((slider, index) => (
                <Slider
                  key={index}
                  index={index}
                  updateScore={this.updateScore}
                  parameter={slider.name}
                  value={this.state.sliders[index].value}
                />
              ))}
              {/* TODO Add class animate to show bubble and remove it after 2s */}
              <p className="comfortscore-bubble">
                Træk i ansigter indtil de afspejler hvordan du oplever komfort i
                dit hjem.
              </p>
            </div>
          </div>
        </div>
        <div className="comfortscore-action">
          <p className="comfortscore-label-btn">
            Er du klar til at få forslag til forbedringer af dit hus?
          </p>
          <button
            className="comfortscore-btn comfortscore-btn-success"
            data-src="{action: 'load', eventLabel: 'overview', noninteractive: false}"
            onClick={this.improvementsPage}
          >
            Ja, inspirer mig
          </button>
          {/* TODO Add class animate to show bubble and remove it after 2s. Should be shown with delay after the first bubble */}
          <p className="comfortscore-bubble">
            Klik på knappen for at gå videre. Du kan altid komme tilbage
          </p>
        </div>
      </div>
    );
  }
}

export default Overview;
