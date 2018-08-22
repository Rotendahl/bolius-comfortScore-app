import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Slider from "react-slick";
import ScoreStatus from '../components/ScoreStatus.js'
import Card from '../components/Card.js'
import Footer from '../components/Footer.js'
import TextRow from '../components/TextRow.js'
import Title from '../components/Title.js'

import '../styles/improvements.css'
import {
  MockJSON
} from '../components/MockJSON.js'


class Improvements extends Component {
  constructor(props) {
    super(props);

    var state = this.props.store.currentState;

    if (state.address === '') {
        if(state.potentialScore === -1) {
          state.potentialScore = state.currentScore;
          state.animate = false;
        }

        var improwMass = 100 - state.potentialScore;
        var unit = improwMass / state.cards.length;
        state.unit = unit;

    }

    this.state = state;

    // Bind methods
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.done = this.done.bind(this);
    this.willDo = this.willDo.bind(this);
    this.clear = this.clear.bind(this);
  };

  done() {
    var cards = this.state.cards
    //if(cards[this.state.activeSlide].done || cards[this.state.activeSlide].willDo) {
    //  return
    //}
    cards[this.state.activeSlide].done = true
    cards[this.state.activeSlide].willDo = false
    cards[this.state.activeSlide].clear = false
    this.setState({
      cards: cards,
      animate: true,
      potentialScore: this.state.potentialScore + this.state.unit
    })
  }

  willDo() {
    var cards = this.state.cards;
    cards[this.state.activeSlide].done = false
    cards[this.state.activeSlide].willDo = true
    cards[this.state.activeSlide].clear = false
    this.setState({
      cards: cards,
      animate: true,
      potentialScore: this.state.potentialScore + this.state.unit
    })
  }

  clear() {
    var cards = this.state.cards
    //if(cards[this.state.activeSlide].done || cards[this.state.activeSlide].willDo) {
      cards[this.state.activeSlide].done = false
      cards[this.state.activeSlide].willDo = false
      cards[this.state.activeSlide].clear = true
      this.setState({
        cards: cards,
        animate: true,
        potentialScore: this.state.potentialScore - this.state.unit
      })
    //}
  }

  next() {
    this.slider.slickNext();
    this.setState({
      animate: false
    })
  }
  previous() {
    this.slider.slickPrev();
    this.setState({
      animate: false
    })
  }

  render() {
    var settings = {
      centerMode: true,
      slidesToShow: 1,
      speed: 500,
      dots: false,
      arrows: false,
      className: "center",
      beforeChange: (current, next) => this.setState({
        activeSlide: next
      })
    };

    if (this.state.address === undefined || this.state.address === '') {
        return (
            <Redirect to='/'  />
        )
    }

    return(
      <div id="comfortscorewidget-container-setup" className="comfortscore-container">
        <div className="comfortscore-top activated">
          <h2><strong>Forslag</strong> for {this.state.address}</h2>
        </div>        
        <div className="comfortscore-content">
          <div className="twocol">
            <div className="col">              
              <ScoreStatus
                current={this.state.currentScore}
                potential={this.state.potentialScore}
                animate={this.state.animate}
              />
              <div className="text">
                <TextRow text={'Vi har fundet 9 tiltag, der kan forbedre komforten i dit\
                  hus. Du kan nu vælge ud de tiltag, du vil gå videre med.'}
                />
              </div>             
            </div>
            <div className="col">           
              <div className="swiper">
                <Slider ref={c => (this.slider = c)} {...settings}>
                  {this.state.cards.map((card, index) =>
                    <Card title={card.title} description={card.description} key={index}
                    done={card.done} willDo={card.willDo} targets={card.targets}
                    />)
                  }
                </Slider>
                <div className="swiper-actions">
                    <button onClick={this.done} className="btn btn-light">HAR GJORT</button>
                    <button onClick={this.willDo} className="btn btn-light">VIL GØRE</button>
                    <button onClick={this.clear} className="btn btn-light">VIL IKKE</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="comfortscore-action">
          {/* TODO Add onClick action */}
          <button className="btn btn-back">Tilbage</button>
          <p className="label-btn">Se din liste med forbedringstiltag og hvordan du kan gemme den til senere</p>
          {/* TODO Add correct onClick action */}
          <button className="btn btn-success" onClick={this.state}>Ja, vis resultat</button>
          {/* TODO Add class animate to show bubble and remove it after 2s. Should be shown with delay after the first bubble */}
          <p className="bubble">Klik på knappen for at gå videre. Du kan altid komme tilbage</p>
        </div>
      </div>
    )

  }
}

export default Improvements;
