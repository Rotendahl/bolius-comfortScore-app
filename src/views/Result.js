import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Slider from "react-slick";
import ScoreStatus from '../components/ScoreStatus.js'
import Card from '../components/Card.js'
import TextRow from '../components/TextRow.js'

import '../styles/improvements.css'

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.store.currentState;

    if (this.state.address === '') {
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);

        var willDos = [];
        var cards = this.props.location.state.cards
        for(var i = 0; i < cards.length; i++) {
          if(cards[i].willDo) {
            willDos.push(cards[i])
          }
        }
        this.props.location.state.cards = willDos
        this.state = this.props.location.state
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



    return(
      <div id="comfortscorewidget-container-setup" className="comfortscore-container">
        <div className="comfortscore-top comfortscore-activated">
          <h2><strong>Resume</strong> for {this.state.address}</h2>
        </div>
        <div className="comfortscore-content">
          <div className="comfortscore-twocol">
            <div className="comfortscore-col">
              <ScoreStatus
                current={this.state.currentScore}
                potential={this.state.potentialScore}
              />
            </div>
            <div className="comfortscore-col">
              <div className="comfortscore-map"><img alt="house" src={img}/></div>              
            </div>
          </div>
          <div className="comfortscore-list">            
            <div className="comfortscore-text">
              <TextRow text={'Du har valgt følgende tiltag, som kan forbedre komforten i dit hus'}/>
            </div>
            {this.state.cards.map((card, index) =>
              <Card title={card.title} description={card.description}
                key={index} done={card.done} willDo={card.willDo}
                targets={card.targets} showButtons={false}
              />)
            }
          </div>
        </div>
        <div className="comfortscore-action">
          <div className="comfortscore-box">
            <h3>Vil du få tilsendt dit resultat på mail?</h3>
            <p>Send resultaten til din e-mail som PDF. Du får desuden relevante links til videre
              læsning om de tiltag du har udvist interesse.</p>
            <div className="comfortscore-field-wrap">
              <input type="email" className="comfortscore-email-field" placeholder="Indtast din e-mailadresse"/>
            </div>
            <div className="comfortscore-field-wrap">
              <input type="checkbox" className="comfortscore-check-field"/>
              <label className="comfortscore-check-label">
                Jeg vil gerne modtage relevante links om energirenovering
              </label>
            </div>
            <button className="comfortscore-btn" id="comfortscorewidget-send-btn">Send mig en PDF</button>            
          </div>
          <div className="comfortscore-box">
            <h3>Vil du gemme dit resultat på Mit Bolius</h3>
            <p>Du bliver bedt om at logge på aller oprette profil for at gemme resultatet</p>
            <button className="comfortscore-btn" id="comfortscorewidget-save-btn">Gem i Mit Bolius</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Result;
