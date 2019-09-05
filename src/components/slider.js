import React, {
  Component
} from 'react';
//import '../styles/slider.css'
//import '../styles/sliderImages.css'

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: this.props.value,
      imgClass: 'comfortscore-slider comfortscore-image-' + (Math.floor(this.props.value / 20) % 5)
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var val = event.target.value
    this.props.updateScore(val, this.props.index)
    this.setState({
      val: val,
      imgClass: 'comfortscore-slider comfortscore-image-' + (Math.floor((val - 1) / 20) % 5)
    });
  }

  render() {
    var rootDir = process.env.REACT_APP_COMFORTSCORE_ROOT_DIRECTORY;

    const paramLogo = rootDir + '/assets/param-icons/' + this.props.parameter + '.png';
    return(      
      <div className="comfortscore-row">
        <div className="comfortscore-param">
          <img alt="param" src={paramLogo}/>
          <p className="comfortscore-label">{this.props.parameter}</p>
        </div>
        <div className="comfortscore-slider-col">
          <div className="comfortscore-slide-container">
            <input type="range" onChange={this.handleChange} min="1" max="100"
              value={this.state.val} className={this.state.imgClass}
            />
          </div>
          <p className="comfortscore-label">Utilfreds</p>
          <p className="comfortscore-label">Tilfreds</p>
        </div>
      </div>
    )
  }
}

export default Slider;