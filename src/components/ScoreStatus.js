import React, {
  Component
} from 'react';
//import '../styles/updateScore.css'


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
          <span className="comfortscore-score">{Math.floor(this.props.current)}%</span>
          <span className="comfortscore-label">Din nuværende<br/> komfortscore</span>
        </p>
        {this.props.animate ?
          <p className="comfortscore-potential heartbeat">
            <span className="comfortscore-score">{Math.floor(this.props.potential)}%</span>
            <span className="comfortscore-label">Din potentielle<br/> komfortscore</span>
          </p>
        :
          <p className="comfortscore-potential">
            <span className="comfortscore-score">{Math.floor(this.props.potential)}%</span>
            <span className="comfortscore-label">Din potentielle<br/> komfortscore</span>
          </p>
        }
      </div>
    )
  }
}

export default ScoreStatus;
