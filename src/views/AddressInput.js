import React, { Component } from "react";
//import "../styles/improvements.css";
//import "../styles/dawa.css";
import axios from 'axios';
import { Tracking } from "../components/Tracking.js";
import Modal from 'react-responsive-modal';


class AddressInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
      finalAddress: "",
      err_modal: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.overViewPage = this.overViewPage.bind(this);
    this.toggle = this.toggle.bind(this);

    // Track load event
    Tracking.trackEvent("load", "initial address", true);
  }

  toggle() {
    this.setState({
      err_modal: !this.state.err_modal,
      address: "",
      finalAddress: ""
    });
  }

  handleChange(event) {
    var target = event.target.value;
    var dawaAutocomplete2 = require("dawa-autocomplete2");
    var inputElm = document.getElementById("dawa-autocomplete-input");
    var that = this;
    dawaAutocomplete2.dawaAutocomplete(inputElm, {
      select: function(selected) {
        target = selected;
        // Update selected address somewhere else than for input field value
        that.updateFinalAddress(selected.tekst);

        // Hide suggestions if still visible
        var elements = document.getElementsByClassName(
          "dawa-autocomplete-suggestions"
        );
        for (var i = 0; i < elements.length; i++) {
          elements[i].innerHTML = "";
        }
        that.overViewPage();
      }
    });

    this.setState((prevState, props) => ({
      address: target
    }));
  }

  updateFinalAddress(address) {
    this.setState((prevState, props) => ({
      finalAddress: address
    }));
  }

  overViewPage() {
    var finalAddress = this.state.finalAddress === '' ?
      this.state.address :
      this.state.finalAddress;


    const apiUrl = "https://ml.bolius.dk/comfortscore/v2/"
    const encodedAddres = encodeURI(finalAddress)
    const imgRequest ="https://maps.googleapis.com/maps/api/streetview/metadata"
      + "?key=AIzaSyA2MsGE3Crx2Gww33ol1gLw1OSk2bW8HK4&location="
      +  finalAddress

    Promise.all([
      axios.get(`${apiUrl}predictParams/${encodedAddres}`),
      axios.get(imgRequest)
    ]).then(([paramResp, imgResp]) => {
        console.log(paramResp, imgResp)
        if(paramResp.status !== 200 || paramResp.data.hasOwnProperty("error")){
          this.setState({err_modal: true})
          return
        }
        var newState = {
          currentScore : 0,
          sliders : [
            {
              name: "Træk",
              value: paramResp.data.draft * 10,
              initial_value: paramResp.data.draft * 10
            },
            {
              name: "Temp",
              value: paramResp.data.temperature * 10,
              initial_value: paramResp.data.temperature * 10
            },
            {
              name: "Fugt",
              value: paramResp.data.moisture * 10,
              initial_value: paramResp.data.moisture * 10
            },
            {
              name: "Støj",
              value: paramResp.data.noise * 10,
              initial_value: paramResp.data.noise * 10
            },
            {
              name: "Lys",
              value: paramResp.data.light * 10,
              initial_value: paramResp.data.light * 10
            }
          ]
        };
        newState.sliders.map(
          slider => (newState.currentScore += (slider.value / 500) * 100)
        );
        const googleImageUrl = "https://maps.googleapis.com/maps/api/"
          + "streetview?parameters&size=880x542&"
          + "key=AIzaSyBy3Ect_uyKDDhuRCQvUC0n7KQa5mbbiZg&location="
          + encodedAddres

        newState.img = imgResp.data.status === "OK" ? googleImageUrl :
          process.env.REACT_APP_COMFORTSCORE_ROOT_DIRECTORY
          + '/assets/no_house.jpg';

        // Save new state in store
        newState.address = finalAddress;
        this.props.store.address = finalAddress;
        this.props.store.currentState = newState;
        if(paramResp.data.after2010){
          this.props.history.push("/after2010");
        }
        else {
          this.props.history.push("/Overview");
        }

    }).catch(err => {
      this.setState({err_modal: true})
    })
  }

  render() {return (<div>
    <Modal
      showCloseIcon={false}
      open={this.state.err_modal}
      closeOnEsc onClose={this.toggle}
      closeOnOverlayClick={true}
      styles={{modal: {
        padding: "12px",
        textAlign: "center",
        position: "relative",
      }}}
    >
      <div><h2 style={{
        textAlign: "center",
        position: "relative",
        zIndex: "1"
      }}>
      <br/>
        <span className="text-danger text-center">Fejl: </span>
        Mangelfuld data fra BBR
      </h2>
      <div style={{
          width: "100%",
          margin:"auto",
          zIndex: "0"
      }}>
        <p>BR registret indeholder ikke nok data om huset til at lave
        forudsigelser.</p>
        <div style={{padding:"10px"}}>
          <div style={{verticalAlign: "middle", display:"inline-block"}}>
            <button  className="btn btn-primary comfortscore-btn"
            style={{marginRight:"20px"}}
            onClick={() => {window.open("https://bbr.dk/ret")}}
          >
            Ret BBR data
          </button></div>
          <div style={{verticalAlign: "middle", display:"inline-block"}}>
            <button className="btn btn-primary comfortscore-btn" onClick={this.toggle}>
              Prøv anden adresse
            </button>
          </div>
        </div>
        </div>
      </div>
    </Modal>
    <div id="comfortscorewidget-container-setup"
      className="comfortscore-container"
    >
      <div className="comfortscore-top">
          <h2 className="section-header">Test: Hvor god er komforten i dit hus?</h2>
          <div className="comfortscore-dawa">
            <form onSubmit={(e) => {e.preventDefault(); this.overViewPage()}} className="form-inline">
              <div className="comfortscore-autocomplete-container"><input
                type="text"
                className="form-control comfortscore-dawa-autocomplete-input"
                id="dawa-autocomplete-input"
                value={this.state.address}
                onChange={this.handleChange}
                placeholder="Indtast din adresse"
              /></div>
              <button
                className="btn btn-primary comfortscore-btn comfortscore-btn-success"
                data-src="{action: 'load', eventLabel: 'initial address', noninteractive: true}"
                onClick={(e) => {e.preventDefault(); this.overViewPage()}}
              >
                Se dit resultat
              </button>
            </form>
          </div>
          <p className="small">Testen viser ikke resultater for huse bygget efter 2010 og er ikke egnet til sommerhuse og kolonihavehuse.</p>
      </div>
      <div className="comfortscore-content comfortscore-hidden">
        <p className="comfortscore-teaser" />
      </div>
    </div>
  </div>);}
}

export default AddressInput;
