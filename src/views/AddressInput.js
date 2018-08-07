import React, {
  Component
} from 'react';
import {
  Link
} from 'react-router'
import '../styles/improvements.css'
import '../styles/dawa.css'
import {
  MockJSON
} from '../components/MockJSON.js'


class AddressInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.overViewPage = this.overViewPage.bind(this)
  }

  handleChange(event) {
    var target = event.target.value
    var dawaAutocomplete2 = require('dawa-autocomplete2');
    var inputElm = document.getElementById('dawa-autocomplete-input')
    var component = dawaAutocomplete2.dawaAutocomplete(inputElm, {
      select: function (selected) {
        target = selected
      }
    });
    this.setState({
      address: target
    });
  }

  overViewPage() {
    var xhttp = new XMLHttpRequest();
    var address = this.state.address;
    var newState = MockJSON
    var goNext = this.props.history.push
    xhttp.onreadystatechange = function () {
      if(xhttp.readyState === 4 && xhttp.status === 200) {

        newState.address = address
        var resp = JSON.parse(xhttp.responseText)
        newState.sliders = [
          {
            "name": "Træk",
            "value": resp.draft * 10
            },
          {
            "name": "Temperatur",
            "value": resp.temperature * 10
            },
          {
            "name": "Fugt",
            "value": resp.moisture * 10
            },
          {
            "name": "Støj",
            "value": resp.noise * 10
            },
          {
            "name": "Dagslys",
            "value": resp.light * 10
            },
          {
            "name": "Lugt",
            "value": resp.smell * 10
            }
          ]
        newState.sliders.map((slider => newState.currentScore += slider.value /
          600 *
          100))
        goNext('/Overview', newState)
      }
    };
    xhttp.open("GET", 'https://ai01.boliusaws.dk/predictParams/' + encodeURI(
        this.state
        .address),
      true);
    xhttp.send();

  }

  render() {
    return(
      <div className="container">
        <div>
          <h1>Hvor meget komfort er der i dit hus?</h1>
          <p>Se vores prognose af komfortniveauet hjemme hos dig og få forslag
            til, hvordan du kan forbedre dit hus.</p>
          <img className="img-fluid" alt="familytime" src="./assets/banner.png"/>
          <div className="autocomplete-container">
            <input type="text" className="dawa-autocomplete-input" id="dawa-autocomplete-input"
            value={this.state.address} onChange={this.handleChange} placeholder="Indtast din adresse"/>
          </div>
        </div>

        <div className="btn btn-success" onClick={this.overViewPage}>Gå til oversigt</div>
      </div>
    )
  }
}

export default AddressInput;
