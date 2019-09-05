import React, {
  Component
} from 'react';
import {
  Link
} from 'react-router-dom'
//import '../styles/footer.css'


class Footer extends Component {
  render() {
    return(
      <div className="row foot">
          <div className="col-8">
            {this.props.text}
          </div>
          <div className="col-4">
            <Link to={{pathname: this.props.link, state: this.props.passedState}}>
              <button className="btn" style={{backgroundColor: "#8CCB9B"}}>
                {this.props.linkText}
              </button>
            </Link>
          </div>
      </div>
    )
  }
}

export default Footer;
