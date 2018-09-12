import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Slider from "react-slick";
import ScoreStatus from '../components/ScoreStatus.js'
import Card from '../components/Card.js'
import TextRow from '../components/TextRow.js'

import '../styles/improvements.css'
import { Tracking } from '../components/Tracking.js'

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.store.currentState;

    if (this.state.address !== undefined && this.state.address !== '') {
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.btnClick = this.btnClick.bind(this);

        var willDos = [];
        var cards = this.state.cards;
        for(var i = 0; i < cards.length; i++) {
          if(cards[i].willDo) {
            willDos.push(cards[i])
          }
        }
        this.state.willDos = willDos;
    }

    this.goBack = this.goBack.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }

  goBack() {
      this.props.history.goBack();
  }

  btnClick() {
      var value = JSON.stringify(this.state);
      document.getElementById('comfortscorewidget-app-data').value = value;
  }

  render() {
    var settings = {
      slidesToShow: 1,
      infinite: false,
      speed: 500,
      dots: false,
      arrows: false,
      className: "slider",
      beforeChange: (current, next) => this.setState({
        activeSlide: next
      })
    };

    var img =
      "https://maps.googleapis.com/maps/api/streetview?parameters&size=880x542&key=" +
      "AIzaSyBy3Ect_uyKDDhuRCQvUC0n7KQa5mbbiZg&location=" + this.state.address;

    if (this.state.address === undefined || this.state.address === '') {
        return (
            <Redirect to='/'  />
        )
    }

    // Track load event
    Tracking.trackEvent('load', 'result', false);

    return(
      <div id="comfortscorewidget-container-setup" className="comfortscore-container">
        <input type="hidden" id="comfortscorewidget-app-data" value="" />

        <div className="comfortscore-top comfortscore-activated">
          <h2><strong>Resume</strong> for {this.state.address}</h2>
        </div>
        <div className="comfortscore-content">
          <div className="comfortscore-twocol">
            <div className="comfortscore-col">
              <ScoreStatus
                current={this.state.currentScore}
                potential={this.state.potentialScore} onTop={true}
              />
              <div className="comfortscore-map"><img alt="house" src={img}/></div>
            </div>
            <div className="comfortscore-col">
              <div className="comfortscore-abstract">
                <TextRow text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}/>
              </div>
            </div>
          </div>
          <div className="comfortscore-list">
            <h2 className="comfortscore-title-centered">Dine tiltag</h2>
            <div className="comfortscore-card-list">
              {this.state.willDos.map((card, index) =>
                <Card title={card.title} description={card.description}
                  key={index} done={card.done} willDo={card.willDo}
                  targets={card.targets} showButtons={false}
                />)
              }
            </div>
          </div>
          <h2 className="comfortscore-title-centered">Gem dit resultat</h2>
          <div className="comfortscore-twocol">
            <div className="comfortscore-col comfortscore-box">
              <h3>Vil du gemme dit resultat på Mit Bolius</h3>
              <div className="comfortscore-text">
                <p>Du bliver bedt om at logge på aller oprette profil for at gemme resultatet</p>
              </div>
              <button className="comfortscore-btn" id="comfortscorewidget-save-btn" onClick={this.btnClick}>Gem i Mit Bolius</button>
            </div>
            <div className="comfortscore-col comfortscore-box">
              <h3>Vil du få tilsendt dit resultat på mail?</h3>
              <div className="comfortscore-field-wrap">
                <form>
                    <input type="email" className="comfortscore-email-field" required="required" placeholder="Indtast din e-mailadresse"/>
                </form>
              </div>
              <div className="comfortscore-notice">
                <p>Når du modtager resultatet på mail, tilmelder du dig samtidig vores nyhedsbrev, der inspirerer dig til at forbedre komforten gennem energirenovering. Du kan altid afmelde det igen via afmeld-linket i bunden af nyhedsbrevet.</p>
              </div>
              <button className="comfortscore-btn" id="comfortscorewidget-send-btn" onClick={this.btnClick}>Send mig en PDF</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Result;
