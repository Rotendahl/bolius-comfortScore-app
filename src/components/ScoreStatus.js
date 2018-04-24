import React, {
  Component
} from 'react';
import '../styles/updateScore.css'

class ScoreStatus extends Component {
  render() {
    return(
      <div className="row">
        <div className="col-sm-6 col-xs-12 d-flex housePicture justify-content-center align-items-center">
            <div>
              <h2 className="score">{Math.floor(this.props.current) + 1}%</h2>
              <h4>Din nuværende komfortscore</h4>
            </div>
        </div>
        {this.props.animate ?
          <div className="col-sm-6 col-xs-12 komforScore text-center heartbeat">
            <h2 className="score">{Math.floor(this.props.potential) + 1}%</h2>
            <h4>Din potentiele komfortscore</h4>
          </div>
        :
          <div className="col-sm-6 col-xs-12 komforScore text-center ">
            <h2 className="score">{Math.floor(this.props.potential) + 1}%</h2>
            <h4>Din potentiele komfortscore</h4>
          </div>
        }
      </div>
    )
  }
}

export default ScoreStatus;
