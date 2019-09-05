import React, { Component } from "react";
import { Redirect } from "react-router";

//import "../styles/overview.css";
import Slider from "../components/slider.js";
import TextRow from "../components/TextRow.js";

import { Tracking } from "../components/Tracking.js";

class After2010 extends Component {
  constructor(props) {
    super(props);
    var state = this.props.store.currentState;
    this.state = state;
  }

  render() {
    if (this.state.address === undefined || this.state.address === "") {
      return <Redirect to="/" />;
    }
    return (
      <div
        id="comfortscorewidget-container-setup"
        className="comfortscore-container"
      >
        <div className="comfortscore-top comfortscore-activated">
          <h2 className="section-header">
            Resultat for {this.state.address}
          </h2>
        </div>
        <div className="comfortscore-content">
          <div>
              <p className="small"> Testen viser ikke resultater for huse bygget efter 2010. Hvis du
              oplever problemer med komforten, kan du måske hente hjælp her:
              </p>

            <ul className="list-inline">
              <li><a href="https://www.bolius.dk/varmeproblemer-i-hvert-femte-nye-hus-28159/">
                  <div style={{margin:"5px"}}className="btn btn-primary comfortscore-btn">Varmeproblemer i hvert femte nye hus</div>
              </a></li>
              <li><a href="https://www.bolius.dk/hold-boligen-koelig-om-sommeren-18240/">
                  <div style={{margin:"5px"}} className="btn btn-primary comfortscore-btn">Hold boligen kølig om sommeren</div>
              </a></li>
              <li><a href="https://www.bolius.dk/faa-mere-dagslys-i-din-bolig-17640/">
                  <div style={{margin:"5px"}} className="btn btn-primary comfortscore-btn">Få mere dagslys i din bolig</div>
              </a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default After2010;
