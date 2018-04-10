import React, {
  Component
} from 'react';
import '../styles/slider.css'
import '../styles/sliderImages.css'
import '../styles/updateAnimation.css'

class Slider extends Component {
  constructor(props) {
    super(props);
    var num = Math.floor(Math.random() * 100);
    this.state = {
      val: num,
      min: 1,
      max: 100,
      imgClass: 'slider image-' + (Math.floor(num / 20) % 5)
    };
    this.handleChange = this.handleChange.bind(this);
    this.props.init(num)
  }

  handleChange(event) {
    this.props.updateScore(this.state.val / 600 * -100)
    this.setState({
      val: event.target.value,
      imgClass: 'slider image-' + (Math.floor((event.target
            .value - 1) /
          20) %
        5)
    });
    this.props.updateScore(event.target.value / 600 * 100)
  }

  render() {
    const paramLogo = 'assets/param-icons/' + this.props.parameter + '.png';
    return (
      <div className="row ">
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
          <p  className=" col-4">Utilfreds</p>
          <p className=" col-4 text-center">{this.state.val}</p>
          <p className="col-4 text-right">Tilfreds</p>
        </div>
      </div>
    )
  }
}

export default Slider;