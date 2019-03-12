import React, {
  Component
} from 'react';
import '../styles/card.css'


class Card extends Component {
  render() {
    var rootDir = process.env.REACT_APP_COMFORTSCORE_ROOT_DIRECTORY;
    var statusClass;
    if (this.props.done && this.props.showButtons) {
      statusClass = 'comfortscore-card comfortscore-done';
    } else if (this.props.willDo && this.props.showButtons) {
      statusClass = 'comfortscore-card comfortscore-will';
    } else if (this.props.clear && this.props.showButtons) {
      statusClass = 'comfortscore-card comfortscore-never';
    } else {
      statusClass = 'comfortscore-card';
    }

    if(this.props.showButtons) {
      return (
        <div className="comfortscore-slide-container">
          <div className={statusClass}>
            <div className="comfortscore-param-icons">
              {this.props.targets.map((target, i) =>
                <div key={i} className="comfortscore-param">
                  <img alt="param" src={rootDir + '/assets/param-icons/' + target + '.png'}/>
                  <p className="comfortscore-label">{target}</p>
                </div>
              )}
            </div>
            <h3>{this.props.title}</h3>
            <div className="comfortscore-text"><p>{this.props.description}</p><p><a target="_blank" href={this.props.read_more}>Læs mere</a></p>
            <p className="comfortscore-card-counter">{this.props.index + 1} af {this.props.total}</p></div>
          </div>
          <div className="comfortscore-swiper-actions">
              <button onClick={this.props.setDone} className="comfortscore-btn comfortscore-btn-light comfortscore-btn-yellow">Har gjort</button>
              <button onClick={this.props.setWillDo} className="comfortscore-btn comfortscore-btn-light comfortscore-btn-green">Vil gøre</button>
              <button onClick={this.props.setClear} className="comfortscore-btn comfortscore-btn-light comfortscore-btn-red">Nej, tak</button>
          </div>
        </div>
      )
    } else {
      return(
        <div className='comfortscore-card'>
          <div className="comfortscore-param-icons">
            {this.props.targets.map(target =>
              <div className="comfortscore-param">
                <img alt="param" src={rootDir + '/assets/param-icons/' + target + '.png'}/>
                <p className="comfortscore-label">{target}</p>
              </div>
            )}
          </div>
          <h3>{this.props.title}</h3>
          <div className="comfortscore-text"><p>{this.props.description}</p></div>
        </div>
      )
    }

  }
}

export default Card;
