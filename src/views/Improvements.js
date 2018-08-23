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

    if (state.address !== undefined && state.address !== '') {
      state.potentialScore = state.currentScore;
      state.animate = false;

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
    this.goBack = this.goBack.bind(this);
    this.resultPage = this.resultPage.bind(this);
  };

  done() {
    var cards = this.state.cards
    cards[this.state.activeSlide].done = true
    cards[this.state.activeSlide].willDo = false
    cards[this.state.activeSlide].clear = false
    this.setState((prevState, props) => ({
      cards: cards,
      animate: true,
      potentialScore: this.state.potentialScore + this.state.unit
    }), function() {
        this.next();
    })
  }

  willDo() {
    var cards = this.state.cards;
    cards[this.state.activeSlide].done = false
    cards[this.state.activeSlide].willDo = true
    cards[this.state.activeSlide].clear = false
    this.setState((prevState, props) => ({
      cards: cards,
      animate: true,
      potentialScore: this.state.potentialScore + this.state.unit
    }), function() {
        this.next();
    })
  }

  clear() {
    var cards = this.state.cards
    cards[this.state.activeSlide].done = false
    cards[this.state.activeSlide].willDo = false
    cards[this.state.activeSlide].clear = true
    this.setState((prevState, props) => ({
      cards: cards,
      animate: true,
      potentialScore: this.state.potentialScore - this.state.unit
    }), function() {
        this.next();
    })
  }

  next() {
    this.slider.slickNext();
    this.setState({
      animate: true
    })
  }
  previous() {
    this.slider.slickPrev();
    this.setState({
      animate: false
    })
  }

  goBack() {
      this.props.history.goBack();
  }

  resultPage() {
     var goNext = this.props.history.push,
       newState = this.state;

     this.props.store.currentState = newState;

     goNext('/Result');
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

    if (this.state.address === undefined || this.state.address === '') {
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
                    <Card title={card.title} description={card.description} key={card.key}
                    done={card.done} willDo={card.willDo} clear={card.clear} targets={card.targets}
                    setDone={this.done} setWillDo={this.willDo} setClear={this.clear}
                    />)
                  }
                </Slider>
              </div>
            </div>
          </div>
        </div>
        <div className="comfortscore-action">
          <button className="btn btn-back" onClick={this.goBack}>Tilbage</button>
          <p className="label-btn">Se din liste med forbedringstiltag og hvordan du kan gemme den til senere</p>
          <button className="btn btn-success" onClick={this.resultPage}>Ja, vis resultat</button>
          {/* TODO Add class animate to show bubble and remove it after 2s. Should be shown with delay after the first bubble */}
          <p className="bubble">Klik på knappen for at gå videre. Du kan altid komme tilbage</p>
        </div>
      </div>
    )
  }
}

export default Improvements;
