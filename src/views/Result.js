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

class Result extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);

    this.state = {
      potentialScore: 10,
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

    return(
      <div className="container">
        <Title title={'Dit Resultat'}/>
        <ScoreStatus current="10" potential="1"/>
        <TextRow text={'Du har valgt følgende tiltag, som kan forbedre komforten i dit hus'}/>

        <div className="row" style={{margin: "8% 0%"}}>
          <div className="col-1">
            <button  onClick={this.previous} className="nav-btn-v btn btn-dark">↑</button>
            <button  onClick={this.next} className="nav-btn-v btn btn-dark">↓</button>
          </div>
        <div className="col-11">
          <Slider ref={c => (this.slider = c)} {...settings}>
            {this.state.cards.map((card, index) =>
              <Card title={card.title} description={card.description}
                key={index} done={card.done} willDo={card.willDo}
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
              <button className="btn text-left">Send mig en PDF</button>
              <button className="btn text-right">Gem i Mit Bolius</button>
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
