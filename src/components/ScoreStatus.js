import React, {
  Component
} from 'react';
import '../styles/updateScore.css'

class ScoreStatus extends Component {
  render() {
    return(
      <div className="komforscore finalscore">
        <p className="current">
          <span className="score">{Math.floor(this.props.current) + 1}%</span>
          <span className="label">Din nuværende komfortscore</span>
        </p>
        {this.props.animate ?
          <p className="potential heartbeat">
            <span className="score">{Math.floor(this.props.potential) + 1}%</span>
            <span className="label">Din potentiele komfortscore</span>
          </p>
        :
          <p className="potential">
            <span className="score">{Math.floor(this.props.potential) + 1}%</span>
            <span className="label">Din potentiele komfortscore</span>
          </p>
        }
      </div>
    )
  }
}

export default ScoreStatus;
