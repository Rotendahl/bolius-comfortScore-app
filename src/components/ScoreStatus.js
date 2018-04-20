import React, {
  Component
} from 'react';

class ScoreStatus extends Component {
  render() {
    return(
      <div className="row">
        <div className="col-sm-6 komforScore col-xs-12 d-flex justify-content-center align-items-center">
            <div>
              <h2 className="score">{this.props.current}%</h2>
              <h4>Din nuværende komfortscore</h4>
            </div>
        </div>
        <div className="col-sm-6 col-xs-12 housePicture text-center">
            <h2 className="score">{1}%</h2>
            <h4>Din potentiele komfortscore</h4>
        </div>
      </div>
    )
  }
}

export default ScoreStatus;