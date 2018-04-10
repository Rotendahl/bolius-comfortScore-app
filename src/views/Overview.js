import React, {
  Component
} from 'react';
import '../styles/overview.css'

import Slider from '../components/slider.js'

class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      score: 0
    }
    this.updateScore = this.updateScore.bind(this)
    this.init = this.init.bind(this)
  }

  init(val) {
    this.setState((state) => ({
      score: state.score + (val / 600 * 100)
    }))
  }

  updateScore(newVal) {
    this.setState((state) => ({
      score: state.score + newVal
    }))
  }
  render() {
    var adresse = "Ulkjærvej 3, 6771 Gredstedbro"
    var img =
      "https://maps.googleapis.com/maps/api/streetview?parameters&size=1350x1350&key=AIzaSyBy3Ect_uyKDDhuRCQvUC0n7KQa5mbbiZg&location=" +
      adresse;
    var sliders = ["Træk", "Temperatur", "Fugt", "Støj", "Dagslys", "Lugt"];

    return (
      <div className="container">
        <div className="row"><h3 >Din komfortscore</h3></div>
          <div className="row">
            <div className="col-sm-8 col-xs-12 housePicture text-center">
              <img className="rounded img-fluid" alt="house" src={img}/>
              <p>{adresse}</p>
            </div>
            <div className="col-sm-4 komforScore col-xs-12 d-flex justify-content-center align-items-center">
              <div className={this.state.animation}>
                <p className="score">{Math.floor(this.state.score)}%</p>
                <p>Din nuværende komfortscore</p>
              </div>
            </div>
          </div>
        <div className = "row">
          <div className="col-10 offset-1">
            Andre der bor i et hus, der minder om dette, har vurderet
            komforten på de nedenstående parametre sådan her -
            juster på parametrene, hvis du ikke er enig i komfortvurderingerne
          </div>
        </div>
        {sliders.map((name) => <Slider key={name} updateScore={this.updateScore} init={this.init} parameter={name} value={1}/>)}
        <div className="row foot">
          <div className="col-8">
            <h4>Se hvad du kan gøre ved dit hus for at forbedre din komfortscore</h4>
          </div>
          <div className="col-4">
            <button className="btn"><h4>Ja, inspirer mig nu</h4></button>
          </div>
        </div>
      </div>
    )
  }
}

export default Overview;