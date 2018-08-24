import React, {
  Component
} from 'react';
import '../styles/updateScore.css'


class ScoreStatus extends Component {
  render() {
    var scoreClass;
    if (this.props.onTop) {
      scoreClass = 'comfortscore-wrapper comfortscore-resume-score';
    } else {
      scoreClass = 'comfortscore-wrapper comfortscore-final-score';
    }

    return(
      <div className={scoreClass}>
        <p className="comfortscore-current">
          <span className="comfortscore-score">{Math.floor(this.props.current) + 1}%</span>
          <span className="comfortscore-label">Din nuværende komfortscore</span>
        </p>
        {this.props.animate ?
          <p className="comfortscore-potential heartbeat">
            <span className="comfortscore-score">{Math.floor(this.props.potential) + 1}%</span>
            <span className="comfortscore-label">Din potentiele komfortscore</span>
          </p>
        :
          <p className="comfortscore-potential">
            <span className="comfortscore-score">{Math.floor(this.props.potential) + 1}%</span>
            <span className="comfortscore-label">Din potentiele komfortscore</span>
          </p>
        }
      </div>
    )
  }
}

export default ScoreStatus;
