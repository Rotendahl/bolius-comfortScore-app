import React, {
  Component
} from 'react';


import '../styles/overview.css'
import Slider from '../components/slider.js'
import Footer from '../components/Footer.js'
import TextRow from '../components/TextRow.js'
import Title from '../components/Title.js'

class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      score: 0,
      sliders: [
        {
          name: "Træk",
          value: Math.floor(Math.random() * 100)
        },
        {
          name: "Temperatur",
          value: Math.floor(Math.random() * 100)
        },
        {
          name: "Fugt",
          value: Math.floor(Math.random() * 100)
        },
        {
          name: "Støj",
          value: Math.floor(Math.random() * 100)
        },
        {
          name: "Dagslys",
          value: Math.floor(Math.random() * 100)
        },
        {
          name: "Lugt",
          value: Math.floor(Math.random() * 100)
        }
          ]
    }
    this.state.sliders.map((slider => this.state.score += slider.value / 600 *
      100))
    this.updateScore = this.updateScore.bind(this)
  }

  updateScore(newVal, key) {
    var sliders = this.state.sliders;
    var oldVal = sliders[parseInt(key)].value / 600 * 100
    sliders[parseInt(key)].value = newVal;
    this.setState((state) => ({
      score: state.score + (newVal / 600 * 100) - oldVal,
      sliders: sliders
    }))
  }

  render() {
    var adresse = "Lerholmvej 15, 2750 Ballerup"
    var img =
      "https://maps.googleapis.com/maps/api/streetview?parameters&size=1350x1350&key=" +
      "AIzaSyBy3Ect_uyKDDhuRCQvUC0n7KQa5mbbiZg&location=" + adresse;

    return(
      <div className="container">
        <Title title={'Din komfortscore'}/>
        <div className="row">
          <div className="col-sm-8 col-xs-12 housePicture text-center">
            <img className="rounded img-fluid" alt="house" src={img}/>
            <p>{adresse}</p>
          </div>
          <div className="col-sm-4 komforScore col-xs-12 d-flex align-items-center">
            <div>
              <p className="score">{Math.floor(this.state.score)}%</p>
              <p>Din nuværende komfortscore</p>
            </div>
          </div>
        </div>
        <TextRow text = {'Andre der bor i et hus, der minder om dette, har \
          vurderet komforten på de nedenstående parametre sådan her - juster på\
          parametrene, hvis du ikke er enig i komfortvurderingerne'}
        />
        {this.state.sliders.map(
          (slider, index) =>
          <Slider
            key={index}
            index={index}
            updateScore={this.updateScore}
            parameter={slider.name}
            value={this.state.sliders[index].value}/>
        )}
        <Footer
          text={'Se hvad du kan gøre ved dit hus for at forbedre din komfortscore'}
          linkText={'Ja, inspirer mig nu'}
          link={'improvements'}
          passedState={this.state}
        />
      </div>
    )
  }
}

export default Overview;
