import React, {
  Component
} from 'react';
import '../styles/card.css'


class Card extends Component {
  render() {
    return(
      <div className="card" >
        <h4>{this.props.title}</h4>
        <div className="row">
          <div className="col-10">
            {this.props.description}
          </div>
            {this.props.done && !this.props.willDo ?
              <div className="col-2">
              <img alt="medal" src={'./assets/medal.png'} />
              </div>
              : <p></p>
            }
          <div className="col-2">
            {this.props.willDo && !this.props.Done ?
              <img className="img-fluid" alt="checkmark" src={'./assets/checkmark.png'} />
            : <p></p>
            }
          </div>


        </div>
        <div className="row" style={{marginTop: "20px"}}>
          <div className="col-3">
            <strong>Afhjælper:</strong>
          </div>
          <div className="col-9">

          </div>
        </div>
      </div>
    )
  }
}

export default Card;
