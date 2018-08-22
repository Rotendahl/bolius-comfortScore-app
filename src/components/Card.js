import React, {
  Component
} from 'react';
import '../styles/card.css'


class Card extends Component {
  render() {
    var rootDir = process.env.REACT_APP_COMFORTSCORE_ROOT_DIRECTORY;

    return(
      <div className="card" >
        <h3>{this.props.title}</h3>
        {this.props.done && <span className="status done">Done</span> }
        {this.props.willDo && <span className="status will">Will do</span> }
        {this.props.clear && <span className="status never">Never</span> }

        <div className="param-icons">
          {this.props.targets.map(target =>
            <div className="param">
              <img alt="param" src={rootDir + '/assets/param-icons/' + target + '.png'}/>
              <p className="label">{target}</p>
            </div>
          )}
        </div>
        <p>{this.props.description}</p>
        <div className="swiper-actions">
            <button onClick={this.props.setDone} className="btn btn-light">HAR GJORT</button>
            <button onClick={this.props.setWillDo} className="btn btn-light">VIL GØRE</button>
            <button onClick={this.props.setClear} className="btn btn-light">VIL IKKE</button>
        </div>
      </div>

    )
  }
}

export default Card;
