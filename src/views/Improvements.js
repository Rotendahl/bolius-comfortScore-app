import React, {
  Component
} from 'react';
import Slider from "react-slick";
import ScoreStatus from '../components/ScoreStatus.js'
import Card from '../components/Card.js'
import Footer from '../components/Footer.js'
import TextRow from '../components/TextRow.js'
import Title from '../components/Title.js'

import '../styles/improvements.css'

class Improvements extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.done = this.done.bind(this);
    this.willDo = this.willDo.bind(this);
    this.clear = this.clear.bind(this);

    this.state = {
      activeSlide: 0,
      cards: [
        {
          title: "Udskiftning af vinduer med 3 lags termoruder",
          done: false,
          willDo: false,
          description: "Udskiftning af vinduer giver et mindre støj nieavu samt en bedre temperatur da det holder på varmen."
        },
        {
          title: "Sol celler",
          done: false,
          willDo: false,
          description: "Udskiftning af vinduer giver et mindre støj nieavu samt en bedre temperatur da det holder på varmen."
        },
        {
          title: "Renovation af loft",
          done: false,
          willDo: false,
          description: "Udskiftning af vinduer giver et mindre støj nieavu samt en bedre temperatur da det holder på varmen."
        }, {
          title: "Udskiftning af vinduer med 3 lags termoruder",
          done: false,
          willDo: false,
          description: "Udskiftning af vinduer giver et mindre støj nieavu samt en bedre temperatur da det holder på varmen."
        },
        {
          title: "Sol celler",
          done: false,
          willDo: false,
          description: "Udskiftning af vinduer giver et mindre støj nieavu samt en bedre temperatur da det holder på varmen."
        },
        {
          title: "Renovation af loft",
          done: false,
          willDo: false,
          description: "Udskiftning af vinduer giver et mindre støj nieavu samt en bedre temperatur da det holder på varmen."
        }
      ]
    };
  }

  done() {
    var cards = this.state.cards
    cards[this.state.activeSlide].done = true
    cards[this.state.activeSlide].willDo = false
    this.setState({
      cards: cards
    })
  }

  willDo() {
    var cards = this.state.cards
    cards[this.state.activeSlide].done = false
    cards[this.state.activeSlide].willDo = true
    this.setState({
      cards: cards
    })
  }

  clear() {
    var cards = this.state.cards
    cards[this.state.activeSlide].done = false
    cards[this.state.activeSlide].willDo = false
    this.setState({
      cards: cards
    })
  }

  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }

  render() {
    var settings = {
      centerMode: true,
      infinite: true,
      centerPadding: "80px",
      slidesToShow: 1,
      speed: 500,
      dots: true,
      className: "center",
      beforeChange: (current, next) => this.setState({
        activeSlide: next
      })

    };

    return(
      <div className="container">
        <Title title={'Forslag til forbedring'}/>
        <ScoreStatus current="10" potential="1"/>
        <TextRow text={'Vi har fundet 9 tiltag, der kan forbedre komforten i dit\
          hus. Du kan nu vælge ud de tiltag, du vil gå videre med.'}
        />

        <div>
          <Slider ref={c => (this.slider = c)} {...settings}>
            {this.state.cards.map((card, index) =>
              <Card title={card.title} description={card.description}
                key={index} done={card.done} willDo={card.willDo}
              />)
            }
          </Slider>
        </div>
      <div className="row" style={{margin: "8% 0%"}}>
        <button  onClick={this.previous} className="nav-btn offset-2 col-3 btn btn-dark">←</button>
        <button  onClick={this.next} className="nav-btn offset-2 col-3 btn btn-dark">→</button>
      </div >

      <div className="row" style={{margin: "5% 0%"}}>
          <button onClick={this.done} className="offset-2 col-2 btn btn-light">HAR GJORT</button>
          <button onClick={this.willDo} className="offset-1 col-2 col btn btn-light">VIL GØRE</button>
          <button onClick={this.clear} className="offset-1 col-2 btn btn-light">VIL IKKE</button>
      </div>

      <Footer link = "result"
      text = {
        "Se din liste med forbedringstiltag og hvordan du kan gemme den til senere"
      }
      linkText = {
        "Ja, vis resultat"
      }
      /> </div >
    )
  }
}

export default Improvements;
