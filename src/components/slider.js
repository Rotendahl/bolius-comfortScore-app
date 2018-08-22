import React, {
  Component
} from 'react';
import '../styles/slider.css'
import '../styles/sliderImages.css'

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: this.props.value,
      imgClass: 'slider image-' + (Math.floor(this.props.value / 20) % 5)
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var val = event.target.value
    this.props.updateScore(val, this.props.index)
    this.setState({
      val: val,
      imgClass: 'slider image-' + (Math.floor((val - 1) / 20) % 5)
    });
  }

  render() {
    var rootDir = process.env.REACT_APP_COMFORTSCORE_ROOT_DIRECTORY;

    const paramLogo = rootDir + '/assets/param-icons/' + this.props.parameter + '.png';
    return(      
      <div className="row">
        <div className="param">
          <img alt="param" src={paramLogo}/>
          <p className="label">{this.props.parameter}</p>
        </div>
        <div className="slider-col">
          <div className="slide-container">
            <input type="range" onChange={this.handleChange} min="1" max="100"
              value={this.state.val} className={this.state.imgClass}
            />
          </div>
          <p className="label">Utilfreds</p>
          <p className="label">Tilfreds</p>
        </div>
      </div>
    )
  }
}

export default Slider;