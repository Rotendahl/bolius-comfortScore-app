import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Slider from "react-slick";
import ScoreStatus from '../components/ScoreStatus.js'
import Card from '../components/Card.js'
import TextRow from '../components/TextRow.js'

import '../styles/improvements.css'
import '../styles/slick.css'
import {
  MockJSON
} from '../components/MockJSON.js'


class Improvements extends Component {
  constructor(props) {
    super(props);

    var state = this.props.store.currentState;

    if (state.address !== undefined && state.address !== '') {
      state.potentialScore = state.currentScore;
      state.animate = true;

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
    if (!cards[this.state.activeSlide].done) {
        var dontSet = cards[this.state.activeSlide].willDo || cards[this.state.activeSlide].done;
        cards[this.state.activeSlide].done = true
        cards[this.state.activeSlide].willDo = false
        cards[this.state.activeSlide].clear = false
        this.setState((prevState, props) => ({
          cards: cards,
          animate: true,
          potentialScore: this.state.potentialScore + ( dontSet ? 0 : this.state.unit )
        }), function() {
            this.next();
        })
    }
    else {
        this.next();
    }
  }

  willDo() {
    var cards = this.state.cards;
    if (!cards[this.state.activeSlide].willDo) {
        var dontSet = cards[this.state.activeSlide].willDo || cards[this.state.activeSlide].done;
        cards[this.state.activeSlide].done = false
        cards[this.state.activeSlide].willDo = true
        cards[this.state.activeSlide].clear = false
        this.setState((prevState, props) => ({
          cards: cards,
          animate: true,
          potentialScore: this.state.potentialScore + ( dontSet ? 0 : this.state.unit )
        }), function() {
            this.next();
        })
    }
    else {
        this.next();
    }
  }

  clear() {
    var cards = this.state.cards
    if (!cards[this.state.activeSlide].clear) {
        var dontSet = cards[this.state.activeSlide].clear;
        cards[this.state.activeSlide].done = false
        cards[this.state.activeSlide].willDo = false
        cards[this.state.activeSlide].clear = true
        this.setState((prevState, props) => ({
          cards: cards,
          animate: true,
          potentialScore: this.state.potentialScore - ( dontSet ? 0 : this.state.unit )
        }), function() {
            this.next();
        })
    }
    else {
        this.next();
    }
  }

  next() {
    var that = this,
        elem = null,
        elements = document.getElementsByClassName('comfortscore-potential');
    if (elements !== undefined) {
        elem = elements[0];
        elem.classList.remove('heartbeat');
    }

    setTimeout(function() {
        that.slider.slickNext();
        that.setState({
          animate: true
        });
        elem.classList.add('heartbeat');
    }, 500);
  }
  previous() {
    this.slider.slickPrev();
    this.setState({
      animate: true
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
        <div className="comfortscore-top comfortscore-activated">
          <h2><strong>Forslag</strong> for {this.state.address}</h2>
        </div>
        <div className="comfortscore-content">
          <div className="comfortscore-twocol">
            <div className="comfortscore-col">
              <ScoreStatus
                current={this.state.currentScore}
                potential={this.state.potentialScore}
                animate={this.state.animate} onTop={false}
              />
            </div>
            <div className="comfortscore-col">
              <div className="comfortscore-instruction">
                <TextRow text={'Vi har fundet 9 tiltag, der kan forbedre komforten i dit\
                  hus. Du kan nu vælge ud de tiltag, du vil gå videre med.'}
                />
              </div>
              <div className="comfortscore-swiper">
                <Slider ref={c => (this.slider = c)} {...settings}>
                  {this.state.cards.map((card, index) =>
                    <Card title={card.title} description={card.description} key={card.key}
                    done={card.done} willDo={card.willDo} clear={card.clear} targets={card.targets}
                    setDone={this.done} setWillDo={this.willDo} setClear={this.clear} showButtons={true}
                    />)
                  }
                </Slider>
              </div>
            </div>
          </div>
        </div>
        <div className="comfortscore-action">
          <button className="comfortscore-btn comfortscore-btn-back" onClick={this.goBack}>Tilbage</button>
          <p className="comfortscore-label-btn">Se din liste med forbedringstiltag og hvordan du kan gemme den til senere</p>
          <button className="comfortscore-btn comfortscore-btn-success" onClick={this.resultPage}>Ja, vis resume</button>
          {/* TODO Add class animate to show bubble and remove it after 2s. Should be shown with delay after the first bubble */}
          <p className="comfortscore-bubble">Klik på knappen for at gå videre. Du kan altid komme tilbage</p>
        </div>
      </div>
    )
  }
}

export default Improvements;
