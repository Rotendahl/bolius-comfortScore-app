import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Slider from "react-slick";
import ScoreStatus from '../components/ScoreStatus.js'
import Card from '../components/Card.js'
import Footer from '../components/Footer.js'
import TextRow from '../components/TextRow.js'
import Title from '../components/Title.js'

import '../styles/improvements.css'

class Result extends Component {
  constructor(props) {
    super(props);

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
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }



  render() {
    var settings = {
      dots: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
      className: "center",
      arrows: false,
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
      <div className="container">
        <Title title={'Dit Resultat'}/>
        <ScoreStatus
          current={this.state.currentScore}
          potential={this.state.potentialScore}
        />
        <TextRow text={'Du har valgt følgende tiltag, som kan forbedre komforten i dit hus'}/>

        <div className="row" style={{margin: "8% 0%"}}>
          <div className="col-1" >
            <button  onClick={this.previous} className="nav-btn-v btn btn-dark">↑</button>
            <button  onClick={this.next} className="nav-btn-v btn btn-dark">↓</button>
          </div>
          <div className="col-11" style={{height: "500px"}}>
            <Slider ref={c => (this.slider = c)} {...settings}>
              {this.state.cards.map((card, index) =>
                <Card title={card.title} description={card.description}
                  key={index} done={card.done} willDo={card.willDo}
                  targets={card.targets}
                />)
              }
            </Slider>
          </div>
        </div >
        <div className="resultBox">
          <h1 className="text-center">Vil du gemme dit resultat?</h1>
          <p>
            Du kan vælge at sende resultaten til din e-mail som PDF eller
            gemme den i Mit Bolius. Du får desuden relevante links til videre
            læsning om de tiltag du har udvist interesse.
          </p>
            <div className="d-flex justify-content-between w-80">
              <button className="btn text-left" id="comfortscorewidget-send-btn">Send mig en PDF</button>
              <button className="btn text-right" id="comfortscorewidget-save-btn">Gem i Mit Bolius</button>
            </div>
          </div>
          <Footer text = {
            "Vil du have mere inspiration og rådgivning om komfort, indeklima og renovering se mere her"}
            link={'somewhere'}
            linkText={'Læs Mere'}

        />
        </div>
    )
  }
}

export default Result;
