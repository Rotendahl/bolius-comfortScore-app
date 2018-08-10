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
        <div className="col-2 param">
          <img className="rounded" alt="param" src={paramLogo}/>
          <p>{this.props.parameter}</p>
        </div>
        <div className="col-10 sliderCol align-self-center">
          <div className="slidecontainer">
            <input type='range' onChange={this.handleChange} min="1" max="100"
              value={this.state.val} className={this.state.imgClass}
            />
          </div>
          <p className="float-left">Utilfreds</p>
          <p className="float-right">Tilfreds</p>
        </div>
      </div>
    )
  }
}

export default Slider;
