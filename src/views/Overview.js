import React, { Component } from 'react';
import { Redirect } from 'react-router';

import '../styles/overview.css'
import Slider from '../components/slider.js'
import TextRow from '../components/TextRow.js'
import {
  MockJSON
} from '../components/MockJSON.js'

import Improvements from './Improvements.js'
import { Tracking } from '../components/Tracking.js'

class Overview extends Component {
  constructor(props) {
    super(props);

    var state = this.props.store.currentState;
    this.state = state;

    this.updateScore = this.updateScore.bind(this);
    this.improvementsPage = this.improvementsPage.bind(this);

    // Track load event
    Tracking.trackEvent('load', 'overview', false);
  }

  updateScore(newVal, key) {
    var sliders = this.state.sliders;
    var oldVal = sliders[parseInt(key, 10)].value / 600 * 100
    sliders[parseInt(key, 10)].value = newVal;
    this.setState((state) => ({
      currentScore: state.currentScore + (newVal / 600 * 100) -
        oldVal,
      sliders: sliders
    }), function() {

    })
  }

  improvementsPage() {
      var goNext = this.props.history.push,
        newState = this.state;

      this.props.store.currentState = newState;

      goNext('/Improvements');
  }

  render() {
    var img =
      "https://maps.googleapis.com/maps/api/streetview?parameters&size=880x542&key=" +
      "AIzaSyBy3Ect_uyKDDhuRCQvUC0n7KQa5mbbiZg&location=" + this.state.address;

    if (this.state.address === undefined || this.state.address === '') {
        return (
            <Redirect to='/'  />
        )
    }

    return(
      <div id="comfortscorewidget-container-setup" className="comfortscore-container">
        <div className="comfortscore-top comfortscore-activated">
          <h2><strong>Resultat</strong> for {this.state.address}</h2>
        </div>
        <div className="comfortscore-content">
          <div className="comfortscore-twocol">
            <div className="comfortscore-col">
              <div className="comfortscore-wrapper">
                <p className="comfortscore-current">
                  <span className="comfortscore-score">{Math.floor(this.state.currentScore)}%</span>
                  <span className="comfortscore-label">Din nuværende komfortscore</span></p>
              </div>
              <div className="comfortscore-map"><img alt="house" src={img}/></div>
              <div className="comfortscore-instruction"><TextRow text = {'Andre der bor i et hus, der minder om dette, har \
              vurderet komforten på de nedenstående parametre sådan her - juster på\
              parametrene, hvis du ikke er enig i komfortvurderingerne'}/></div>
            </div>
            <div className="comfortscore-col comfortscore-sliders">
              {this.state.sliders.map(
                (slider, index) =>
                <Slider
                  key={index}
                  index={index}
                  updateScore={this.updateScore}
                  parameter={slider.name}
                  value={this.state.sliders[index].value}/>
              )}
            {/* TODO Add class animate to show bubble and remove it after 2s */}
              <p className="comfortscore-bubble">Træk i ansigter indtil de afspejler hvordan du oplever komfort i dit hjem.</p>
            </div>
          </div>
        </div>
        <div className="comfortscore-action">
          <p className="comfortscore-label-btn">Se hvad du kan gøre ved dit hus for at forbedre din komfortscore?</p>
          <button className="comfortscore-btn comfortscore-btn-success" data-src="{action: 'load', eventLabel: 'overview', noninteractive: false}" onClick={this.improvementsPage}>Ja, inspirer mig</button>
          {/* TODO Add class animate to show bubble and remove it after 2s. Should be shown with delay after the first bubble */}
          <p className="comfortscore-bubble">Klik på knappen for at gå videre. Du kan altid komme tilbage</p>
        </div>
      </div>
    )
  }
}

export default Overview;
